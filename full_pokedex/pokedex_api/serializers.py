from attr import validate
from rest_framework import serializers
from .models import Pokemon, Record
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = "__all__"

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        exclude = ['owner']
        depth = 1

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()

        pokemonList = Pokemon.objects.all()
        for pokemon in pokemonList:
            record = Record(owner=user, pokemon=pokemon)
            record.save()

        return user