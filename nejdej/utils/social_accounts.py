from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from drf_spectacular.utils import extend_schema
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    key = serializers.CharField()


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

    @extend_schema(
        description="Post access token provided by google and receive auth token",
        responses=LoginSerializer,
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

    @extend_schema(
        description="Post access token provided by facebook and receive auth token",
        responses=LoginSerializer,
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
