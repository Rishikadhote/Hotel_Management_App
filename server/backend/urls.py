from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root_api_view(request):
    return JsonResponse({
        "status": "success",
        "message": "Welcome to the Hotel Management API 🚀",
        "available_routes": [
            "/api/rooms/",
            "/api/customers/",
            "/api/bookings/",
            "/api/contact/",
            "/api/booking/"
        ]
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('hotel.urls')),
    path('', root_api_view),
 ]