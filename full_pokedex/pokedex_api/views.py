import json
from django.http import Http404
from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import PokemonSerializer, RecordSerializer, UserSerializer, UpdatedTokenObtainPairSerializer
from .models import Pokemon, Record

@api_view(["GET"])
def getRoutes(request):
    api_routes = {
        'Pokemon List':'/pokemon-list/',
        'Pokemon Detail View':'/pokemon-detail/<str:pk>/',
        'Record List':'record-list',
    }
    return Response(api_routes)

class UpdatedTokenObtainPairView(TokenObtainPairView):
    serializer_class = UpdatedTokenObtainPairSerializer

@api_view(['GET'])
def pokemonList(request):
    pokemon = Pokemon.objects.all()
    serializer = PokemonSerializer(pokemon, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def pokemonDetail(request, pk):
    pokemon = Pokemon.objects.get(id=pk)
    serializer = PokemonSerializer(pokemon, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateRecord(request, pk):
    record = Record.objects.get(id=pk)
    serializer = RecordSerializer(instance=record, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    record_data = json.loads(request.data.pop("records", None))
    username = request.data['username']
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        #record data matches pokemon model id's to JSON strs of record data
        for pokemon_id in record_data:
            #get record from database using username and pokemon id
            record_to_update = Record.objects.filter(
                owner=User.objects.get(username=username)
            ).filter(pokemon=Pokemon.objects.get(id=pokemon_id))[0]

            record_serializer = RecordSerializer(instance=record_to_update, data=json.loads(record_data[pokemon_id]))

            if record_serializer.is_valid():
                record_serializer.save()
            else:
                return Response(serializer.errors, status.HTTP_405_METHOD_NOT_ALLOWED)

        return Response(serializer.data, status.HTTP_200_OK)
    #default
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recordList(request):
    user = request.user
    records = user.record_set.all()
    #catch account which was improperly initialized
    if records.count() == 0:
        for pokemon in Pokemon.objects.all():
            Record.create(owner=user, pokemon=pokemon)
        records = user.record_set.all()
    serializer = RecordSerializer(records, many=True)
    return Response(serializer.data)
