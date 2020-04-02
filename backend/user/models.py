from django.db import models

# Create your models here.

class user(models.Model):
  name = models.CharField(max_length=100)
  image = models.CharField(max_length=500)
  email = models.EmailField(max_length=100, unique=True)
  password = models.CharField(max_length=100)
  created_at = models.DateTimeField(auto_now_add=True)