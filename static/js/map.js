var L = require('leaflet'),
    mapa = L.map('mapaleaf', {
        attributionControl: false,
        zoomControl: false
    }),
    options = {
        fieldSeparator: '|',
        firstLineTitles: true,
        onEachFeature: function (feature, layer) {
            var properties = feature.properties,
                popup = 'Batalhão responsável: '.bold() + properties.batalho + '<br />' +
                        'Despacho: '.bold() + properties.despacho + '<br />' +
                        'Conclusão: '.bold() + properties.concluso + '<br />' +
                         '<br />' +
                         properties.observaes;
            layer.bindPopup(popup);
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon:L.icon({
                    iconUrl: '/images/iconmonstr-warning-2-icon.svg',
                    iconSize: [30,30],
                })
            });
        }
    };

function setInitialView(mapa){
    var initialView = [[-22.92, -43.22], 10];
    mapa.setView.apply(mapa, initialView);
}

setInitialView(mapa);

require('leaflet-geocsv');
require('leaflet.markercluster');

// https://cartodb.com/basemaps
var tileUrlPattern = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
L.tileLayer(tileUrlPattern, { maxZoom: 18 }).addTo(mapa);

var cluster = new L.MarkerClusterGroup();
mapa.addLayer(cluster);

exports.plot = function (finalKind, from, to){
    var url = '/incidents?finalKind=' + finalKind +
                   '&from=' + from +
                   '&to=' + to,
        loading = document.getElementById('loading'),
        ocorrencias = L.geoCsv(null, options);

    cluster.clearLayers();
    loading.style.display = 'flex';

    d3.text(url).get().on('load', function(csv) {
        ocorrencias.addData(csv);
        cluster.addLayer(ocorrencias);
        var bounds = cluster.getBounds();
        if(bounds.isValid()){
            mapa.fitBounds(bounds);
        }else{
            setInitialView(mapa);
        }
        loading.style.display = 'none';
    })
    .on('error', function(){
        alert('Não foi possível carregar os dados');
        loading.style.display = 'none';
    });
};

