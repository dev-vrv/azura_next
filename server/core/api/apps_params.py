import re

class ParamsController:
    
    def __init__(self, router) -> None:
        self.router = router
        self.urls = router.urls
        self.routes = {}
    
    # Predicates
    
    def __is_app__(self, url):
        if url.name == 'params':
            return False
        else:
            return True
        
    # Getters 
    
    def get_params(self):
        for url in self.urls:
            if not self.__is_app__(url):
                continue
            
            app_name = self.__get_app_name__(url)
            route_name = self.__get_route_name__(url).replace('-', '_')
            serializer = self.__get_serializer__(url)
            
            self.routes[app_name] = self.routes.get(app_name, {})
            self.__set_app_params__(serializer, self.routes[app_name])
            self.routes[app_name][route_name] = {
                'url': self.__get_clean_url__(url),
            }
        return self.routes
        
    def __get_serializer__(self, url: object) -> object | None:
        serializer_instance = None
        if hasattr(url.callback.cls, 'serializer_class'):
            serializer_class = url.callback.cls.serializer_class
            serializer_instance = serializer_class()
        return serializer_instance
    
    def __get_app_name__(self, url: object) -> str:
        return url.name.split('-')[0].lower()
             
    def __get_route_name__(self, router_url: object) -> str:
        return '-'.join(router_url.name.split('-')[1:]) if '-' in router_url.name else router_url.name
 
    def __get_clean_url__(self, url: object) -> str:
        pattern = url.pattern.regex.pattern
        clean_url = re.sub(r'\^|\$|\\', '', pattern)
        clean_url = re.sub(r'\(\?P<\w+>[^)]+\)', '', clean_url)
        clean_url = re.sub(r'\./', '/', clean_url)
        clean_url = re.sub(r'//+', '/', clean_url)
        clean_url = re.sub(r'\?+', '', clean_url)
        return clean_url
    
    # Setters
    
    def __set_app_params__(self, serializer, app):
        if serializer:
            if 'fields_display' not in app:
                app['display_fields'] = serializer.get_fields_display()
            if 'fields_groups' not in app:
                app['fields_groups'] = serializer.get_form_groups()
            if 'display_link' not in app:
                app['display_link'] = serializer.display_link
