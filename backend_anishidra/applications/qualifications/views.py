from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import EducationCard, CertificateCard
from .serializers import EducationCardSerializer, CertificateCardSerializer
from rest_framework.permissions import AllowAny


class EducationCardViewSet(ModelViewSet):
    queryset = EducationCard.objects.all()
    serializer_class = EducationCardSerializer
    permission_classes = [AllowAny]

class CertificateCardViewSet(ModelViewSet):
    queryset = CertificateCard.objects.all()
    serializer_class = CertificateCardSerializer
    permission_classes = [AllowAny]