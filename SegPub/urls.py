#from polmil.views import *
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('SegPub.polmil.views',
    # Examples:
    url(r'^$', TemplateView.as_view(template_name="polmil/index.html")),
    url(r'^$dashboard/', TemplateView.as_view(template_name="polmil/dashboard.html")),
    url(r'^chamados/', TemplateView.as_view(template_name="polmil/chamados.html")),
    url(r'^ocorrencias/', TemplateView.as_view(template_name="polmil/ocorrencias.html")),
    url(r'^mapa/', TemplateView.as_view(template_name="polmil/mapa.html")),

    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    )
    # urlpatterns = patterns('',
    
    #acciones sobre base de datos
    #url(r'^importar-bd/', importar_bd),
    #url(r'^crear-fuerzas/', crear_fuerzas),
    #url(r'^crear-circunstancias/', crear_circunstancias),
    #url(r'^crear-tipo-edad/', crear_tipo_edad),
    #url(r'^buscar-coordenadas/', buscar_coordenadas),

#    url(r'^casos-sin-coordenadas/', casos_sin_coordenadas),
    

    #--------------------------------
#    url(r'^caso/([a-zA-Z0-9_-]+)/$', caso),
#    url(r'^caso-json/$', caso_json),
#    url(r'^mapa/', mapa),
#    url(r'^cargar-marcadores/', cargar_marcadores),
#    url(r'^buscar/', buscar),

#    url(r'^los-muertos-de-2001/', los_muertos_de_2001),

    #paginas
#    url(r'^que-es/', que_es),
#    url(r'^sumate/', sumate),
