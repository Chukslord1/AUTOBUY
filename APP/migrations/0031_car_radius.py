# Generated by Django 2.2.4 on 2020-10-07 23:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0030_make'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='radius',
            field=models.TextField(blank=True, null=True),
        ),
    ]