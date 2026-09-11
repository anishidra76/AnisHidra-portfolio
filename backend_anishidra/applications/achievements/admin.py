from django.contrib import admin
from .models import AchievementCard


@admin.register(AchievementCard)
class AchievementCardAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'link',
        'icon',
        'description',
        'value1',
        'label1',
        'value2',
        'label2',
        'value3',
        'label3',
    )