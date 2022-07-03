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
    sub_categories = SubCategorySerializer(many=True)
    listings = CategoryListingSerializer(many=True)

    class Meta:
        model = Category
        fields = "__all__"

    
