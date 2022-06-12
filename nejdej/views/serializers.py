from rest_framework import serializers

from .models import ListingView


class ListingViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingView
        fields = "__all__"
