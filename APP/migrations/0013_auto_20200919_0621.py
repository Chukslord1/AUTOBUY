# Generated by Django 2.2.4 on 2020-09-19 05:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('APP', '0012_userprofile_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='user_type',
            field=models.CharField(choices=[('Dealer', 'Dealer'), ('Buyer', 'Buyer')], max_length=100),
        ),
        migrations.CreateModel(
            name='Featured',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(blank=True, null=True)),
                ('category', models.TextField(blank=True, null=True)),
                ('power', models.IntegerField(blank=True, null=True)),
                ('speed', models.IntegerField(blank=True, null=True)),
                ('model', models.TextField(blank=True, null=True)),
                ('make', models.TextField(blank=True, null=True)),
                ('model_year', models.TextField(blank=True, null=True)),
                ('transmission', models.TextField(blank=True, null=True)),
                ('fuel_type', models.TextField(blank=True, null=True)),
                ('condition', models.TextField(blank=True, null=True)),
                ('use_state', models.TextField(blank=True, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('phone', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, null=True)),
                ('slug', models.SlugField()),
                ('image', models.ManyToManyField(to='APP.Images')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]