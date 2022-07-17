from rest_framework import serializers

from nejdej.views.serializers import ListingViewSerializer

from .models import Listing, ListingImage
from nejdej.users.models import User

class ListingImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required = False)
    id = serializers.UUIDField(required = True)
    class Meta:
        model = ListingImage
        fields = ["id", "image"]

class ListingUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "image"]

class ListingSerializer(serializers.ModelSerializer):
    views = ListingViewSerializer(read_only=True, source="listingview")
    listing_images = ListingImageSerializer(many = True)
    user = ListingUserSerializer(read_only = True)
    class Meta:
        model = Listing
        exclude = ("created_at", "updated_at")

    def create(self, validated_data):
        listing_images = validated_data.pop("listing_images", {})
        user = self.context['request'].user
        validated_data['user'] = user
        listing = super().create(validated_data)
        all_listings = []
        for listing_image in listing_images:
            all_listings.append(listing_image.get('id'))
        listing_images = ListingImage.objects.filter(id__in=all_listings)
        listing_images.update(listing = listing)
        return listing


class ListingImageSerializer(serializers.ModelSerializer):
    listing = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = ListingImage
        exclude = ("created_at", "updated_at")
