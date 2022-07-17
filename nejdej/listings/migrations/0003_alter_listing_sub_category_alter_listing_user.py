# Generated by Django 4.0.5 on 2022-07-15 13:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0002_alter_subcategory_category'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('listings', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='sub_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listings', to='categories.subcategory'),
        ),
        migrations.AlterField(
            model_name='listing',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listings', to=settings.AUTH_USER_MODEL),
        ),
    ]