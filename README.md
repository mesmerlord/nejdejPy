
# Nejdej 

The backend and frontend for the online marketplace, nejdej.com

A place to bring together buyers and sellers of second hand goods

[![Initialized with Cookiecutter Django](https://img.shields.io/badge/initialized%20with-Cookiecutter%20Django-ff69b4.svg?logo=cookiecutter)](https://github.com/cookiecutter/cookiecutter-django/)
[![Black code style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
## API Reference

Currently the Swagger link for the demo API endpoint is: https://nejdej.com/api/docs/


## Run Locally

Clone the project

```bash
  git clone https://github.com/mesmerlord/nejdejPy.git
```

Go to the project directory

```bash
  cd nejdejPy
```



### Running the containers


#### Requirements
 - Docker
 - Docker-Compose
 - pre-commit

1. Copy variables from .env.example and insert the values provided.
2. Build and run the containers

```bash
  docker-compose -f local.yml up
```
3. Create a superuser with your preferred username and password
```bash
  docker-compose -f local.yml \
  run --rm django python manage.py createsuperuser
```
4. You can now login to the admin dashboard at http://127.0.0.1:8000/admin/

5. The Swagger for the backend should now be live on http://127.0.0.1:8000/api/docs/ . Reminder to create a superuser and login to admin panel first, as access to this requires admin privileges first.

6. Seed testing data using
```bash
  docker-compose -f local.yml \
  run --rm django python manage.py runscript utils.db_seed
```

#### Initialize pre-commit

```bash
  pip install pre-commit
```

```bash
  pre-commit install
```

### Model Diagram

![Model connections](https://snipboard.io/MUEFQ3.jpg)

You can generate this using:

```bash
docker-compose -f local.yml \
run --rm django python manage.py \
graph_models -a --hide-edge-labels --arrow-shape normal \
-X AbstractClient,LogEntry,ActiveAbstractClient,AbstractUser,ContentType,Session,AbstractBaseSession,AbstractBaseUser,PermissionsMixin,Permission \
-g -o my_project_visualized.png
```
## Running Tests

To run tests, run the following command

```bash
  docker-compose -f local.yml \
  run --rm django python manage.py test
```

## Default Readme from Django-Cookie-Cutter


## Settings

Moved to [settings](http://cookiecutter-django.readthedocs.io/en/latest/settings.html).

## Basic Commands

### Type checks

Running type checks with mypy:

```bash
  docker-compose -f local.yml \
  run --rm django mypy nejdej
```

### Test coverage

To run the tests, check your test coverage, and generate an HTML coverage report:
```bash
  docker-compose -f local.yml \
  run --rm django coverage run -m pytest
```

### Celery

This app comes with Celery.

To run a celery worker:

``` bash
cd nejdejPy
docker-compose -f local.yml \
run --rm celeryworker celery -A config.celery_app worker -l info
```

### Sentry

Sentry is an error logging aggregator service. You can sign up for a free account at https://sentry.io/signup/ or download and host it yourself.
The system is set up with reasonable defaults, including 404 logging and integration with the WSGI application.

You must set the DSN url in production.

## Deployment

This project uses cookie-cutter django for the initialization, which includes great guides on how to do simple deployments on any EC2 instance/Droplet/VM

See detailed (http://cookiecutter-django.readthedocs.io/en/latest/deployment-with-docker.html).

