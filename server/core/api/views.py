from rest_framework.response import Response
from rest_framework import viewsets

class ApiRoot(viewsets.ViewSet):
    
    def params(self, request):
        return Response({
            'message': 'Hello, World!'
        })