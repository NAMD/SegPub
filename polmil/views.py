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
from django.views.generic.base import direct_to_template

#from django.shortcuts import render, render_to_response, RequestContext
from django.template import RequestContext
from django.shortcuts import render_to_response

# Create your views here.

# def home(request):
#
#    return render_to_response("index.html",
#                              locals(),
#                              context_instance=RequestContext(request))















# -*- coding: utf-8 -*-
# def index (request):
#     #return render_to_response('index.html', locals(), context_instance=RequestContext(request))
#     return redirect("/polmil/mapa/")


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