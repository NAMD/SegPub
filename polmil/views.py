# -*- coding: utf-8 -*-
from polmil.models import *
from django.http import HttpResponse
from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
import requests
from geoposition import Geoposition
import json
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from simplesearch.functions import get_query
from django.contrib.auth.decorators import login_required


#def index(request):
    #return render_to_response('index.html', locals(), context_instance=RequestContext(request))
#    return redirect("/mapa/")

@csrf_exempt
def cargar_marcadores(request):

    if request.method == "POST":

        desde = request.POST["desde"]
        hasta = request.POST["hasta"]
        tipo_edad = request.POST["tipo_edad"]
        sexo = request.POST["sexo"]
        fuerza = request.POST["fuerza"]
        provincia = request.POST["provincia"]

        q = Q()

        q = q & Q(anio__gte=desde)
        q = q & Q(anio__lte=hasta)

        if tipo_edad:
            q = q & Q(tipo_edad__id=tipo_edad)

        if sexo:
            q = q & Q(sexo=sexo)

        if fuerza:
            q = q & Q(fuerza=fuerza)

        if provincia:
            q = q & Q(provincia=provincia)

        casos = list(Caso.objects.filter(q).values_list('coordenadas', 'nombre', 'apellido', 'id', 'sexo').exclude(coordenadas=Geoposition(0,0)))
    else:
        casos = list(Caso.objects.filter(anio=2011).values_list('coordenadas', 'nombre', 'apellido', 'id', 'sexo').exclude(coordenadas=Geoposition(0,0)))

    return HttpResponse(json.dumps(casos), content_type="application/json")

def caso (request, id):
    caso = Caso.objects.get(id=id)
    return render_to_response('caso.html', locals(), context_instance=RequestContext(request))

@csrf_exempt
def caso_json(request):
    id_caso=request.POST['id_caso']
    caso = Caso.objects.get(id=id_caso)
    return render_to_response('modal-caso.html', locals(), context_instance=RequestContext(request))

def mapa (request):
    return render_to_response('polmil/mapa.html', locals(), context_instance=RequestContext(request))

def los_muertos_de_2001 (request):
    casos = Caso.objects.filter(pk__in=[22, 41, 51, 70, 74, 83, 93, 142, 230, 247, 360, 393, 438, 426, 455, 496, 577, 587, 629, 650, 661, 671, 745, 817, 874, 889, 899, 916, 966, 997, 1001, 1022, 1055, 1075, 1694, 1194, 1224, 1259])
    print casos.count()
    return render_to_response('los-muertos-de-2001.html', locals(), context_instance=RequestContext(request))


def buscar (request):

    if 'q' in request.GET:
        query = request.GET["q"]
        if query:
            if len(query) > 3:
                filtros = get_query(query, ['nombre', 'apellido'])
                casos = Caso.objects.filter(filtros).distinct()
            else:
                mensaje_error = "La palabra buscada es demasiado corta"

    return render_to_response('polmil/buscar.html', locals(), context_instance=RequestContext(request))


def que_es (request):
    return render_to_response('polmil/quemsomos.html', locals(), context_instance=RequestContext(request))


def sumate (request):
    return render_to_response('polmil/sumario.html', locals(), context_instance=RequestContext(request))