from rest_framework import serializers
from user.models import user

#User Serilaizer
class userSeializer(serializers.ModelSerializer):
  class Meta:
    model = user
    fields = "__all__"