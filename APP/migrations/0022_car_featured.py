# Generated by Django 2.2.4 on 2020-09-20 03:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0021_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='featured',
            field=models.BooleanField(default=False),
        ),
    ]
