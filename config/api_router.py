from django.conf import settings
from categories.views import CategoryViewSet, SubCategoryViewSet
from reviews.views import ReviewViewSet
from views.views import ListingViewViewSet
from rest_framework.routers import DefaultRouter, SimpleRouter

from nejdej.users.api.views import UserViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()
router = DefaultRouter()

router.register("users", UserViewSet)
router.register("categories", CategoryViewSet)
router.register("sub-categories", SubCategoryViewSet)
router.register("reviews", ReviewViewSet)
router.register("listing-views", ListingViewViewSet)


# app_name = "api"
urlpatterns = router.urls
