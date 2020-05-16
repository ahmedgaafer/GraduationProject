import os
import cv2
import joblib
import json
from PIL import Image
from django.contrib.sites import requests
from django.core.files.storage import default_storage
from requests import post
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from account.auth.permissions import *
from account.auth.utils import *
from automation.automation import *
from rest_framework.permissions import *
#from PIL.Image import Image
from CancerSkin import *
from PIL import Image
#from PIL.Image import Image
import pandas as pd
from Malaria.malaria import pre_extract
from Brain.main import Predict_Brain
from CancerSkin import image_clean , GLCM
from account.models import Patient , Case
# Create your views here.
class Malaria(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self , request , *args , **kwargs):
        data    = request.data
        pic     = data.get('picture')
        Id = data.get('id')
        patient=None
        if Id != None:
            patient = Patient.objects.filter(id=Id).first()
        path    = os.path.join(settings.MEDIA_ROOT , 'uploads/Malaria/' , pic.name)
        f_path  = default_storage.save(path, pic)
        img     = cv2.imread('media/uploads/Malaria/' + pic.name)
        prediction = pre_extract(img)
        img     = cv2.imread('media/uploads/Malaria/' + pic.name)
        if Id != None:
            case    = Case(image='uploads/Malaria/' + pic.name , relate_patient=patient , case_name=prediction[0] ,specialization='Malaria' )
            case.save()
        else:
            case = Case(image='uploads/Malaria/' + pic.name, relate_patient=None, case_name=prediction[0], specialization='Malaria')
            case.save()
        return Response(
                {
                    'Result': prediction[0]
                }, status=200)

class Skin(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self , request , *args , **kwargs):
        data = request.data
        pic = data.get('picture')
        Id = data.get('id')
        patient=None
        if Id != None:
            patient = Patient.objects.filter(id=Id).first()
        path = os.path.join(settings.MEDIA_ROOT, 'uploads/Skin', pic.name)
        f_path = default_storage.save(path, pic)
        img = cv2.imread('media/uploads/Skin/' + pic.name)
        img = image_clean.hair_removal(img)
        img = Image.fromarray(img)
        img = image_clean.preprocessing(img)
        df  = pd.DataFrame([GLCM.GLCM(img)] , columns=['contrast','homo', 'energy', 'correlation'])
        svc_from_file = joblib.load('CancerSkin/saved_model_pkl.pkl')
        prediction = svc_from_file.predict(df)
        img = cv2.imread('media/uploads/Skin/' + pic.name)
        if Id != None:
            case = Case(image='uploads/Skin/' + pic.name, relate_patient=patient, case_name=prediction[0], specialization='Skin')
            case.save()
        else:
            case = Case(image='uploads/Skin/' + pic.name, relate_patient=None, case_name=prediction[0], specialization='Skin')
            case.save()
        if prediction == 0:
            return Response({
                'Result': False
            } , status=200)
        else:
            return Response({
                'Result': True
            }, status=200)

class Brain(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self , request , *args , **kwargs):
        data = request.data
        pic = data.get('picture')
        Id = data.get('id')
        patient = None
        if Id != None:
            patient = Patient.objects.filter(id=Id).first()
        path = os.path.join(settings.MEDIA_ROOT, 'uploads/Brain/', pic.name)
        f_path = default_storage.save(path, pic)
        img = cv2.imread('media/uploads/Brain/' + pic.name)
        res = Predict_Brain(photo=img)
        svc_from_file = joblib.load('Brain/SVM_BRAIN.pkl')  # LOADING THE SAVED MODEL
        prediction = svc_from_file.predict(res)
        img = cv2.imread('media/uploads/Brain/' + pic.name)
        if Id != None:
            case = Case(image='uploads/Brain/' + pic.name, relate_patient=patient, case_name=prediction[0], specialization='Brain')
            case.save()
        else:
            case = Case(image='uploads/Brain/' + pic.name, relate_patient=None, case_name=prediction[0], specialization='Brain')
            case.save()
        if prediction[0] != 'Y':
            return Response({
                'Result':False
            } , status=200)
        else:
            return Response({
                'Result': True
            }, status=200)


class Automate(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self , request , *args , **kwargs):
        data    = request.data
        pic     = data.get('picture')
        path    =  os.path.join(settings.MEDIA_ROOT, 'uploads/automate/', pic.name)
        f_path  = default_storage.save(path, pic)
        img     = cv2.imread('media/uploads/automate/' + pic.name)
        skin    = automate('media/centroid_images/skin automation' , img)
        brain   = automate('media/centroid_images/Brain automation', img)
        Malaria = automate('media/centroid_images/Malaria automation', img)
        if skin > Malaria and skin > brain :
            filename = 'media/uploads/automate/' + pic.name
            up = {'picture': (filename, open(filename, 'rb'), "multipart/form-data")}
            response = post('http://127.0.0.1:8000/api-predict/skin/', files=up)
            content = response.json()
            res = {
                'Type': 'Skin Cancer',
                'Result': str(content['Result']).upper()
            }
            return Response(res, status=200)

        elif Malaria > skin and Malaria > brain :
            filename = 'media/uploads/automate/' + pic.name
            up = {'picture': (filename, open(filename, 'rb'), "multipart/form-data")}
            response = post('http://127.0.0.1:8000/api-predict/malaria/', files= up)

            content = response.json()
            res = {
                'Type' : 'Malaria' ,
                'Result' : content['Result']
            }
            return Response( res, status=200)

        else:
            filename = 'media/uploads/automate/' + pic.name
            up = {'picture': (filename, open(filename, 'rb'), "multipart/form-data")}
            response = post('http://127.0.0.1:8000/api-predict/brain/', files=up)
            content = response.json()
            res = {
                'Type': 'Brain Cancer',
                'Result': content['Result']
            }
            return Response(res, status=200)




