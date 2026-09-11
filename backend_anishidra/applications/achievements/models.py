from django.db import models


class AchievementCard(models.Model):
    title = models.CharField(max_length=50)
    link = models.URLField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    description = models.TextField()
    value1 = models.CharField(max_length=30)
    label1 = models.CharField(max_length=30)
    value2 = models.CharField(max_length=30)
    label2 = models.CharField(max_length=30)
    value3 = models.CharField(max_length=30)
    label3 = models.CharField(max_length=30)
    def __str__(self):
        return self.title