from django.contrib import admin

from .models import Category, SubCategory


class CategoryAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Category._meta.fields]

class SubCategoryAdmin(admin.ModelAdmin):
    list_display = [f.name for f in SubCategory._meta.fields]


admin.site.register(Category, CategoryAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)