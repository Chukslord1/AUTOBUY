# Generated by Django 2.2.4 on 2020-10-08 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0034_car_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='body_style',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='color',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='drive_train',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='engine',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='interior_color',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='no_of_seats',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='overview',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='owner_review',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='car',
            name='reg_date',
            field=models.TextField(blank=True, null=True),
        ),
    ]
