from rest_framework import serializers
from .models import Client, externalIncome, externalExpense


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class externalIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = externalIncome
        fields = '__all__'

class externalExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = externalExpense
        fields = '__all__'