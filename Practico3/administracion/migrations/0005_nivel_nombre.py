# Generated by Django 4.2.2 on 2023-11-29 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0004_resultado_respuesta'),
    ]

    operations = [
        migrations.AddField(
            model_name='nivel',
            name='nombre',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
