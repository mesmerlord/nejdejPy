from django.contrib import admin

from .models import Listing, ListingImage


class ListingAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Listing._meta.fields]


class ListingImageAdmin(admin.ModelAdmin):
    list_display = [f.name for f in ListingImage._meta.fields]


admin.site.register(Listing, ListingAdmin)
admin.site.register(ListingImage, ListingImageAdmin)
