from django.contrib import admin
from .models import HomeStatic


@admin.register(HomeStatic)
class HomeStaticAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'yearsExperience',
        'projectsCompleted',
    )