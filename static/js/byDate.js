var d3 = require('d3'), 
    timeParser = d3.time.format('%d/%m/%Y');

function value(d){ return d.value; }
function date(d){ return timeParser.parse(d.key); }
function plusOneDay(date){
    var oneDay = 86400000;
    return new Date(date.getTime() + oneDay);
}

exports.byDate = function(){
    return function(container){
        var svg = container.append('svg'),
            data = d3.entries(container.datum()),
            height = 150,
            daysInterval = d3.time.days(d3.min(data, date), plusOneDay(d3.max(data, date))),
            x = d3.scale.ordinal().domain(daysInterval).rangeBands([0, 386], 0.25, 2),
            y = d3.scale.linear().domain([0, d3.max(data.map(value))]).range([height, 0]),
            xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(function(d){
                return d.getDate();
            });

        svg
            .append('g')
            .attr('class', 'bars')
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
            .attr('width', x.rangeBand())
            .attr('height', function(d){
                return height - y(value(d));
            });

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

    };
};
