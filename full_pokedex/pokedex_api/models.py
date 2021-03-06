import uuid
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class Pokemon(models.Model):
    """
    Model representing a single pokemon used for generating frontend cards.
    Upon creation, creates a new record for all users.
    Fields labeled starting with 'has_' are used for the card buttons.
    """
    id = models.CharField(
        max_length=4,
        primary_key=True,
        editable=True,
        verbose_name="National Pokdex Number."
    )
    name = models.CharField(max_length=15, verbose_name="Name of Pokemon.")
    generation = models.PositiveIntegerField(default=1, verbose_name="Generation Number")
    img = models.ImageField(upload_to='pokemon_imgs', verbose_name="Image of pokemon")

    #below are fields used to generate the frontend buttons.
    has_been_released = models.BooleanField(default=False, verbose_name="If the pokemon has been released.")
    has_shiny = models.BooleanField(default=False, verbose_name="If the pokemon has a shiny form released.")
    has_shadow = models.BooleanField(default=False, verbose_name="If the pokemon has a shadow form released.")
    has_mega = models.BooleanField(default=False, verbose_name="If the pokemon has a mega form.")

    @classmethod
    def create(cls, name: str, number: str, generation: int):
        """
        Adds a new record for each user upon new Pokemon creation.
        """
        pokemon = cls(id=number, name=name, generation=generation)

        users = User.objects.all()
        for user in users:
            record = Record.objects.create(owner=user, pokemon=pokemon)

        return pokemon
    
    def __str__(self) -> str:
        return f"Pokemon: {self.name}, Number: {self.id}, Generation: {self.generation}"

class Record(models.Model):
    """
    Record class stores information on which versions of a Pokemon have been obtained for each user.
    Each record maps a pokemon to a user.
    """
    id = models.BigAutoField(primary_key=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    pokemon = models.ForeignKey('Pokemon', on_delete=models.CASCADE)

    caught = models.BooleanField(default=False, verbose_name="If the Pokemon has been caught.")
    shiny = models.BooleanField(default=False, verbose_name="If the Pokemon's shiny version has been caught.")
    lucky = models.BooleanField(default=False, verbose_name="If the lucky Pokemon has been traded.")
    shadow = models.BooleanField(default=False, verbose_name="If the shadow Pokemon has been caught.")
    purified = models.BooleanField(default=False, verbose_name="If the shadow Pokemon has been purified.")
    perfect = models.BooleanField(default=False, verbose_name="If the perfect Pokemon has been caught.")
    mega = models.BooleanField(default=False, verbose_name="If the Pokemon's mega form has been caught.")
