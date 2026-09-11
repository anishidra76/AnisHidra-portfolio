from django.db import models


class ContactMessage(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=100)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.firstName} - {self.lastName} - {self.subject}"