# Generated by Django 4.0.5 on 2022-07-15 13:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("listings", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ListingView",
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
                ("daily", models.IntegerField(default=0)),
                ("weekly", models.IntegerField(default=0)),
                ("monthly", models.IntegerField(default=0)),
                ("yearly", models.IntegerField(default=0)),
                ("total", models.IntegerField(default=0)),
                (
                    "listing",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="listings.listing",
                    ),
                ),
            ],
            options={
                "verbose_name": "Listing View",
                "verbose_name_plural": "Listing Views",
            },
        ),
    ]
