from django.urls import path
from .views import ApiRoot
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'params', ApiRoot, basename='params')