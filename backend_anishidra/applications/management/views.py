from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Client, externalIncome, externalExpense
from .serializers import ClientSerializer, externalIncomeSerializer, externalExpenseSerializer


class ClientViewSet(ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class externalIncomeViewSet(ModelViewSet):
    queryset = externalIncome.objects.all()
    serializer_class = externalIncomeSerializer

class externalExpenseViewSet(ModelViewSet):
    queryset = externalExpense.objects.all()
    serializer_class = externalExpenseSerializer