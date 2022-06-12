from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from nejdej.categories.tasks import seed_categories_task
from nejdej.utils.mixins import HttpMethodRestrictionViewSet

from .models import Category, SubCategory
from .serializers import CategorySerializer, SubCategorySerializer


@extend_schema_view(
    retrieve=extend_schema(description="Return the given category."),
    list=extend_schema(description="Return a list of all the existing categories."),
    operation_id="categories",
)
class CategoryViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None

    @extend_schema(
        description="Seed the database with categories from Bazos.",
    )
    @action(
        methods=["get"],
        detail=False,
        pagination_class=None,
        permission_classes=[IsAdminUser],
    )
    def seed_inital(self, request, *args, **kwargs):
        """
        Seed the database with categories from Bazos.
        """
        seed_categories_task.delay()
        return Response("Categories seeded.")


@extend_schema_view(
    retrieve=extend_schema(description="Return the given Subcategory."),
    list=extend_schema(description="Return a list of all the existing Subcategories."),
    operation_id="sub_categories",
)
class SubCategoryViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    pagination_class = None
