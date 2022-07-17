import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _

from nejdej.utils.abstract_models import AbstractClient
from nejdej.utils.storages import ReviewImageStorage


class Review(AbstractClient):
    class StatusChoices(models.TextChoices):
        DRAFT = "DF", _("Draft")
        PUBLISHED = "PB", _("Published")
        DENIED = "DN", _("Denied")

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(
        blank=False,
        choices=StatusChoices.choices,
        max_length=2,
        editable=False,
        help_text=StatusChoices.choices,
    )
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="reviews"
    )
    listing = models.ForeignKey(
        "listings.Listing",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="reviews",
    )

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"

    def __str__(self):
        return self.title


class ReviewImage(AbstractClient):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    image = models.ImageField(storage=ReviewImageStorage(), null=True, blank=True)
    review = models.ForeignKey(
        "reviews.Review", on_delete=models.CASCADE, related_name="review_images"
    )
