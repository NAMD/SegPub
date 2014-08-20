from django.conf.urls import patterns, include, url
from polmil.views import index

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),

                       (r'^$', index),

                       (r'^polmil/', include('polmil.urls')),

                       ('^accounts/', include('django.contrib.auth.urls')),

                       )
