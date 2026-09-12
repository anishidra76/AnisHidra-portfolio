from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Visitor
from .serializers import VisitorSerializer

from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
import random


class VisitorViewSet(ModelViewSet):
    queryset = Visitor.objects.all().order_by('-visited_at')
    serializer_class = VisitorSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    def test_visit(self, request):
        return Response({
            "message": "Anis Hidra"
        })

def health_check(request):
    return JsonResponse({"status":"ok"})