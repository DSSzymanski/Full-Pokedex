from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.getRoutes, name='api-routes'),

    path('create-user/', views.createUser, name='create-user'),
    path('token/', views.UpdatedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   
    
    path('pokemon-list', views.pokemonList, name='pokemon-list'),

    path('record-list/', views.recordList, name='record-list'),
    path('update-record/<int:pk>', views.updateRecord, name='update-record'),
]