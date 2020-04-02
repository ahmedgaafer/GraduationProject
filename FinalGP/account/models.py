from django.db import models
from datetime import datetime , timedelta
from django.utils import timezone
# Create your models here.
class User(models.Model):
    FirstName = models.CharField(max_length=50 , null=False , blank=False )
    LastName =models.CharField(max_length=50 , null=False , blank=False )
    Password = models.CharField(max_length=50 , null=False , blank=False)
    Email    = models.EmailField(max_length=100 , null=False , blank=False , unique=True , primary_key=True)
    Status   = models.CharField(max_length=10 , null=False , blank=False)

class Token(models.Model):
    Username    = models.ForeignKey(User , on_delete=models.CASCADE)
    Token       = models.CharField(max_length=300 , null=False , blank=False , unique=True)
    Start_date  = models.DateTimeField(default=timezone.now())
    End_date    = models.DateTimeField(default=timezone.now() + timedelta(days=7))