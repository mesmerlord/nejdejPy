# Generated by Django 4.0.5 on 2022-07-15 13:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("listings", "0003_alter_listing_sub_category_alter_listing_user"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("reviews", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="review",
            name="listing",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="reviews",
                to="listings.listing",
            ),
        ),
        migrations.AlterField(
            model_name="review",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reviews",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="reviewimage",
            name="review",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="review_images",
                to="reviews.review",
            ),
        ),
    ]
