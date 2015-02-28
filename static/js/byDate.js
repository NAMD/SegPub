var d3 = require('d3'),
    timeParser = d3.time.format('%d/%m/%Y');

function value(d){ return d.value; }
function date(d){ return timeParser.parse(d.key); }
function day(d){
    return function(date){
        date = new Date(date);
        date.setDate(d);
        return date;
    };
}
function plusOneDay(date){
    return new Date(date).setDate(date.getDate() + 1);
}
function isIn(range, width, value){
    return range[0] <= (value + width) && value <= range[1];
}

exports.byDate = function(){
    return function(container){
        var data = d3.entries(container.datum()),
            width = 400,
            height = 100,
            marginTop = 25,
            daysInterval = d3.time.days(d3.min(data, date), plusOneDay(d3.max(data, date))),
            monthsInterval = d3.time.months(d3.min(data, date), d3.max(data, date)),
            x = d3.scale.ordinal().domain(daysInterval).rangeBands([0, width], 0.25, 2),
            y = d3.scale.linear().domain([0, d3.max(data.map(value))]).range([height, marginTop]),
            svg = container.append('svg')
                .attr('viewBox', '0 0 ' + width + ' ' + height)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .attr('width', '100%'),
            bars = svg.append('g')
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
                }),

            xAxisGroup = svg.append("g")
                .attr("class", "x axis")
                .attr('transform', 'translate(0, 10)'),

            months = xAxisGroup.append('g').attr('class', 'months')
                .selectAll('text')
                .data(monthsInterval.map(day(15)))
                .enter()
                .append('text')
                .style('text-anchor', 'middle')
                .attr('x', x)
                .text(d3.time.format('%B')),

            days = xAxisGroup.append('g').attr("class", "days")
                .selectAll('text')
                .data(daysInterval)
                .enter()
                .append('text')
                .attr('y', 10)
                .attr('x', x)
                .text(d3.time.format('%d')),

            brush = d3.svg.brush().x(x).on("brush", function (){
                var isInBrush = isIn.bind(this, brush.extent()),
                    isInDay = isInBrush.bind(this, x.rangeBand());
                days.classed('active', function(d){ return isInDay(x(d)); });
                bars.classed('active', function(d){ return isInDay(x(date(d))); });
                months.classed('active', function(d){
                    var firstDay = day(1)(d),
                        incMonth = function(d){ return day(0)(day(32)(d)); },
                        lastDay = incMonth(d);
                    return isInBrush(x(lastDay) - x(firstDay), x(firstDay));
                });
            });

        svg.append("g")
            .attr("class", "x brush")
            .call(brush)
            .selectAll("rect")
            .attr("y", -6)
            .attr("height", height + 7);

    };
};
