from django.contrib import admin
from .models import Domain, Sector, Section, Skill

@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
    ]
    search_fields = [
        "name",
    ]
    ordering = [
        'id',
    ]

@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'domain',
    ]
    list_filter = [
        'domain',
    ]
    search_fields = [
        'name',
    ]
    ordering = [
        'id',
    ]

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'sector',
    ]
    list_filter = [
        'sector',
    ]
    search_fields = [
        'name',
    ]
    ordering = [
        'id',
    ]

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'lv',
        'section',
    ]
    list_filter = [
        'section',
    ]
    search_fields = [
        'name',
    ]
    ordering = [
        'id',
    ]