# Generated by Django 2.2.4 on 2020-10-12 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0043_insurance'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clearing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True, null=True)),
                ('phone', models.TextField(blank=True, null=True)),
                ('make', models.TextField(blank=True, null=True)),
                ('model', models.TextField(blank=True, null=True)),
                ('year', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
