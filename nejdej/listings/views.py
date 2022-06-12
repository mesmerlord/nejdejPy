from rest_framework import viewsets

from nejdej.utils.mixins import HttpMethodRestrictionViewSet

from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Listing
from .serializers import ListingSerializer
from django.core.cache import cache


@extend_schema_view(
    retrieve=extend_schema(description='Return the given listing.'),
    list=extend_schema(description='Return a list of all the existing listings.'),
    operation_id="listings",

)
class ListingViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    pagination_class = None

    def get_queryset(self):
        return super().get_queryset().select_related('listingview')
        

    def retrieve(self, request, *args, **kwargs):
        listing = self.get_object()

        view = cache.get('views', {})
        listing_id = f"{listing.id}"
        if listing_id in view.keys():
            new_view = {
                    listing_id : view[listing_id] + 1}
        
        else:
            new_view = {
                listing_id: 1}
        cache.set('views', new_view, timeout=25)
        print(view)
        return super().retrieve(request, *args, **kwargs)
