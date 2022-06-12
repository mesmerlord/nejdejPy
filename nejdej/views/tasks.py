from celery import shared_task
from django.apps import apps
from django.core.cache import cache


@shared_task
def add_views():
    ListingViews = apps.get_model("views", "ListingView")
    views = cache.get("views")
    if not views:
        return
    for listing_id, view_num in views.items():
        listing_view = ListingViews.objects.get(listing__id=listing_id)
        listing_view.update_views(increment_num=view_num)
    cache.delete_pattern("views")
