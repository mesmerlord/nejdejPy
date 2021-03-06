# Generated by Django 4.0.5 on 2022-07-15 13:13

from django.db import migrations, models
import django.db.models.deletion
import nejdej.utils.storages
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("listings", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Review",
            fields=[
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("DF", "Draft"),
                            ("PB", "Published"),
                            ("DN", "Denied"),
                        ],
                        editable=False,
                        help_text=[
                            ("DF", "Draft"),
                            ("PB", "Published"),
                            ("DN", "Denied"),
                        ],
                        max_length=2,
                    ),
                ),
                (
                    "listing",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="listings.listing",
                    ),
                ),
            ],
            options={
                "verbose_name": "Review",
                "verbose_name_plural": "Reviews",
            },
        ),
        migrations.CreateModel(
            name="ReviewImage",
            fields=[
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        null=True,
                        storage=nejdej.utils.storages.ReviewImageStorage(),
                        upload_to="",
                    ),
                ),
                (
                    "review",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="reviews.review"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
