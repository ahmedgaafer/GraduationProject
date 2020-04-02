from user.models import user
from rest_framework import viewsets, permissions
from .serializer import userSeializer


#user Viewset
class userViewSet(viewsets.ModelViewSet):
  queryset = user.objects.all()
  permission_classes = (permissions.AllowAny,)
    
  

  serializer_class = userSeializer