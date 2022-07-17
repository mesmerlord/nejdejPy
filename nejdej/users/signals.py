import os
from django.db.models.signals import post_delete, pre_save,post_save, post_delete
from django.dispatch import receiver
from django.apps import apps
from django.conf import settings
from urllib.request import urlretrieve
from PIL import Image
import requests
from allauth.account.signals import user_signed_up
from io import BytesIO
from django.core.files.base import ContentFile

def download_image(url, filename):
    profile_images = f"profile_images/"
    if not os.path.exists(profile_images):
        os.makedirs(profile_images)

    result = requests.get(url).content
    f = BytesIO(result)
    out = BytesIO()
    image = Image.open(f)
    image.save(out, "jpeg")
    return out

@receiver(user_signed_up)
def update_user_info(sociallogin, user, **kwargs):
    if sociallogin:
        Profile = apps.get_model("users", "Profile")
        User = apps.get_model("users", "User")
        social_account = user.socialaccount_set.first()
        print(social_account)
        image_url = social_account.get_avatar_url()    
        image = download_image(image_url, user.username)
        user.image.save(f"{user.username}.jpeg", ContentFile(image.getvalue()), save=False)
        print(social_account.extra_data)
        user.first_name = social_account.extra_data.get('given_name', "")
        user.last_name = social_account.extra_data.get('family_name', "")
        locale = social_account.extra_data.get('locale')
        if locale in ["cs", "cs_CZ"]:
            user.locale = User.LocaleChoices.CZECH
        if locale in ["sk", "sk_SK"]:
            user.locale = User.LocaleChoices.SLOVAK
        if locale in ["en", "en_US"]:
            user.locale = User.LocaleChoices.ENGLISH
        Profile.objects.create(user=user)
        user.save()