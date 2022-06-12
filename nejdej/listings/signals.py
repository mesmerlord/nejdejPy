from django.db.models.signals import post_save
from django.dispatch import receiver
from django.apps import apps

@receiver(post_save, sender='listings.Listing')
def create_default_dealership_settings(sender, instance, created, **kwargs):
    from views.models import ListingView
    if created:
        ListingView.objects.create(listing=instance)