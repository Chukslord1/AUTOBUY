# Generated by Django 2.2.4 on 2020-09-20 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0019_auto_20200920_0309'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
