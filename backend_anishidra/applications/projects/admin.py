from django.contrib import admin
from .models import ProjectCard


admin.register(ProjectCard)
class ProjectCardAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'type',
        'name',
        'sourcecodelink',
        'projectlink',
        'morelink'
    )
    list_filter = (
        'id',
        'type',
    )