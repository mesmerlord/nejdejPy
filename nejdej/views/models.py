from django.db import models

from django.utils.translation import gettext_lazy as _

from django.db.models import F

class ListingView(models.Model):
    listing_name = models.SlugField(max_length = 200, default = "",unique = True)
    daily = models.IntegerField(default = 0)
    weekly = models.IntegerField(default = 0)
    monthly = models.IntegerField(default = 0)
    yearly = models.IntegerField(default = 0)
    total = models.IntegerField(default = 0)


    class Meta:
        verbose_name = "Listing View"
        verbose_name_plural = "Listing Views"

    def __str__(self):
        return f"{self.listing_name}"
    
    def update_views(self, increment_num = 1):
        obj = ListingView.objects.filter(listing_name = self.listing_name)
        obj.update(
                    daily = F('daily')+increment_num,
                    weekly = F('weekly')+increment_num ,
                    monthly = F('monthly')+increment_num,
                    yearly = F('yearly')+increment_num ,
                    total = F('total')+increment_num)
