from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'firstName',
        'lastName',
        'email',
        'whatsapp',
        'subject',
        'is_read',
        'created_at',
    )
    list_filter = (
        'is_read',
        'created_at',
    )
    search_fields = (
        'firstName',
        'lastName',
        'email',
        'whatsapp',
    )
    ordering = (
        'id',
    )