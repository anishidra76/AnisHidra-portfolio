from django.contrib import admin
from .models import AboutContent


@admin.register(AboutContent)
class AboutContent(admin.ModelAdmin):
    list_display = (
        'id',
        'image',
        'description',
    )