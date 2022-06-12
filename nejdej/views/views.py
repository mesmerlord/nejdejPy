from rest_framework import viewsets

from nejdej.utils.mixins import HttpMethodRestrictionViewSet

from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import ListingView
from .serializers import ListingViewSerializer


@extend_schema_view(
    retrieve=extend_schema(description='Return the given listing view.'),
    list=extend_schema(description='Return a list of all the listing views.'),
    operation_id="listing_view",

)
class ListingViewViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = ListingView.objects.all()
    serializer_class = ListingViewSerializer
    pagination_class = None

