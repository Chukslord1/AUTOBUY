# Generated by Django 2.2.4 on 2020-09-20 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0017_auto_20200920_0300'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
    ]
