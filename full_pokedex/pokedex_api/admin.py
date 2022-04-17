from django.contrib import admin
from django.contrib.auth.models import User
from django import forms
from .models import Pokemon, Record

@admin.register(Pokemon)
class PokemonAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'generation', 'img')
    list_filter = ['generation']
    search_fields = ['id', 'name']
    ordering = ('id',)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        users = User.objects.all()
        for user in users:
            Record.objects.create(owner=user, pokemon=obj)

@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Record._meta.get_fields()]
    list_filter = ['owner']
