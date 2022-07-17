from django.db import models
from django.utils.text import slugify

from nejdej.utils.abstract_models import AbstractClient
from nejdej.utils.storages import CategoryImageStorage


# Create your models here.
class Category(AbstractClient):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, primary_key=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(storage=CategoryImageStorage(), null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class SubCategory(AbstractClient):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, primary_key=True)
    category = models.ForeignKey("categories.Category", on_delete=models.CASCADE, related_name="subcategories")
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(storage=CategoryImageStorage(), null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Sub Category"
        verbose_name_plural = "Sub Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
