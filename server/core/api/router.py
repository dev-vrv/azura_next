from rest_framework.routers import DefaultRouter
from .discover import AutoDiscoverNextClasses
from .apps_params import ParamsController


router = DefaultRouter()

params = ParamsController(router).get_params()

AutoDiscoverNextClasses(router).register()
