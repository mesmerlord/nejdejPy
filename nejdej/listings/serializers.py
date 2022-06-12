from rest_framework import serializers

from nejdej.views.serializers import ListingViewSerializer

from .models import Listing


class ListingSerializer(serializers.ModelSerializer):
    views = ListingViewSerializer(read_only=True, source="listingview")

    class Meta:
        model = Listing
        exclude = ("created_at", "updated_at")
