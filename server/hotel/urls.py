from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoomViewSet, CustomerViewSet, BookingViewSet, contact_message_api, booking_message_api

router = DefaultRouter()
router.register(r'rooms', RoomViewSet, basename='room')
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)), 
    path('contact/', contact_message_api),
    path('booking/', booking_message_api),
    
]
