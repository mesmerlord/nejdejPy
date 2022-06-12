from django.db import models
from django.db.models import F

# from django.utils.translation import gettext_lazy as _


class ListingView(models.Model):
    listing = models.OneToOneField("listings.Listing", on_delete=models.CASCADE)
    daily = models.IntegerField(default=0)
    weekly = models.IntegerField(default=0)
    monthly = models.IntegerField(default=0)
    yearly = models.IntegerField(default=0)
    total = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Listing View"
        verbose_name_plural = "Listing Views"

    def __str__(self):
        return f"{self.listing.title}"

    def update_views(self, increment_num=1):
        obj = ListingView.objects.filter(listing=self.listing)
        obj.update(
            daily=F("daily") + increment_num,
            weekly=F("weekly") + increment_num,
            monthly=F("monthly") + increment_num,
            yearly=F("yearly") + increment_num,
            total=F("total") + increment_num,
        )
