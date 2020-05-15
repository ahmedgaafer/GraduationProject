from django.urls import path 
from .views import *

urlpatterns = [
    path('', index),
    path('Signin/' , index) ,
    path('AboutUs/' , index) ,
    path('Signup/' , index) ,
    path('dev/' , index) ,
    path('profile/', index),
    path('Services/', index),
    path('home/', index),
    path('history/', index),
    path('patients/', index)

]

