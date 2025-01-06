from django.urls import path
from .views import get_bookings, create_booking, update_booking, delete_booking

urlpatterns = [
    path('bookings/', get_bookings, name='get_bookings'),
    path('bookings/create/', create_booking, name='create_booking'),
    path('bookings/update/<int:booking_id>/', update_booking, name='update_booking'),
    path('bookings/delete/<int:booking_id>/', delete_booking, name='delete_booking'),
]
