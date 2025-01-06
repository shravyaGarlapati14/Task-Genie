from django.shortcuts import render
from django.http import JsonResponse
from django.views import View

# Mock data to simulate database
REVIEWS = [
    {"id": 1, "client": "John Doe", "rating": 5, "text": "Great service!"},
    {"id": 2, "client": "Jane Smith", "rating": 4, "text": "Very reliable."},
    {"id": 3, "client": "Sam Wilson", "rating": 3, "text": "Satisfactory experience."},
]

class ReviewsView(View):
    def get(self, request):
        """
        Handles GET requests to retrieve all client reviews.
        """
        return JsonResponse({"reviews": REVIEWS}, safe=False)

    def post(self, request):
        """
        Handles POST requests to add a new review.
        Expected JSON payload:
        {
            "client": "Client Name",
            "rating": 4,
            "text": "Review text here."
        }
        """
        try:
            import json
            data = json.loads(request.body)
            client = data.get("client")
            rating = data.get("rating")
            text = data.get("text")

            if not client or not rating or not text:
                return JsonResponse({"error": "All fields (client, rating, text) are required."}, status=400)

            if not (1 <= rating <= 5):
                return JsonResponse({"error": "Rating must be between 1 and 5."}, status=400)

            new_review = {
                "id": len(REVIEWS) + 1,
                "client": client,
                "rating": rating,
                "text": text,
            }

            REVIEWS.append(new_review)

            return JsonResponse({"message": "Review added successfully!", "review": new_review}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON payload."}, status=400)

# Create your views here.
