# Generated by Django 2.2.4 on 2020-10-26 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0053_delivery'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookmark',
            name='slug',
            field=models.SlugField(default='first'),
            preserve_default=False,
        ),
    ]
