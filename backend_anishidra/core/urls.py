"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token




urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/login/', obtain_auth_token),
    
    path('api/home/', include('applications.home.urls')),
    path('api/about/', include('applications.about.urls')),
    path('api/skills/', include('applications.skills.urls')),
    path('api/qualifications/', include('applications.qualifications.urls')),
    path('api/achievements/', include('applications.achievements.urls')),
    path('api/projects/', include('applications.projects.urls')),
    path('api/services/', include('applications.services.urls')),

    path('api/contact/', include('applications.contact.urls')),
    path('api/management/', include('applications.management.urls')),
    path('api/visitors/', include('applications.visitors.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)