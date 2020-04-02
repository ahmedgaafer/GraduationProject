from django.urls import path
from .views import schema_view
urlpatterns =[
    path('' , schema_view)
]