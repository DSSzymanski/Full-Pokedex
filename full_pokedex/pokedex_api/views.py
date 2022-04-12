from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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
@permission_classes([IsAuthenticated])
def recordList(request):
    user = request.user
    records = user.record_set.all()
    serializer = RecordSerializer(records, many=True)
    return Response(serializer.data)
