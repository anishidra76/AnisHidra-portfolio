from rest_framework import serializers
from .models import Domain, Sector, Section, Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Section
        fields = '__all__'

class SectorSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Sector
        fields = '__all__'

class DomainSerializer(serializers.ModelSerializer):
    sectors = SectorSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Domain
        fields = '__all__'