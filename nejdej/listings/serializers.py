from rest_framework import serializers

from nejdej.views.serializers import ListingViewSerializer

from .models import Listing, ListingImage

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ["id", "image"]

class ListingSerializer(serializers.ModelSerializer):
    views = ListingViewSerializer(read_only=True, source="listingview")
    listing_images = ListingImageSerializer(many = True)
    class Meta:
        model = Listing
        exclude = ("created_at", "updated_at")
