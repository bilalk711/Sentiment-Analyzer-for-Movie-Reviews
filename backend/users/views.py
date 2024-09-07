from django.contrib.auth.models import User  # Import the User model
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all() 
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
