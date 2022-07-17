from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from nejdej.utils.abstract_models import AbstractClient

from nejdej.utils.storages import UserAvatarStorage
from django.contrib.gis.db import models


class User(AbstractUser):
    """
    Default custom user model for Nejdej.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """
    class LocaleChoices(models.TextChoices):
        CZECH = ('cs', 'Czech')
        ENGLISH = ('en', 'English')
        SLOVAK = ('sk', 'Slovak')

    first_name = CharField(_("First name of User"), blank=True, max_length=255)
    last_name = CharField(_("Last name of User"), blank=True, max_length=255, null = True)
    image = models.ImageField(
        storage=UserAvatarStorage(), blank=True, null=True, max_length=500
    )
    profile = models.OneToOneField(
        "users.Profile", on_delete=models.CASCADE, blank=True, null=True, related_name="user"
    )
    locale = CharField(_("Locale of User"),choices = LocaleChoices.choices, max_length=3,  default = LocaleChoices.ENGLISH)

    def get_absolute_url(self):
        """Get url for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"username": self.username})


class Profile(AbstractClient):
    """Profile model for users."""

    bio = models.TextField(_("Bio"), blank=True, null = True)
    phone = models.CharField(_("Phone"), blank=True, max_length=20, null = True)
    address = models.CharField(_("Address"), blank=True, max_length=255, null = True)
    city = models.CharField(_("City"), blank=True, max_length=255, null = True)
    country = models.CharField(_("Country"), blank=True, max_length=255, null = True)
    zip_code = models.CharField(_("Zip code"), blank=True, max_length=10, null = True)
    geo_point = models.PointField(geography=True, spatial_index=True, blank=True, null = True, srid=4326)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")