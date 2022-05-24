from rest_framework import mixins, viewsets


class ListRetrieveUpdateViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    """ListRetrieveUpdateViewSet
    A viewset that provides `retrieve`, `update`, and `list` actions.
    To use it, override the class and set the `.queryset` and
    `.serializer_class` attributes.
    """
    pass

class CreateRetrieveUpdateDestroyViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    pass


class HttpMethodRestrictionViewSet(
    viewsets.GenericViewSet,
):
    http_method_names = ['get', 'post', 'patch', 'delete']