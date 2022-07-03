from django.core.cache import cache
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets

from nejdej.utils.mixins import HttpMethodRestrictionViewSet

from .models import Listing
from .serializers import ListingSerializer
from django_filters import rest_framework as filters_new
from rest_framework.filters import OrderingFilter, SearchFilter

class ListingFilter(filters_new.FilterSet):

    status = filters_new.MultipleChoiceFilter(choices=Listing.StatusChoices)
    category_slug = filters_new.CharFilter(label = "Exactly matches given category slug", lookup_expr='iexact', field_name = "sub_category__category__slug")
    sub_category_slug = filters_new.CharFilter(label = "Exactly matches given sub category slug", lookup_expr='iexact', field_name = "sub_category__slug")
    title_search = filters_new.CharFilter(label = "Contains given string in title", lookup_expr='icontains', field_name = "title")
    description_search = filters_new.CharFilter(label = "Contains given string in description", lookup_expr='icontains', field_name = "description")

    class Meta:
        model = Listing
        fields = ["status", "category_slug", "title_search", "description_search"]


@extend_schema_view(
    retrieve=extend_schema(description="Return the given listing."),
    list=extend_schema(description="Return a list of all the existing listings."),
)
class ListingViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    pagination_class = None
    filter_backends = [filters_new.DjangoFilterBackend, OrderingFilter, SearchFilter]
    ordering_fields = '__all__'
    filterset_class = ListingFilter
    search_fields = ['description', "title"]

    def get_queryset(self):
        return super().get_queryset().select_related("listingview")

    def retrieve(self, request, *args, **kwargs):
        listing = self.get_object()

        view = cache.get("views", {})
        listing_id = f"{listing.id}"
        if listing_id in view.keys():
            new_view = {listing_id: view[listing_id] + 1}

        else:
            new_view = {listing_id: 1}
        cache.set("views", new_view, timeout=25)
        return super().retrieve(request, *args, **kwargs)
