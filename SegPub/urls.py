from django.conf.urls import patterns, include, url

from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'polmil.views.index', name='home'),
    url(r'^polmil/', include('polmil.urls', namespace="dashboard")),
    url(r'^admin/', include(admin.site.urls)),
)
