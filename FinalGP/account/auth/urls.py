from django.urls import path
from FinalGP import settings
from .views import *
from django.conf.urls.static import static
urlpatterns = [
    path('login/' , Login.as_view()),
    path('register/' , Register.as_view()) ,
    path('' , Showdata.as_view())
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)