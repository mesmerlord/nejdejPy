from rest_framework import viewsets

from utils.mixins import HttpMethodRestrictionViewSet

from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Category, SubCategory
from .serializers import CategorySerializer, SubCategorySerializer


@extend_schema_view(
    retrieve=extend_schema(description='Return the given category.'),
    list=extend_schema(description='Return a list of all the existing categories.'),
    operation_id="categories",

)
class CategoryViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None


@extend_schema_view(
    retrieve=extend_schema(description='Return the given Subcategory.'),
    list=extend_schema(description='Return a list of all the existing Subcategories.'),
    operation_id="sub_categories",

)
class SubCategoryViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    pagination_class = None