from django.shortcuts import render
from django.http import JsonResponse
from .models import Booking
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

# Get all bookings
def get_bookings(request):
    bookings = Booking.objects.all()
    booking_list = list(bookings.values('id', 'date', 'client', 'status'))
    return JsonResponse(booking_list, safe=False)

# Create a new booking
@csrf_exempt
@require_http_methods(["POST"])
def create_booking(request):
    try:
        data = json.loads(request.body)
        new_booking = Booking.objects.create(
            date=data['date'],
            client=data['client'],
            status=data['status']
        )
        return JsonResponse({
            'id': new_booking.id,
            'date': new_booking.date,
            'client': new_booking.client,
            'status': new_booking.status
        }, status=201)
    except KeyError as e:
        return JsonResponse({"error": f"Missing field: {e}"}, status=400)

# Update a booking's status
@csrf_exempt
@require_http_methods(["PUT"])
def update_booking(request, booking_id):
    try:
        data = json.loads(request.body)
        booking = Booking.objects.get(id=booking_id)
        booking.status = data['status']
        booking.save()
        return JsonResponse({
            'id': booking.id,
            'date': booking.date,
            'client': booking.client,
            'status': booking.status
        })
    except Booking.DoesNotExist:
        return JsonResponse({"error": "Booking not found"}, status=404)
    except KeyError:
        return JsonResponse({"error": "Missing status field"}, status=400)

# Delete a booking
@csrf_exempt
@require_http_methods(["DELETE"])
def delete_booking(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id)
        booking.delete()
        return JsonResponse({}, status=204)  # No content
    except Booking.DoesNotExist:
        return JsonResponse({"error": "Booking not found"}, status=404)
