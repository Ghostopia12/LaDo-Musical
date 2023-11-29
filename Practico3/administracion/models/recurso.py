from django.db import models


class Recurso(models.Model):
    TIPO_AUDIO = 1
    TIPO_PARTITURA = 2


    TIPO_CHOICES = (
        (TIPO_AUDIO, 'Audio'),
        (TIPO_PARTITURA, 'Partitura'),
    )
    tipo = models.IntegerField(
        choices=TIPO_CHOICES
    )
    tiempo = models.IntegerField() #medido en segundos
    archivo = models.ImageField(upload_to='media/recurso', null=True, blank=True)


    def __str__(self):
        return self.nombre
