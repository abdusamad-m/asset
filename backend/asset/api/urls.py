from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('assets', AssetViewSet)
router.register('inventory', InventoryViewSet)
router.register('assignments', AssignmentViewSet)
router.register('tickets', TicketViewSet)
router.register('users', UserGet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', DashboardAPIView.as_view()),
]