from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from nejdej.categories.tasks import seed_categories_task
from nejdej.utils.mixins import HttpMethodRestrictionViewSet
from django_filters import rest_framework as filters_new
from rest_framework.filters import OrderingFilter

from .models import Category, SubCategory
from .serializers import CategorySerializer, SubCategorySerializer

class SubCategoryFilter(filters_new.FilterSet):

    class Meta:
        model = SubCategory
        fields = {
            'name': ['exact', 'contains'],
            'description': ['contains'],
            'category': ['exact'],
            'is_active': ['exact'],
        }



@extend_schema_view(
    retrieve=extend_schema(description="Return the given category."),
    list=extend_schema(description="Return a list of all the existing categories."),
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
)
class SubCategoryViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    pagination_class = None

    filter_backends = [filters_new.DjangoFilterBackend, OrderingFilter]
    ordering_fields = '__all__'
    filterset_class = SubCategoryFilter