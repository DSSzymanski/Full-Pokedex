from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='api-routes'),

    path('pokemon-list', views.pokemonList, name='pokemon-list'),
    path('pokemon-detail/<str:pk>/', views.pokemonDetail, name='pokemon-detail'),

]