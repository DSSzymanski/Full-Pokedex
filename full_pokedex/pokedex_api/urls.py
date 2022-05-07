from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    #base path that lists all routes in the rest API
    path('', views.getRoutes, name='api-routes'),

    #API path to create a new user given response data
    path('create-user/', views.createUser, name='create-user'),

    #API path to retrieve access and refresh JWT tokens
    path('token/', views.UpdatedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   

    #API path to retrieve data on all pokemon in the database
    path('pokemon-list', views.pokemonList, name='pokemon-list'),

    #API path to retrieve data on all records for the authorized user who made the request
    path('record-list/', views.recordList, name='record-list'),
    #API path to update a single record when altered based on the record's primary key
    path('update-record/<int:pk>', views.updateRecord, name='update-record'),
]