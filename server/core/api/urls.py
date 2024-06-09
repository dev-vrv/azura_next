from django.urls import path, include
from django.http import HttpResponse
from api.router import router
from .views import AppsParamsView

urlpatterns = [
    path('', include(router.urls)),
    path('params/', AppsParamsView.as_view())
]
