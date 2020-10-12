# Generated by Django 2.2.4 on 2020-10-12 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0041_userprofile_created_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('phone', models.TextField(blank=True, null=True)),
                ('state', models.TextField(blank=True, null=True)),
                ('job', models.TextField(blank=True, null=True)),
                ('employer', models.TextField(blank=True, null=True)),
            ],
        ),
    ]