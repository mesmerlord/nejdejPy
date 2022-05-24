from django.contrib import admin

from .models import ListingView


class ListingViewAdmin(admin.ModelAdmin):
    list_display = [f.name for f in ListingView._meta.fields]


admin.site.register(ListingView, ListingViewAdmin)
