from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from nejdej.categories.views import CategoryViewSet, SubCategoryViewSet
from nejdej.listings.views import ListingViewSet
from nejdej.reviews.views import ReviewViewSet
from nejdej.users.api.views import UserViewSet
from nejdej.views.views import ListingViewViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("categories", CategoryViewSet)
router.register("sub-categories", SubCategoryViewSet)
router.register("reviews", ReviewViewSet)
router.register("listings", ListingViewSet)
router.register("listing-views", ListingViewViewSet)


app_name = "api"
urlpatterns = router.urls
