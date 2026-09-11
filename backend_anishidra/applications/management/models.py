from django.db import models


class Client(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    role = models.CharField(max_length=30)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=20)
    type = models.CharField(max_length=50)
    start = models.DateField()
    end = models.DateField()
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    expenses = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20)
    total = models.DecimalField(max_digits=8, decimal_places=2, editable=False)
    def save(self, *args, **kwargs):
        self.total = self.amount - self.expenses
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.firstName} - {self.lastName}"

class externalIncome(models.Model):
    source = models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    expenses = models.DecimalField(max_digits=8, decimal_places=2)
    total = models.DecimalField(max_digits=8, decimal_places=2, editable=False)
    date = models.DateField(null=True)
    def save(self, *args, **kwargs):
        self.total = self.amount - self.expenses
        super().save(*args, **kwargs)
    def __str__(self):
        return self.source

class externalExpense(models.Model):
    beneficiary = models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    expenses = models.DecimalField(max_digits=8, decimal_places=2)
    date = models.DateField(null=True)
    def __str__(self):
        return self.beneficiary