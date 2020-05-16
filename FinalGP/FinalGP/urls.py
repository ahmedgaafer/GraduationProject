"""FinalGP URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path , include
from rest_framework.schemas import get_schema_view

from FinalGP import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('' , include('front.urls')) ,
    path('api/auth/' , include('account.auth.urls')) ,
    path('api-docs/' , include('api_docs.urls')) ,
    path('api-predict/' , include('prediction.urls')),
    path('api/', include('account.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
