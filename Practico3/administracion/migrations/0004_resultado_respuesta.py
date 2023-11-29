# Generated by Django 4.2.2 on 2023-11-29 19:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0003_actividad_nivel_recurso_remove_juego_generos_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Resultado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resultado', models.TextField()),
                ('nivel', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='nivel', to='administracion.nivel')),
            ],
        ),
        migrations.CreateModel(
            name='Respuesta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.IntegerField(choices=[(1, 'Tradicional'), (2, 'Americano')])),
                ('respuesta', models.TextField()),
                ('recursos_respuesta', models.ManyToManyField(related_name='recursos_respuesta', to='administracion.recurso')),
            ],
        ),
    ]