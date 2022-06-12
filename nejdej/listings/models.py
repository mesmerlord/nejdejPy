from django.db import models
from django.utils.translation import gettext_lazy as _

from nejdej.utils.abstract_models import AbstractClient
from nejdej.utils.storages import ListingImageStorage


class Listing(AbstractClient):
    class StatusChoices(models.TextChoices):
        DRAFT = "DF", _("Draft")
        PUBLISHED = "PB", _("Published")
        DENIED = "DN", _("Denied")

    id = models.UUIDField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(storage=ListingImageStorage(), null=True, blank=True)
    status = models.CharField(
        blank=False,
        choices=StatusChoices.choices,
        max_length=2,
        editable=False,
        help_text=StatusChoices.choices,
    )
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    sub_category = models.ForeignKey("categories.SubCategory", on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "Listing"
        verbose_name_plural = "Listings"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.status = "DF"
        super().save(*args, **kwargs)
