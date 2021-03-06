# Generated by Django 4.0.5 on 2022-07-16 19:52

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Profile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("bio", models.TextField(blank=True, null=True, verbose_name="Bio")),
                (
                    "phone",
                    models.CharField(
                        blank=True, max_length=20, null=True, verbose_name="Phone"
                    ),
                ),
                (
                    "address",
                    models.CharField(
                        blank=True, max_length=255, null=True, verbose_name="Address"
                    ),
                ),
                (
                    "city",
                    models.CharField(
                        blank=True, max_length=255, null=True, verbose_name="City"
                    ),
                ),
                (
                    "country",
                    models.CharField(
                        blank=True, max_length=255, null=True, verbose_name="Country"
                    ),
                ),
                (
                    "zip_code",
                    models.CharField(
                        blank=True, max_length=10, null=True, verbose_name="Zip code"
                    ),
                ),
                (
                    "geo_point",
                    django.contrib.gis.db.models.fields.PointField(
                        blank=True, geography=True, null=True, srid=4326
                    ),
                ),
            ],
            options={
                "verbose_name": "Profile",
                "verbose_name_plural": "Profiles",
            },
        ),
        migrations.RemoveField(
            model_name="user",
            name="name",
        ),
        migrations.AddField(
            model_name="user",
            name="first_name",
            field=models.CharField(
                blank=True, max_length=255, verbose_name="First name of User"
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="last_name",
            field=models.CharField(
                blank=True, max_length=255, null=True, verbose_name="Name of User"
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="locale",
            field=models.CharField(
                choices=[("cs", "Czech"), ("en", "English"), ("sk", "Slovak")],
                default="en",
                max_length=3,
                verbose_name="Name of User",
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="profile",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="user",
                to="users.profile",
            ),
        ),
    ]
