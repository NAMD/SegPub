from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('SegPub.polmil.views',
    url(r'^$', TemplateView.as_view(template_name="polmil/index.html")),
    url(r'^admin/', include(admin.site.urls)),
    )
