from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import *
from .utils import *
from rest_framework_jwt.settings import api_settings
from account.models import *
from django.db.models import Q
from django.core import serializers

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class Login(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self , request , *args , **kwargs):
        data = request.data
        email = data.get('email')
        password = data.get('password')
        query = User.objects.filter( (Q(Email=email) & Q(Password=password)) & Q(Active=True) )
        if len(query):
            payload  = jwt_payload_handler(email=email , password=password)
            token    = jwt_encode_handler(payload)
            res = {
                     'message'  : 'Login Successfully' ,
                     'email' : email ,
                     'password' : password ,
                     'Token'    : token
            }
            Query = Token(Username=query[0] , Token=token)
            Query.save()
            return Response(res , status=200)
        else:
            res = {
                'message' : 'Invalid username or password'
            }
            return Response(res , status=401)

class Register(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self , request , *args , **kwargs):
        data     = request.data
        FirstName = data.get('firstname')
        LastName =data.get('lastname')
        Password = data.get('password')
        Email    = data.get('email')
        Status   = data.get('status')
        query = User.objects.filter((Q(Email=Email)))
        if len(query) == 0:
            if Status == 'doctor':
                query = Doctor(FirstName=FirstName, LastName=LastName , Password=Password, Email=Email)
            else:
                query = Patient(FirstName=FirstName, LastName=LastName , Password=Password, Email=Email)
            query.save()
            payload = jwt_payload_handler(email=Email, password=Password)
            token = jwt_encode_handler(payload)
            Query = Token(Username=query, Token=token)
            Query.save()
            res = {
                'message': 'You have registered successfully',
                'email': Email,
                'password': Password,
                'Token': token
            }
            return Response(res, status=200)

        else:
            res = {
                'message' : 'username had been taken'
            }
            return Response(res , status=401)

class Showdata(APIView):
    permission_classes = [IsTokenActive]
    def get(self , request , *args , **kwargs):
        all_users = User.objects.all().values()
        data = [all_users]
        for i in range(0 , len(data[0])):
            query  = User.objects.filter(Username=data[0][i]["Username"]).values()
            que = Token.objects.filter(Username=query[0]["Username"]).values('Token' , 'Start_date' , 'End_date')
            data[0][i]['tokens'] = que
        return Response(data , status=200)
