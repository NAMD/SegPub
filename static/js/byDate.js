var d3 = require('d3'), 
    timeParser = d3.time.format('%d/%m/%Y');

function value(d){ return d.value; }
function date(d){ return timeParser.parse(d.key); }

exports.byDate = function(){
    return function(container){
        var data = d3.entries(container.datum()),
            height = 150,
            x = d3.time.scale().domain(d3.extent(data, date)).range([0, 368]),
            y = d3.scale.linear().domain([0, d3.max(data.map(value))]).range([height, 0]);
        container.append('svg')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function(d){
                return x(date(d));
            })
            .attr('y', function(d){
                return y(value(d));
            })
            .attr('width', 10)
            .attr('height', function(d){
                return height - y(value(d));
            });
    };
};
