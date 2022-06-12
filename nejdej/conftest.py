import pytest
from pytest_factoryboy import register

from nejdej.users.models import User
from nejdej.utils.factories import (
    CategoryFactory,
    ListingFactory,
    ReviewFactory,
    SubCategoryFactory,
    UserFactory,
)


@pytest.fixture(autouse=True)
def media_storage(settings, tmpdir):
    settings.MEDIA_ROOT = tmpdir.strpath


@pytest.fixture
def user() -> User:
    return UserFactory()


register(UserFactory)
register(CategoryFactory)
register(SubCategoryFactory)
register(ListingFactory)
register(ReviewFactory)


@pytest.fixture(scope="session")
def api_client():
    from rest_framework.test import APIClient

    return APIClient()


# @pytest.fixture(scope="session")
# def django_db_setup(django_db_setup, django_db_blocker):
#     from nejdej.utils.db_seed import run

#     with django_db_blocker.unblock():
#         run()


@pytest.fixture(scope="session")
@pytest.mark.django_db
def api_client_with_credentials(api_client, django_db_blocker):
    with django_db_blocker.unblock():
        user = UserFactory.create()
        api_client.force_authenticate(user=user)
    yield api_client
    with django_db_blocker.unblock():
        api_client.force_authenticate(user=None)
