from django.urls import path
from .views import RegisterUserView, DocumentUploadView, CalculateHourlyRateView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('upload-documents/', DocumentUploadView.as_view(), name='upload_documents'),
    path('calculate-hourly-rate/', CalculateHourlyRateView.as_view(), name='calculate_hourly_rate'),
]
