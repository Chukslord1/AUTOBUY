# Generated by Django 2.2.4 on 2020-10-25 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0049_car_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='state',
            field=models.TextField(blank=True, default=True, null=True),
        ),
    ]