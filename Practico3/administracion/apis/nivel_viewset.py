from django.db import transaction
from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from administracion.apis.actividad_viewset import ActividadSerializer
from administracion.apis.usuario_viewset import UserSimpleSerializer
from administracion.models import Nivel, Recurso
from pydub import AudioSegment
from io import BytesIO

class NivelSerializer(serializers.ModelSerializer):
    actividad_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Nivel
        fields = '__all__'


class NivelViewSet(viewsets.ModelViewSet):
    queryset = Nivel.objects.all()
    serializer_class = NivelSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            recurso = request.data['recurso']

            if recurso.content_type.startswith('audio'):
                tipo = Recurso.TIPO_AUDIO
            else:
                tipo = Recurso.TIPO_PARTITURA
            recurso_creado = Recurso.objects.create(
                archivo=recurso,
                tiempo=request.data['tiempo'],
                tipo=tipo
            )
            nivel = Nivel.objects.create(
                nombre=request.data['nombre'],
                repeticion_permitida=request.data['repeticion_permitida'],
                puntaje_maximo=request.data['puntaje_maximo'],
                actividad_id=int(request.data['actividad_id'])
            )
            nivel.recursos.set([recurso_creado])
            nivel.save()
            return Response(status=201)

    @action(detail=False, methods=['get'], url_path='juegos_x_genero', name="Niveles de una actividad")
    def juegos_x_generos(self, request, pk=None):
        actividad = request.actividad
        queryset = Nivel.objects.filter(actividad=actividad)
        serializer = NivelSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        try:
            reunion = self.get_object()
            if reunion.owner == request.user:
                reunion.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                participante = reunion.participantes.filter(id=request.user.id).first()
                if participante is not None:
                    reunion.participantes.remove(participante)
                    return Response(status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response(status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response(e)
