from django.db import models


class ServiceCard(models.Model):
    domain = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    description = models.TextField()
    def __str__(self):
        return self.title