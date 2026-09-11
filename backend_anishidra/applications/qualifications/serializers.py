from rest_framework import serializers
from .models import EducationCard, CertificateCard


class EducationCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationCard
        fields = ['id', 'specialization', 'field', 'entity', 'date', 'degree']

class CertificateCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificateCard
        fields = ['id', 'name', 'link', 'image']