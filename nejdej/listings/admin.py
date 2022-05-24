from django.contrib import admin

from .models import Listing


class ListingAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Listing._meta.fields]


admin.site.register(Listing, ListingAdmin)
