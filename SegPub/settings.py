"""
Django settings for SegPub project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

#from unipath import Path
# Testing Unipath
#SETTINGS_DIR = Path(__file__).parent
#PROJECT_PATH = SETTINGS_DIR.child(SETTINGS_DIR, SETTINGS_DIR.parent)
#PROJECT_PATH = PROJECT_PATH.absolute()
#TEMPLATE_PATH = PROJECT_PATH.child(PROJECT_PATH, 'templates')
#STATIC_PATH = PROJECT_PATH.child(PROJECT_PATH, 'static')
#DATABASE_PATH = PROJECT_PATH.child(PROJECT_PATH, 'db.sqlite3')

SETTINGS_DIR = os.path.dirname(__file__)

PROJECT_PATH = os.path.join(SETTINGS_DIR, os.pardir)
PROJECT_PATH = os.path.abspath(PROJECT_PATH)

TEMPLATE_PATH = os.path.join(PROJECT_PATH, "templates")
STATIC_PATH = os.path.join(PROJECT_PATH, "static")
DATABASE_PATH = os.path.join(STATIC_PATH, "data/chamados190.db")

# Printing paths for sanity's sake
print "SETTINGS_DIR: ", SETTINGS_DIR
print "PROJECT_PATH: ", PROJECT_PATH
print "TEMPLATE_PATH: ", TEMPLATE_PATH
print "STATIC_PATH: ", STATIC_PATH
print "DB: ", DATABASE_PATH

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '^ic==-ksn(f@kd8(f9u_n&6s9o)u7j+kq$4$rjc7gz5x%0=ugy'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'bootstrap3',
    'leaflet',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'SegPub.urls'

WSGI_APPLICATION = 'SegPub.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': DATABASE_PATH,
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'pt-br'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    STATIC_PATH,
)

# Template files (CSS, JavaScript, Images)
TEMPLATE_DIRS = (
    TEMPLATE_PATH,
)
