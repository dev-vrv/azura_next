from rest_framework import serializers
from django.db import models

FIELDS_TYPES = {
    'date': ['DateField'],
    'time': ['TimeField'],
    'datetime': ['DateTimeField'],
    'boolean': ['BooleanField'],
    'file': ['FileField', 'ImageField'],
    'array': ['ArrayField'],
    'json': ['JSONField'],
    'select': ['ForeignKey', 'OneToOneField', 'ManyToManyField'],
    'text': [
        'CharField', 'TextField', 'EmailField', 'URLField', 'SlugField', 'UUIDField', 'FilePathField', 'IPAddressField', 'GenericIPAddressField'
        ],
    'number': [
        'IntegerField', 'SmallIntegerField', 'PositiveIntegerField', 'PositiveSmallIntegerField', 'BigIntegerField', 'DecimalField', 'FloatField'
        ],
}

FIELDS_SYSTEM = [
    'id',
    'created_at',
    'updated_at',
    'is_active',
    'is_staff',
    'is_superuser',
    'last_login',
    'groups',
    'user_permissions', 
    'last_session',   
]

class BaseNextSerializer(serializers.ModelSerializer):
    exclude_list = []
    readonly_fields = ['id', 'created_at', 'updated_at']
    display_fields = ['id', 'created_at', 'updated_at']
    form_groups = []
    display_link = 'id'
    
    
    def __init__(self, *args, **kwargs):
        super(BaseNextSerializer, self).__init__(*args, **kwargs)
        
    def create(self, validated_data):
        return self.Meta.model.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        return instance.update(**validated_data)
    
    def delete(self, instance):
        return instance.delete()
    
    def get_field_type(self, field):
        field_type = field.__class__.__name__
        field_type_display = None
        
        is_choice = hasattr(field, 'choices') and bool(field.choices)
        if is_choice:
            field_type_display = 'select'
        else:
            for key, value in FIELDS_TYPES.items():
                if field_type in value:
                    field_type_display = key
                    break

        if not field_type_display:
            field_type_display = 'text'
            
        return field_type_display
    
    def get_form_fields(self):
        fields = []
        for field in self.Meta.model._meta.get_fields():
            if field.name in FIELDS_SYSTEM or field.name in self.exclude_list:
                continue
            if not isinstance(field, models.fields.reverse_related.ManyToOneRel):
                value = None
                if self.instance:
                    if isinstance(field, models.fields.files.FileField):
                        try:
                            value = getattr(self.instance, field.name).url
                        except ValueError:
                            value = None
                    elif isinstance(field, models.ManyToManyField):
                        value = list(getattr(self.instance, field.name).values_list('id', flat=True))
                    else:
                        value = getattr(self.instance, field.name)
                
                fields.append({
                    'name': field.name,
                    'type': self.get_field_type(field),
                    'required': not all([field.null, field.blank]),
                    'label': field.verbose_name,
                    'help_text': field.help_text,
                    'value': value,
                    'options': field.choices if hasattr(field, 'choices') else [],
                })
        return fields
    
    def get_form_groups(self):
        return self.form_groups
    
    def get_fields_display(self):
        return self.display_fields
    
    class Meta:
        abstract = True