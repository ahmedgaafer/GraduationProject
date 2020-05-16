from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response 
from .auth.permissions import *
from .models import *
# Create your views here.


class ListDoctors(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self , request , *args , **kwargs):
        query  = Doctor.objects.all().values()
        data   = []
        for i in query:
            data.append(i)
        return Response(data , status=200)
    
    
class ListPatientsofDoctor(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self , request , *args , **kwargs):
        Id = kwargs['id']
        query  = Patient.objects.filter(relate_doctor=Id).values()
        data   = []
        for i in query:
            data.append(i)
            
        return Response(data , status=200)
    
class AddPatientToDoctor(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self , request , *args , **kwargs):
        data  = request.data
        Id_doctor = data.get('id_doctor')
        email_patient = data.get('email_patient')
        query_patient = Patient.objects.filter(Email=email_patient).first()
        quey_doctor   = Doctor.objects.filter(id=Id_doctor).first()
        query_patient.relate_doctor = quey_doctor
        query_patient.save()
        return Response({'Process' : 'done'} , status=200)
    
    
class DoctorOfPatient(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self , request , *args , **kwargs):
        id_patient = kwargs['id']
        try:
            query = Patient.objects.filter(id=id_patient).first()
            q= Doctor.objects.filter(id=query.relate_doctor.id).values()
            return Response(data=q , status=200)
        except:
            return Response(data="false" , status=200)
     
    
    
class PatientCases(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self , request , *args , **kwargs):

        Id   = kwargs['id']
        query  = Case.objects.filter(relate_patient=Id).values()
        data  = []
        for i in query:
            data.append(i)
        print(Id, data)
        return Response(data , status=200)
        
