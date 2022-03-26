import uuid
from django.db import models
from django.conf import settings

# Create your models here.
class Pokemon(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name="National Pokdex Number."
    )

    name = models.CharField(max_length=15, verbose_name="Name of Pokemon.")
    generation = models.IntegerChoices('generation', '1 2 3 4 5 6 7 8 9')
    img = models.ImageField(null=True, verbose_name="Image of the Pokemon.")

class Record(models.Model):
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

    has_mega = models.BooleanField(default=False, verbose_name="If the pokemon has a mega form.")