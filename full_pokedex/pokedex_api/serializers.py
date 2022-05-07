from attr import validate
from rest_framework import serializers
from .models import Pokemon, Record
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UpdatedTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom token serializer response that adds the username of the user to the
    token response. Used to format the header of the Navbar.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class PokemonSerializer(serializers.ModelSerializer):
    #Basic serializer that serializes all fields of the Pokemon model.
    class Meta:
        model = Pokemon
        fields = "__all__"

class RecordSerializer(serializers.ModelSerializer):
    """
    Basic serializer that serializes all fields of the Record model. Excludes
    the owner field due to it sometimes sending back password data.
    """
    class Meta:
        model = Record
        exclude = ['owner']
        depth = 1

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer used for user creation. Uses built in password validation through
    django and upon user creation, creates a Record object for each Pokemon in the
    database for the user.
    """
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    #built in django password validation
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