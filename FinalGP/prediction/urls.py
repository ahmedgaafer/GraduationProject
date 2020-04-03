from django.urls import include , path
from .views import *
urlpatterns=[
    path('automate/' , Automate.as_view())
]