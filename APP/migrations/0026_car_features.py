# Generated by Django 2.2.4 on 2020-09-21 04:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0025_userprofile_premium_feature_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='features',
            field=models.TextField(blank=True, null=True),
        ),
    ]
