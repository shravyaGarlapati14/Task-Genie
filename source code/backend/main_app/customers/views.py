# customers/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        # Check if a user already exists by username or email
        if User.objects.filter(username=request.data.get('username')).exists():
            return Response({'message': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response({'message': 'Email already in use.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
class CustomerSignInView(APIView):
    def post(self, request, *args, **kwargs):
        # Get email and password from request body (JSON)
        email = request.data.get('email')
        password = request.data.get('password')

        # Fetch the user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Now authenticate the user using the username (which is the email) and password
        user = authenticate(request, username=user.username, password=password)

        if user is not None:
            login(request, user)  # Create the session
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)