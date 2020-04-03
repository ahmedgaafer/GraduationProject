import os
import cv2
import joblib
from django.core.files.storage import default_storage
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from account.auth.permissions import *
from account.auth.utils import *
from automation.automation import *
from rest_framework.permissions import *
from PIL import Image
from PIL.Image import Image
import pandas as pd
from Malaria.malaria import pre_extract
from Brain.main import Predict_Brain
from CancerSkin import image_clean , GLCM
# Create your views here.
class Automate(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self , request , *args , **kwargs):
        data    = request.data
        pic     = data.get('picture')
        path    =  os.path.join(settings.MEDIA_ROOT, 'uploads/', pic.name)
        f_path  = default_storage.save(path, pic)
        img     = cv2.imread('media/uploads/' + pic.name)
        skin    = automate('media/centroid_images/skin automation' , img)
        brain   = automate('media/centroid_images/Brain automation', img)
        Malaria = automate('media/centroid_images/Malaria automation', img)
        if skin > Malaria and skin > brain :
            img = image_clean.hair_removal(img)
            img = Image.fromarray(img)
            img = image_clean.preprocessing(img)
            df  = pd.DataFrame([GLCM.GLCM(img)] , columns=['contrast','homo', 'energy', 'correlation'])
            svc_from_file = joblib.load('CancerSkin/saved_model_pkl.pkl')
            prediction = svc_from_file.predict(df)
            if prediction == 0:
                return Response({
                    'Type' : 'Skin Cancer' ,
                    'Result': False
                } , status=200)
            else:
                return Response({
                    'Type': 'Skin Cancer',
                    'Result': True
                }, status=200)
        elif Malaria > skin and Malaria > brain :
            prediction = pre_extract(img)
            if prediction[0] != 'U':
                return Response(
                    {
                        'Type' : 'Malaria' ,
                        'Result':prediction[0]
                    },status=200)
            else:
                return Response({
                    'Type' : 'Malaria',
                    'Result':prediction[0]
                },status=200)
        else:
            res = Predict_Brain(photo=img)
            svc_from_file = joblib.load('Brain/SVM_BRAIN.pkl')  # LOADING THE SAVED MODEL
            prediction = svc_from_file.predict(res)
            if prediction[0] != 'Y':
                return Response({
                    'Type' : 'Brain Tumor',
                    'Result':False
                } , status=200)
            else:
                return Response({
                    'Type': 'Brain Tumor',
                    'Result': True
                }, status=200)




