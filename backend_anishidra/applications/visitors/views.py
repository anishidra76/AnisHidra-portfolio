from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Visitor
from .serializers import VisitorSerializer



class VisitorViewSet(ModelViewSet):
    queryset = Visitor.objects.all().order_by('-visited_at')
    serializer_class = VisitorSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = self.request.META.get('REMOTE_ADDR')

        user_agent = self.request.META.get('HTTP_USER_AGENT', '')
        serializer.save(ip_address=ip, user_agent=user_agent)