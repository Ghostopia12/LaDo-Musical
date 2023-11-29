from django.db import models

from administracion.models import Recurso


class Respuesta(models.Model):
    TRADICIONAL = 1
    AMERICANO = 2

    TIPO_CHOICES = (
        (TRADICIONAL, 'Tradicional'),
        (AMERICANO, 'Americano'),
    )
    tipo = models.IntegerField(
        choices=TIPO_CHOICES
    )
    respuesta = models.TextField()
    recursos_respuesta = models.ManyToManyField(
        Recurso,
        related_name='recursos_respuesta',
    )
