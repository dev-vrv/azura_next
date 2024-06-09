from api.viewsets import BaseNextModelViewSet
from .models import User
from .serializers import NextUserSerializer

class NextUserViewSet(BaseNextModelViewSet):
    queryset = User.objects.all()
    serializer_class = NextUserSerializer
