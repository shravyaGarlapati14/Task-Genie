from django.shortcuts import render
from django.http import JsonResponse
from .models import Service  # Assuming there's a Service model that stores service data

def all_services(request):
    """
    This view handles rendering the services page and returns all available services.
    It supports filtering by category and searching by service title.
    """
    # Get the selected category and search query from request
    selected_category = request.GET.get('category', 'all')  # Default to 'all' if no category selected
    search_query = request.GET.get('search', '').lower()  # Case insensitive search

    # Filter services based on category
    if selected_category != 'all':
        services = Service.objects.filter(category=selected_category)
    else:
        services = Service.objects.all()

    # Further filter by search query if present
    if search_query:
        services = services.filter(title__icontains=search_query)

    # Assuming 'services' is the list of filtered services
    context = {
        'services': services,
        'selected_category': selected_category,
        'search_query': search_query,
    }

    return render(request, 'services/all_services.html', context)

def service_detail(request, service_id):
    """
    This view handles displaying the details of a specific service.
    """
    try:
        service = Service.objects.get(id=service_id)
    except Service.DoesNotExist:
        service = None

    context = {
        'service': service
    }

    return render(request, 'services/service_detail.html', context)

# Example of a JSON endpoint for dynamic filtering (optional)
def service_filter(request):
    """
    Returns a filtered list of services based on category or search.
    """
    selected_category = request.GET.get('category', 'all')
    search_query = request.GET.get('search', '').lower()

    # Filter services based on category
    if selected_category != 'all':
        services = Service.objects.filter(category=selected_category)
    else:
        services = Service.objects.all()

    # Further filter by search query if provided
    if search_query:
        services = services.filter(title__icontains=search_query)

    # Serialize services into a list of dictionaries
    service_list = [
        {
            'id': service.id,
            'title': service.title,
            'price': service.price,
            'category': service.category,
            'image_url': service.image.url,  # Assuming image is stored in the model
        }
        for service in services
    ]
    
    return JsonResponse({'services': service_list})

