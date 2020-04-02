from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from .models import user

def home(request):
  userData = user.objects.all()
  for feild in userData:
    print(f"mail: {feild.email}")

  return(HttpResponse('asdasd'))