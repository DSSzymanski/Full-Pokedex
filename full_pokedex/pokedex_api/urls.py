from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes, name='api-routes'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   
    
    path('pokemon-list', views.pokemonList, name='pokemon-list'),
    path('pokemon-detail/<str:pk>/', views.pokemonDetail, name='pokemon-detail'),

    path('record-list', views.recordList, name='record-list'),
    path('user-record-list/<str:owner>/', views.userRecordList, name='user-record-list'),
]