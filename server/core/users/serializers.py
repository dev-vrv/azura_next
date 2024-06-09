from api.serializers import BaseNextSerializer
from users.models import User


class NextUserSerializer(BaseNextSerializer):
    class Meta:
        model = User
        fields = '__all__'