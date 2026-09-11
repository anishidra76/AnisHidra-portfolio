from django.db import models


class HomeStatic(models.Model):
    yearsExperience = models.PositiveIntegerField()
    projectsCompleted = models.PositiveIntegerField()
    def __str__(self):
        return f"Years : {self.yearsExperience} | Projects : {self.projectsCompleted}"