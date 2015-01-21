var L = require('leaflet'),
    d3 = require('d3'),
    summary = require('./summary').summary,
    mapa = L.map('mapaleaf', {
        attributionControl: false,
        zoomControl: false
    }).setView([-22.92,-43.22], 10),
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

require('leaflet-geocsv');
require('leaflet.markercluster');

L.tileLayer('http://b.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(mapa);
var cluster = new L.MarkerClusterGroup();
mapa.addLayer(cluster);

function plot(url){
    var loading = document.getElementById('loading'),
        ocorrencias = L.geoCsv(null, options);

    loading.style.display = 'flex';

    d3.text(url).get().on('load', function(csv) {
        ocorrencias.addData(csv);
        cluster.clearLayers();
        cluster.addLayer(ocorrencias);
        mapa.fitBounds(cluster.getBounds());
        loading.style.display = 'none';
    })
    .on('error', function(){
        alert('Não foi possível carregar os dados');
        loading.style.display = 'none';
    });
}

d3.json('/incidents/summary', function(json){
    d3.select('div.boxes')
        .append('div')
        .attr('id', 'summary')
        .datum(json)
        .call(summary())
        .selectAll('input')
        .on('change', function(value){
            plot('/incidents?finalKind=' + value.key);
        });
});

