from django.urls import path, include
from rest_framework import routers

from administracion.apis.actividad_viewset import ActividadViewSet
from administracion.apis.nivel_viewset import NivelViewSet
from administracion.apis.recurso_viewset import RecursoViewSet
from administracion.apis.usuario_viewset import UserViewSet



router = routers.DefaultRouter()
router.register(r'nivel', NivelViewSet)
router.register(r'recurso', RecursoViewSet)
router.register(r'actividad', ActividadViewSet)
router.register(r'user', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
]