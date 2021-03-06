import random
from typing import Any, Sequence

import factory
from factory import Faker, post_generation
from factory.django import DjangoModelFactory
from faker import Factory as FakerFactory

from nejdej.categories.models import Category, SubCategory
from nejdej.listings.models import Listing
from nejdej.reviews.models import Review
from nejdej.users.models import User

faker = FakerFactory.create()
faker.add_provider(faker.providers)


class UserFactory(DjangoModelFactory):

    username = Faker("user_name")
    email = Faker("email")
    first_name = Faker("first_name")
    last_name = Faker("last_name")
    locale = factory.Iterator(User.LocaleChoices)

    @post_generation
    def password(self, create: bool, extracted: Sequence[Any], **kwargs):
        password = (
            extracted
            if extracted
            else Faker(
                "password",
                length=42,
                special_chars=True,
                digits=True,
                upper_case=True,
                lower_case=True,
            ).evaluate(None, None, extra={"locale": None})
        )
        self.set_password(password)

    class Meta:
        model = "users.User"
        django_get_or_create = ["username"]


class CategoryFactory(factory.django.DjangoModelFactory):
    """Category factory."""

    name = factory.LazyAttribute(lambda x: faker.word())
    description = factory.LazyAttribute(lambda x: faker.paragraph(nb_sentences=3))
    is_active = True
    image = factory.django.ImageField(color="blue")

    class Meta:
        model = "categories.Category"
        django_get_or_create = ("name",)


class SubCategoryFactory(factory.django.DjangoModelFactory):
    """SubCategory factory."""

    name = factory.LazyAttribute(lambda x: faker.word())
    category = factory.Iterator(Category.objects.all())
    description = factory.LazyAttribute(lambda x: faker.paragraph(nb_sentences=3))
    is_active = True
    image = factory.django.ImageField(color="yellow")

    class Meta:
        model = "categories.SubCategory"
        django_get_or_create = ("name",)


class ListingFactory(factory.django.DjangoModelFactory):
    """Listing factory."""

    id = factory.LazyAttribute(lambda x: faker.uuid4())
    title = factory.LazyAttribute(lambda x: faker.paragraph(nb_sentences=1))
    description = factory.LazyAttribute(lambda x: faker.paragraph(nb_sentences=3))
    status = factory.Iterator(Listing.StatusChoices)
    user = factory.Iterator(User.objects.all())
    sub_category = factory.Iterator(SubCategory.objects.all())
    price = factory.LazyAttribute(lambda x: f"{round(random.uniform(1.00, 100.00), 2)}")

    class Meta:
        model = "listings.Listing"
        django_get_or_create = ("id",)


class ListingImageFactory(factory.django.DjangoModelFactory):
    """ListingImage factory."""

    id = factory.LazyAttribute(lambda x: faker.uuid4())
    image = factory.django.ImageField(color="pink")
    listing = factory.Iterator(Listing.objects.all())

    class Meta:
        model = "listings.ListingImage"
        django_get_or_create = ("id",)


class ReviewFactory(factory.django.DjangoModelFactory):
    """Review factory."""

    id = factory.LazyAttribute(lambda x: faker.uuid4())
    title = factory.LazyAttribute(lambda x: faker.paragraph(nb_sentences=1))
    description = factory.LazyAttribute(lambda x: faker.paragraph(nb_sentences=3))
    status = factory.Iterator(Review.StatusChoices)
    user = factory.Iterator(User.objects.all())
    listing = factory.Iterator(Listing.objects.all())

    class Meta:
        model = "reviews.Review"
        django_get_or_create = ("id",)


class ReviewImageFactory(factory.django.DjangoModelFactory):
    """ReviewImage factory."""

    id = factory.LazyAttribute(lambda x: faker.uuid4())
    image = factory.django.ImageField(color="pink")
    review = factory.Iterator(Review.objects.all())

    class Meta:
        model = "reviews.ReviewImage"
        django_get_or_create = ("id",)
