# Generated by Django 2.2.4 on 2020-10-18 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0047_booking'),
    ]

    operations = [
        migrations.CreateModel(
            name='NewsLetter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
