from django.db import models


class Visitor(models.Model):
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    visited_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.ip_adress} - {self.visited_at}"