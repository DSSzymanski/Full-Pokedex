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
    """
    Dict of routes as view sent to django REST view.
    """
    api_routes = {
        'Pokemon List':'/pokemon-list/',
        'Record List':'/record-list/',
        'Update Record':'/update-record/<int:pk>/',
        'Create User':'/create-user/',
    }
    return Response(api_routes)

class UpdatedTokenObtainPairView(TokenObtainPairView):
    """
    Override to have the serializer be the custom serializer.
    """
    serializer_class = UpdatedTokenObtainPairSerializer

@api_view(['GET'])
def pokemonList(request):
    """
    API view that returns the data of all Pokemon in the database.
    """
    pokemon = Pokemon.objects.all()
    serializer = PokemonSerializer(pokemon, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def updateRecord(request, pk):
    """
    API call that updates the record indicated by the inputted primary key.
    The call then returns a response with a status code depending on if the
    inputed data as valid or not.
    """
    record = Record.objects.get(id=pk)
    serializer = RecordSerializer(instance=record, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    """
    API call to create a new user with data found within request. Request also has record
    data, if any, from a non-user account to transition to a user account that is removed before
    sending to the serializer.

    If the data is valid and there was record data sent, it will update the records in the database
    that were created upon user creation to reflect that data. A response is then returned with the
    appropriate status code depending on if the data was valid or not.
    """
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
    """
    API view that returns a list of all records associated with the authenticated
    user who the request was made through. Returns response with the data.
    """
    user = request.user
    records = user.record_set.all()
    #catch account which was improperly initialized
    if records.count() == 0:
        for pokemon in Pokemon.objects.all():
            Record.create(owner=user, pokemon=pokemon)
        records = user.record_set.all()
    serializer = RecordSerializer(records, many=True)
    return Response(serializer.data)
