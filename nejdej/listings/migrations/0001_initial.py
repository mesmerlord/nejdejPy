# Generated by Django 3.2.13 on 2022-05-24 20:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import nejdej.utils.storages


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('categories', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255)),
                ('slug', models.SlugField(max_length=255, primary_key=True, serialize=False)),
                ('description', models.TextField(blank=True, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to=nejdej.utils.storages.ListingImageStorage())),
                ('status', models.CharField(choices=[('DF', 'Draft'), ('PB', 'Published'), ('DN', 'Denied')], editable=False, help_text=[('DF', 'Draft'), ('PB', 'Published'), ('DN', 'Denied')], max_length=2)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('sub_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='categories.subcategory')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Listing',
                'verbose_name_plural': 'Listings',
            },
        ),
    ]
