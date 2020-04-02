from rest_framework import routers
from .API import userViewSet

router = routers.DefaultRouter()

router.register('api/users', userViewSet, 'users')

urlpatterns = router.urls
