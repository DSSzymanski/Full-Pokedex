from rest_framework import serializers
from .models import Pokemon, Record

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = "__all__"
