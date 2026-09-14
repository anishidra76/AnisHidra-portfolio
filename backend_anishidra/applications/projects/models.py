from django.db import models
from cloudinary.models import CloudinaryField



class ProjectCard(models.Model):
    type = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    description = models.TextField()
    sourcecodelink = models.URLField(blank=True)
    projectlink = models.URLField(blank=True)
    morelink = models.URLField(blank=True)
    image = CloudinaryField("image", blank=True, null=True)
    def __str__(self):
        return f"{self.type} - {self.name}"