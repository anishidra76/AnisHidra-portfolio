from django.contrib import admin
from .models import ServiceCard


@admin.register(ServiceCard)
class ServiceCardAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'domain',
        'title',
    )
    list_filter = (
        'domain',
    )
    search_fields = (
        'domain',
        'title',
    )