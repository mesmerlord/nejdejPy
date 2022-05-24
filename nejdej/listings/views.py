from rest_framework import viewsets

from utils.mixins import HttpMethodRestrictionViewSet

from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Listing
from .serializers import ListingSerializer


@extend_schema_view(
    retrieve=extend_schema(description='Return the given listing.'),
    list=extend_schema(description='Return a list of all the existing listings.'),
    operation_id="listings",

)
class CategoryViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    pagination_class = None

