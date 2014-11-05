var L = require('leaflet'),
    $ = require('jquery'),
    mapa = L.map('mapaleaf', {attributionControl:false}).setView([-22.92,-43.22], 10);

require('leaflet-geocsv');
require('leaflet.markercluster');

L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(mapa);

var ocorrencias = L.geoCsv(null, {
    fieldSeparator: '|',
    firstLineTitles: true,
    onEachFeature: function (feature, layer) {
        //console.log(feature.properties);
        var popup = '';
        for (var indice in feature.properties) {
            var title = ocorrencias.getPropertyTitle(indice);
            popup += '<b>'+title+'</b><br />'+feature.properties[indice]+'<br />';
        }
        layer.bindPopup(popup);
    },
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon:L.icon({
                iconUrl: '/static/images/chamado.png',
                shadowUrl: '/static/images/marker-shadow.png',
                iconSize: [28,35],
                shadowSize:   [41, 41],
                shadowAnchor: [13, 20]
            })
        });
    }
});

$.ajax ({
    type:'GET',
    dataType:'text',
    url: '/static/data/roubos.csv',
    error: function() {
        alert('Não foi possível carregar os dados');
    },
    success: function(csv) {
        var cluster = new L.MarkerClusterGroup();
        ocorrencias.addData(csv);
        cluster.addLayer(ocorrencias);
        mapa.addLayer(cluster);
        mapa.fitBounds(cluster.getBounds());
    },
    complete: function() {
        $('#carregando').delay(500).fadeOut('slow');
    }
});

