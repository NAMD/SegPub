var L = require('leaflet'),
    $ = require('jquery'),
    d3 = require('d3'),
    mapa = L.map('mapaleaf', {
        attributionControl: false,
        zoomControl: false
    }).setView([-22.92,-43.22], 10),
    options = {
        fieldSeparator: '|',
        firstLineTitles: true,
        onEachFeature: function (feature, layer) {
            var popup = '', title;
            console.log(feature)
            for (var indice in feature.properties) {
                title = indice;
                popup += '<b>'+title+'</b><br />'+feature.properties[indice]+'<br />';
            }
            layer.bindPopup(popup);
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon:L.icon({
                    iconUrl: '/images/chamado.png',
                    shadowUrl: '/images/marker-shadow.png',
                    iconSize: [28,35],
                    shadowSize:   [41, 41],
                    shadowAnchor: [13, 20]
                })
            });
        }
    };

require('leaflet-geocsv');
require('leaflet.markercluster');

L.tileLayer('http://b.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(mapa);

function plot(url){
    $('#carregando').delay(500).fadeIn('slow');
    var ocorrencias = L.geoCsv(null, options);

    $.ajax ({
        type:'GET',
        dataType:'text',
        url: url,
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
}

d3.json('/incidents/summary', function(json){
    var data = d3.entries(json).sort(function(a, b){
        return b.value - a.value;
    }),
    max = d3.max(data, function(d){ return d.value;}),
    summary = d3.select('div.boxes')
                .append('div')
                .attr('id', 'summary')
                .append('div')
                .selectAll('div')
                .data(data)
                .enter()
                .append('div');

    function slug(d){
        return d.key.split(' ').join('');
    }

    summary.append('input')
        .attr('id', slug)
        .attr('type', 'radio')
        .attr('name', 'finalKind')
        .on('change', function(value){
            plot('/incidents?finalKind=' + value.key);
        });

    summary.append('label')
        .attr('class', slug)
        .attr('for', slug)
        .append('span')
        .attr('class', 'bar')
        .style('width', function(d){
            return ((d.value / max) * 100) + '%';
        })
        .text(function(d){ return d.key;});
});

