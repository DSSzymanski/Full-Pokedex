from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PokemonSerializer, RecordSerializer
from .models import Pokemon, Record

# Create your views here.
@api_view(["GET"])
def getRoutes(request):
    api_routes = {
        'Pokemon List':'/pokemon-list/',
        'Pokemon Detail View':'/pokemon-detail/<str:pk>/',
        'Record List':'record-list',
        'User Record List':'record-list/<str:owner>/',
        'User Record Detail View':'record-detail/<str:owner>/<str:pokemon>'
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

@api_view(['GET'])
def recordList(request):
    record = Record.objects.all()
    serializer = RecordSerializer(record, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def userRecordList(request, owner):
    record = Record.objects.filter(owner=owner)
    serializer = RecordSerializer(record, many=True)
    return Response(serializer.data)