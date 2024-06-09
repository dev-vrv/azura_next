from .urls import router

class AppsConfig:
    
    def parse(self, request):
        
        for url in router.urls:
            
            print(url)