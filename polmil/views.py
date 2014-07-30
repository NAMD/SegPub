# from django.shortcuts import render, render_to_response, RequestContext
from django.template import RequestContext
from django.shortcuts import render_to_response
from models import Segpub

# Create your views here.

# def home(request):
#
#    return render_to_response("index.html",
#                              locals(),
#                              context_instance=RequestContext(request))


def index(request):
    # Request the context of the request.
    # The context contains information such as the client's machine details, for example.
    context = RequestContext(request)

    # Construct a dictionary to pass to the template engine as its context.
    # Note the key boldmessage is the same as {{ boldmessage }} in the template!
    context_dict = {'boldmessage': "I am bold font from the context"}

    # Return a rendered response to send to the client.
    # We make use of the shortcut function to make our lives easier.
    # Note that the first parameter is the template we wish to use.
    return render_to_response('polmil/index.html', context_dict, context)


def dashboard(request):
    # Request the context of the request.
    # The context contains information such as the client's machine details, for example.
    context = RequestContext(request)

    # Construct a dictionary to pass to the template engine as its context.
    # Note the key boldmessage is the same as {{ boldmessage }} in the template!
    context_dict = {'boldmessage': "I am bold font from the context"}

    # Return a rendered response to send to the client.
    # We make use of the shortcut function to make our lives easier.
    # Note that the first parameter is the template we wish to use.
    return render_to_response('polmil/dashboard.html', context_dict, context)


#def chamados(request):
    #c = Segpub.objects.all()

#    context = RequestContext(request)

#    context_dict = {'boldmessage': "I am bold font from the context"}

#    return render_to_response('polmil/chamados.html', {'chamados': c})
