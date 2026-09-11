from django.contrib import admin
from .models import Visitor


@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'ip_address',
        'user_agent',
        'visited_at',
    )
    list_filter = (
        'user_agent',
        'visited_at',
    )
    search_fields = (
        'ip_address',
        'user_agent',
        'visited_at',
    )
    ordering = (
        'id',
        'visited_at',
    )