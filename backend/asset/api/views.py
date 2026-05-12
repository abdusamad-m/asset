from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django.contrib.auth.models import User
from .models import Asset, Inventory, Assignment, Ticket
from .serializers import *


class AssetViewSet(ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name', 'category']


class InventoryViewSet(ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer


class AssignmentViewSet(ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer


class TicketViewSet(ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


# Dashboard API
class DashboardAPIView(APIView):
    def get(self, request):
        return Response({
            "assets": Asset.objects.count(),
            "tickets": Ticket.objects.count(),
            "assignments": Assignment.objects.count(),
        })
        
class UserGet (ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer