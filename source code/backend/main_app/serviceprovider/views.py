from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import TaskerProfile, Document
from .serializers import TaskerProfileSerializer
import os

class RegisterUserView(APIView):
    def post(self, request):
        data = request.data

        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword']
        for field in required_fields:
            if field not in data or not data[field]:
                return Response({"error": f"{field} is required."}, status=status.HTTP_400_BAD_REQUEST)

        if data['password'] != data['confirmPassword']:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create user
            user = User.objects.create(
                username=data['email'],
                email=data['email'],
                first_name=data['firstName'],
                last_name=data['lastName'],
                password=make_password(data['password'])
            )

            # Create tasker profile
            profile = TaskerProfile.objects.create(
                user=user,
                address=data.get('address', ''),
                experience=data.get('experience', ''),
                no_experience=data.get('noExperience', False),
                service_types=data.get('serviceTypes', []),
                terms_accepted=data.get('termsAccepted', False)
            )

            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DocumentUploadView(APIView):
    def post(self, request):
        user = request.user

        if 'mandatoryDocument' not in request.FILES:
            return Response({"error": "Mandatory document is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            mandatory_document = request.FILES['mandatoryDocument']

            # Validate file size and type
            if mandatory_document.size > 2 * 1024 * 1024:
                return Response({"error": "File size must be under 2MB."}, status=status.HTTP_400_BAD_REQUEST)
            if not mandatory_document.content_type in ['application/pdf', 'image/jpeg']:
                return Response({"error": "File must be a PDF or JPEG."}, status=status.HTTP_400_BAD_REQUEST)

            # Save mandatory document
            mandatory_path = default_storage.save(f"documents/mandatory/{mandatory_document.name}", ContentFile(mandatory_document.read()))

            # Save additional documents
            additional_documents = []
            if 'additionalDocuments' in request.FILES:
                for file in request.FILES.getlist('additionalDocuments'):
                    if file.size <= 2 * 1024 * 1024 and file.content_type in ['application/pdf', 'image/jpeg']:
                        path = default_storage.save(f"documents/additional/{file.name}", ContentFile(file.read()))
                        additional_documents.append(path)

            Document.objects.create(
                user=user,
                mandatory_document=mandatory_path,
                additional_documents=additional_documents
            )

            return Response({"message": "Documents uploaded successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CalculateHourlyRateView(APIView):
    def post(self, request):
        data = request.data
        area = data.get('selectedArea', '')
        experience = data.get('experienceYears', '')
        task_type = data.get('taskType', '')

        if not area or not experience or not task_type:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        base_rate = 40
        if experience == '2-3 years':
            base_rate += 10
        elif experience == '4+ years':
            base_rate += 20

        return Response({"hourlyRate": base_rate}, status=status.HTTP_200_OK)


# Create your views here.
