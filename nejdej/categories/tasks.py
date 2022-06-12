import json
from io import BytesIO

import requests
from celery import shared_task
from django.apps import apps
from django.core import files


@shared_task
def seed_categories_task():
    with open("categories.json") as f:
        data = json.load(f)
    Category = apps.get_model("categories", "Category")
    SubCategory = apps.get_model("categories", "SubCategory")
    for category in data:
        url = category["image"]
        resp = requests.get(url)
        if resp.status_code != requests.codes.ok:
            continue
        fp = BytesIO()
        fp.write(resp.content)
        file_name = url.split("/")[-1]
        try:
            new_category, _ = Category.objects.get_or_create(
                name=category["name"],
                defaults={"description": f"Something something {category['name']}"},
            )
            new_category.image.save(file_name, files.File(fp))
        except Exception:
            continue
        for sub_category in category["sub_categories"]:
            try:
                SubCategory.objects.get_or_create(
                    name=sub_category["name"],
                    defaults={
                        "description": f"Something something {sub_category['name']}",
                        "category": new_category,
                    },
                )
            except Exception:
                pass
