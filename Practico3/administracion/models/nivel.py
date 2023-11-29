from django.db import models

from administracion.models import Recurso, Actividad


class Nivel(models.Model):
    nombre = models.CharField(max_length=50, null=True)
    puntaje_maximo = models.IntegerField()
    repeticion_permitida = models.IntegerField()

    recursos = models.ManyToManyField(
        Recurso,
        related_name='recursos', null=True
    )
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name='actividad', null=False, default=1)
