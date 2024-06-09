from rest_framework.views import APIView
from rest_framework.response import Response
from .router import router
from .apps_params import ParamsController

class AppsParamsView(APIView):
    def get(self, request):
        params = ParamsController(router).get_params()
        return Response(params)