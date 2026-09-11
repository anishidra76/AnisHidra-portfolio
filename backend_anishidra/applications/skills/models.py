from django.db import models


class Domain(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class Sector(models.Model):
    domain = models.ForeignKey(
        Domain,
        on_delete=models.CASCADE,
        related_name="sectors"
    )
    name = models.CharField(max_length=50, blank=True, null=True, default="")
    def __str__(self):
        return self.name

class Section(models.Model):
    sector = models.ForeignKey(
        Sector,
        on_delete=models.CASCADE,
        related_name="sections",
    )
    name = models.CharField(max_length=50, blank=True, null=True, default="")
    def __str__(self):
        return self.name

class Skill(models.Model):
    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name="skills"
    )
    name = models.CharField(max_length=50, blank=True, null=True, default="")
    lv = models.IntegerField()
    def __str__(self):
        return f"{self.name} - {self.lv}"