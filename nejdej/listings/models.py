from django.db import models

from nejdej.utils.abstract_models import AbstractClient
from nejdej.utils.storages import ListingImageStorage
from django.utils.translation import gettext_lazy as _

class Listing(AbstractClient):
    class StatusChoices(models.TextChoices):
        DRAFT = 'DF', _('Draft')
        PUBLISHED = 'PB', _('Published')
        DENIED = 'DN', _('Denied')

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, primary_key = True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to=ListingImageStorage(), null=True, blank=True)
    status = models.CharField(
        blank=False, choices=StatusChoices.choices, max_length=2, editable=False, help_text=StatusChoices.choices
    )
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    sub_category = models.ForeignKey('categories.SubCategory', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    

    class Meta:
        verbose_name = "Listing"
        verbose_name_plural = "Listings"

    def __str__(self):
        return self.title