from django.db import models


class AboutContent(models.Model):
    image = models.ImageField(upload_to="", blank=True, null=True)
    description = models.TextField()
    def __str__(self):
        return self.description
