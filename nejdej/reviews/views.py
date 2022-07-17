from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets

from nejdej.utils.mixins import HttpMethodRestrictionViewSet

from .models import Review
from .serializers import ReviewSerializer


@extend_schema_view(
    retrieve=extend_schema(description="Return the given review."),
    list=extend_schema(description="Return a list of all the existing reviews."),
)
class ReviewViewSet(HttpMethodRestrictionViewSet, viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer