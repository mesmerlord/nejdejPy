from django.db.models.signals import post_save
from django.dispatch import receiver
from django.apps import apps

@receiver(post_save, sender='listings.Listing')
def create_default_listing_view(sender, instance, created, **kwargs):
    from nejdej.views.models import ListingView
    if created:
        ListingView.objects.create(listing=instance)