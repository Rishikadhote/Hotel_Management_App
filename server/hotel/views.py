from rest_framework import viewsets, permissions, filters, status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action, api_view
from django.shortcuts import get_object_or_404

from .models import Room, Customer, Booking, ContactMessage
from .serializers import RoomSerializer, CustomerSerializer, BookingSerializer, ContactMessageSerializer

from rest_framework.permissions import IsAuthenticated

# Room ViewSet
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Contact Message API View (function-based for your React form)
@api_view(['POST'])
def contact_message_api(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message received!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def booking_message_api(request):
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Room Booked!"}, status=status.HTTP_201_CREATED)
    else:
        print("Booking serializer errors:", serializer.errors)  # Debug line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Customer ViewSet
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

# Booking ViewSet
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['customer__name', 'room__room_type', 'check_in', 'check_out']

    def perform_create(self, serializer):
        customer = self.request.user.customer if hasattr(self.request.user, 'customer') else None
        serializer.save(customer=customer)

    