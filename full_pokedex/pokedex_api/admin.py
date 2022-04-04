from django.contrib import admin
from .models import Pokemon, Record

# Register your models here.
@admin .register(Pokemon)
class PokemonAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'generation', 'img')
    list_filter = ['generation']
    search_fields = ['id', 'name']
    ordering = ('id',)

@admin .register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Record._meta.get_fields()]
    list_filter = ['owner']
