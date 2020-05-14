from django.contrib import admin
from .models import Doctor , Patient , Case
# Register your models here.
from django.utils.html import format_html
from imagekit.admin import AdminThumbnail

admin.site.site_header = 'Image Based Diagnosis Disease'
admin.site.site_title = 'IBDD'


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
   
    image_display = AdminThumbnail(image_field='Image' )
    image_display.short_description = 'Image'

    readonly_fields = ['image_display'] 
    
    list_display =[ 'Email' , 'specialization' , 'Active' ]
    
    ordering     =['Active' , 'Email']
    
    list_editable=['Active']
    
    search_fields=[ 'Email' , 'specialization']
    
    list_filter  =['Active']
    
    save_on_top = True
    
    fieldsets = (
         ('Personal Data' ,{
             'fields' :(
     
                 ('FirstName'  , 'LastName', 'image_display'),
                 ('specialization'),
                 ('Password'),
                 ('Email'),
                 ('Phone'),
                 ('Location'),
                 ('cv'),
                 ('Active'),
                 ('Image'),
                   
             )
         }),
         
    )


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
   
    image_display = AdminThumbnail(image_field='image' )
    image_display.short_description = 'Image'

    readonly_fields = ['image_display'] 
    
    list_display =['relate_patient' ,'case_name' , 'specialization' ]
    
    search_fields=['relate_patient' , 'case_name' , 'specialization']
    
    save_on_top = True
    
    fieldsets = (
         ('Data' ,{
             'fields' :(
                 ('image_display'),
                 ('specialization'),
                 ('case_name'),
                 ('relate_patient'),
                 ('image'),
                   
             )
         }),
         
    )



@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
   
    image_display = AdminThumbnail(image_field='Image' )
    image_display.short_description = 'Image'

    readonly_fields = ['image_display'] 
    
    list_display =[ 'Email' , 'Active' ]
    
    ordering     =['Active'  , 'Email']
    
    list_editable=['Active']
    
    search_fields=[ 'Email']
    
    list_filter  =['Active']
    
    save_on_top = True
    
    fieldsets = (
         ('Personal Data' ,{
             'fields' :(
                 ('FirstName' , 'LastName' , 'image_display'),
                 ('Password'),
                 ('Email'),
                 ('Phone'),
                 ('Location'),
                 ('Active'),
                 ('Image') ,
                 ('relate_doctor')
                   
             )
         }),
         
    )