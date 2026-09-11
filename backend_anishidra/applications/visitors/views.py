from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Visitor
from .serializers import VisitorSerializer
from django.http import JsonResponse


class VisitorViewSet(ModelViewSet):
    queryset = Visitor.objects.all().order_by('-visited_at')
    serializer_class = VisitorSerializer
    permission_classes = [AllowAny]

def health_check(request):
    return JsonResponse({"status":"ok"})