from django.db import models

from administracion.models import Recurso, Nivel


class Resultado(models.Model):
    resultado = models.TextField()
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name='nivel', null=False, default=1)
