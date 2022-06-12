import os
from django.apps import apps
from faker import Faker

fake = Faker()
Faker.seed(0)


def print_fun_name(func):
    def wrapper():
        print(f'Running function: {func.__name__}')
        func()

    return wrapper

@print_fun_name
def seed_users():
    from nejdej.utils.factories import UserFactory

    for _ in range(10):
        
        created = UserFactory.create()
        print(f'Added user: {created}')


@print_fun_name
def seed_categories():
    from nejdej.utils.factories import CategoryFactory

    for _ in range(10):
        
        created = CategoryFactory.create()
        print(f'Added category : {created}')



@print_fun_name
def seed_sub_categories():
    from nejdej.utils.factories import SubCategoryFactory

    Category = apps.get_model('categories', 'Category')
    categories = Category.objects.all()
    for _ in range(len(categories)*5):
        
        created = SubCategoryFactory.create()
        print(f'Added subcategory : {created}')

@print_fun_name
def seed_listings():
    from nejdej.utils.factories import ListingFactory

    SubCategory = apps.get_model('categories', 'SubCategory')
    sub_categories = SubCategory.objects.all()
    for _ in range(len(sub_categories)*3):
        
        created = ListingFactory.create()
        print(f'Added listing : {created}')

@print_fun_name
def seed_reviews():
    from nejdej.utils.factories import ReviewFactory

    Listing = apps.get_model('listings', 'Listing')
    listings = Listing.objects.all()
    for _ in range(len(listings)*2):
        
        created = ReviewFactory.create()
        print(f'Added review : {created}')

@print_fun_name
def seed_review_images():
    from nejdej.utils.factories import ReviewImageFactory

    Listing = apps.get_model('listings', 'Listing')
    listings = Listing.objects.all()
    for _ in range(len(listings)):
        
        created = ReviewImageFactory.create()
        print(f'Added review image : {created}')

def run(*args):
    
    seed_users()
    seed_categories()
    seed_sub_categories()
    seed_listings()
    seed_reviews()
    seed_review_images()



if __name__ == '__main__':
    run()
