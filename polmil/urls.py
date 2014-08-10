from django.conf.urls import patterns, url
import polmil
from polmil import views

urlpatterns = patterns('',
#    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^dashboard/$', polmil.views.dashboard, name='dashboard'),
    url(r'^chamados/$', polmil.views.chamados, name='chamados'),
)