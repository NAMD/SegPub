var d3 = require('d3'),
    pt_BR = require('./locale').pt_BR;

function slug(d){
    return d.key.split(' ').join('');
}

exports.summary = function(){
    function chart(container){
        var data = d3.entries(container.datum()).sort(function(a, b){
            return b.value - a.value;
        }),
        max = d3.max(data, function(d){ return d.value;}),
        summary = container.append('div')
                    .selectAll('div')
                    .data(data)
                    .enter()
                    .append('div');

        summary.append('input')
            .attr('id', slug)
            .attr('type', 'radio')
            .attr('name', 'finalKind');

        summary.append('label')
            .attr('class', slug)
            .attr('for', slug)
            .append('span')
            .attr('class', 'bar')
            .style('width', function(d){
                return ((d.value / max) * 100) + '%';
            })
            .text(function(d){ return d.key;})
            .append('span')
            .attr('class', 'qty')
            .text(function(d){ return pt_BR.numberFormat('n')(d.value);});
        }

    return chart;
};
