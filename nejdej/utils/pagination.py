from django.utils.translation import gettext_lazy as _
from rest_framework.pagination import PageNumberPagination

from config.settings.base import REST_FRAMEWORK


class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'itemsPerPage'
    page_size_query_description = _(
        f"Number of results to return per page. \n Default is {REST_FRAMEWORK['PAGE_SIZE']}"
    )
