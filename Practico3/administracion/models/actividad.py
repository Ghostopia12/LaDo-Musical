from django.db import models


class Actividad(models.Model):
    FACIL = 1
    MEDIO = 2
    DIFICIL = 3


    DIFICULTADES = (
        (FACIL, 'Facil'),
        (MEDIO, 'Medio'),
        (DIFICIL, 'Dificil'),
    )
    dificultad = models.IntegerField(
        choices=DIFICULTADES
    )
    nombre = models.CharField(max_length=50)


    def __str__(self):
        return self.nombre
