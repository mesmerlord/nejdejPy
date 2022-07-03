from rest_framework import serializers

from .models import Category, SubCategory
from nejdej.listings.models import Listing

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = "__all__"

class CategoryListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"

class CategoryListingManySerializer(serializers.ModelSerializer):
    subcategory_set = SubCategorySerializer(many=True)
    listings = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = "__all__"

    def get_listings(self, obj):
        listings = Listing.objects.filter(sub_category__category=obj)
        print(listings)
        return CategoryListingSerializer(listings, many=True).data
    
