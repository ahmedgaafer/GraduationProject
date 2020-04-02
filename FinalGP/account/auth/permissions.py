from rest_framework import permissions
from account.models import *
from django.db.models import Q
from datetime import datetime

class IsTokenActive(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.META.get('HTTP_AUTHORIZATION')
        token = token.split(' ')
        print(token[1])
        query = Token.objects.filter((Q(Token=token[1])&(Q(Start_date__lte=datetime.now()) & Q(End_date__gte= datetime.now())) ))
        if len(query):
            return True
        else:
            return False