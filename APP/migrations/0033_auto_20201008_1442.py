# Generated by Django 2.2.4 on 2020-10-08 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0032_car_subtitle'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='discount_price',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='total_price',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
