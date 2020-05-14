from django.db import models
from datetime import datetime , timedelta
from django.utils import timezone
from PIL import Image
# Create your models here.
class User(models.Model):
    FirstName = models.CharField(max_length=50 , null=False , blank=False )
    LastName = models.CharField(max_length=50 , null=False , blank=False )
    Password = models.CharField(max_length=50 , null=False , blank=False)
    Email    = models.EmailField(max_length=100 , null=False , blank=False , unique=True)
    Active   = models.BooleanField(default=True)
    Phone    = models.CharField(max_length=15 , null=True , blank=True)
    Location = models.CharField(max_length=200 , null=True , blank=True)
    Image    = models.ImageField(upload_to='../media/profilepic/' , default='../media/profilepic/user.png' )
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        output_size = (500, 500)
        img.thumbnail(output_size)
        img.save(self.image.path)
    def __str__(self):
        return f'{self.FirstName} {self.LastName}'

class Token(models.Model):
    Username    = models.ForeignKey(User , on_delete=models.CASCADE)
    Token       = models.CharField(max_length=300 , null=False , blank=False , unique=True)
    Start_date  = models.DateTimeField(default=timezone.now())
    End_date    = models.DateTimeField(default=timezone.now() + timedelta(days=7))
    

class Doctor(User):
    specialization = models.CharField(max_length=100 , null=True , blank=True)
    cv            = models.FileField(upload_to='../media/cv/' , default=None , blank=True , null=True)
   

class Patient(User):
    relate_doctor      =models.ForeignKey(Doctor , on_delete=models.CASCADE)
    
    
class Case(models.Model):
    image  = models.ImageField(upload_to='../media/cases/' , default='../media/cases/default.jpeg' ,null=False , blank=False)
    relate_patient = models.ForeignKey(Patient , on_delete=models.CASCADE)
    case_name    = models.CharField(max_length = 100 , null=False , blank=False)
    case_description = models.TextField(null=True , blank=True)
    specialization = models.CharField(max_length=50 , null=False , blank=False)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        output_size = (800, 600)
        img.thumbnail(output_size)
        img.save(self.image.path)
    def __str__(self):
        return f'{self.username}'