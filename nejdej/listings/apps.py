from django.apps import AppConfig


class ListingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'nejdej.listings'

    def ready(self):
        # noqa: F401
        import nejdej.listings.signals