from django.db import models
from cloudinary.models import CloudinaryField


class AboutContent(models.Model):
    image = CloudinaryField("image", blank=True, null=True)
    description = models.TextField()
    def __str__(self):
        return self.description
