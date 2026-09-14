from django.db import models
from cloudinary.models import CloudinaryField



class EducationCard(models.Model):
    specialization = models.CharField(max_length=50)
    field = models.CharField(max_length=50)
    entity = models.CharField(max_length=50)
    date = models.CharField(max_length=50)
    degree = models.CharField(max_length=50)
    def __str__(self):
        return f"{self.specialization} - {self.field}"

class CertificateCard(models.Model):
    name = models.CharField(max_length=50)
    link = models.URLField(blank=True)
    image = CloudinaryField("image", blank=True, null=True)
    def __str__(self):
        return self.name