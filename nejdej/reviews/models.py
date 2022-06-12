from django.db import models

from nejdej.utils.abstract_models import AbstractClient
from django.utils.translation import gettext_lazy as _

from nejdej.utils.storages import ReviewImageStorage

class Review(AbstractClient):
    class StatusChoices(models.TextChoices):
        DRAFT = 'DF', _('Draft')
        PUBLISHED = 'PB', _('Published')
        DENIED = 'DN', _('Denied')

    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(
        blank=False, choices=StatusChoices.choices, max_length=2, editable=False, help_text=StatusChoices.choices
    )
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    listing = models.ForeignKey('listings.Listing', null = True, blank = True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"

    def __str__(self):
        return self.title

class ReviewImage(AbstractClient):
    image = models.ImageField(storage=ReviewImageStorage(), null=True, blank=True)
    review = models.ForeignKey('reviews.Review', on_delete=models.CASCADE)