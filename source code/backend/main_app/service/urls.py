from django.urls import path
from . import views

urlpatterns = [
    path('services/', views.all_services, name='all_services'),
    path('services/<int:service_id>/', views.service_detail, name='service_detail'),
    path('services/filter/', views.service_filter, name='service_filter'),
]
