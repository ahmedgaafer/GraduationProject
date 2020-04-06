from django.urls import include , path
from .views import *
urlpatterns=[
    path('automate/' , Automate.as_view()) ,
    path('malaria/' , Malaria.as_view()),
    path('skin/' , Skin.as_view()) ,
    path('brain/' , Brain.as_view())
]