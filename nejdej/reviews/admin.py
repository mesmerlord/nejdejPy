from django.contrib import admin

from .models import Review


class ReviewAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Review._meta.fields]


admin.site.register(Review, ReviewAdmin)
