from django.http import Http404
from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .serializers import PokemonSerializer, RecordSerializer, UserSerializer
from .models import Pokemon, Record

# Create your views here.
@api_view(["GET"])
def getRoutes(request):
    api_routes = {
        'Pokemon List':'/pokemon-list/',
        'Pokemon Detail View':'/pokemon-detail/<str:pk>/',
        'Record List':'record-list',
    }
    return Response(api_routes)

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
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recordList(request):
    user = request.user
    records = user.record_set.all()
    serializer = RecordSerializer(records, many=True)
    return Response(serializer.data)
