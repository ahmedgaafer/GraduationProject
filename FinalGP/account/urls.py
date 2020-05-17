from django.urls import path
from FinalGP import settings
from .views import *
from django.conf.urls.static import static
urlpatterns = [
    path('list-doctors/' , ListDoctors.as_view()),
    path('list-clear-patients/', ListClearPatients.as_view()),
    path('list-doctor-patients/<int:id>/' , ListPatientsofDoctor.as_view()),
    path('add-doctor-patient/' , AddPatientToDoctor.as_view()) ,
    path('doctor-of-patient/<int:id>/' , DoctorOfPatient.as_view()) , 
    path('list-patient-cases/<int:id>/' , PatientCases.as_view()) , 
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)