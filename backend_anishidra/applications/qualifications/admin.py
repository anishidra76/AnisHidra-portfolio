from django.contrib import admin
from .models import EducationCard, CertificateCard


@admin.register(EducationCard)
class EducationCardAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'specialization',
        'field',
        'entity',
        'date',
        'degree',
    )

@admin.register(CertificateCard)
class CertificateCardAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'link',
    )