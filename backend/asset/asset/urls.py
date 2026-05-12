"""
URL configuration for asset project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.api, name='api')
Class-based views
    1. Add an import:  from other_app.views import api
    2. Add a URL to urlpatterns:  path('', api.as_view(), name='api')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.views import DashboardAPIView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('api.urls')),

    # JWT
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('dashboard/', DashboardAPIView.as_view()),
]
