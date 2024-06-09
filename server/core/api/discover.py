import importlib
import os
import inspect
from django.apps import apps
from rest_framework import viewsets
from rest_framework.views import APIView

class AutoDiscoverNextClasses:
    def __init__(self, router) -> None:
        self.router = router
        
    def register(self):
        for app in apps.get_app_configs():
            try:
                module_path = os.path.join(app.path, 'next.py')
                if os.path.isfile(module_path):
                    module_name = f"{app.name}.next"
                    module = importlib.import_module(module_name)

                    for name, obj in inspect.getmembers(module):
                        if inspect.isclass(obj) and name.startswith("Next"):
                            if issubclass(obj, viewsets.ModelViewSet):
                                self.router.register(rf'{app.label}', obj, basename=f'{app.label}')
            except Exception as e:
                print(f"Error importing {app.name}: {e}")
