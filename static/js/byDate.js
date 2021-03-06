var d3 = require('d3'),
    timeParser = d3.time.format('%Y-%m-%d');

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
    return day(date.getDate() + 1)(date);
}
function isIn(range, width, value){
    return range[0] <= (value + width) && value <= range[1];
}

exports.byDate = function(){
    var brush = d3.svg.brush();

    function chart(container){
        var data = d3.entries(container.datum()),
            dateExtent = d3.extent(data, date),
            width = 400,
            height = 100,
            marginTop = 25,
            daysInterval = d3.time.days(dateExtent[0], plusOneDay(dateExtent[1])),
            monthsInterval = d3.time.months(dateExtent[0], dateExtent[1]),
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
                .text(d3.time.format('%d'));

        function isInBrush(width, value){
            return isIn(brush.extent(), width, value);
        }
        function isInDay(value){
            return isInBrush(x.rangeBand(), value);
        }

        brush.x(x).on("brush", function (){
            days.classed('active', function(d){ return isInDay(x(d)); });
            bars.classed('active', function(d){ return isInDay(x(date(d))); });
            months.classed('active', function(d){
                var firstDay = day(1)(d),
                    incMonth = function(d){ return day(0)(day(32)(d)); },
                    lastDay = incMonth(d);
                return isInBrush(x(lastDay) - x(firstDay), x(firstDay));
            });
        });
        brush.on("brushend", function (){
            var selectedData = data.filter(function(d){
                return isInDay(x(date(d)));
            }).map(function(d){ return d.key;});
            chart.onSelect(selectedData);
        });

        svg.append("g")
            .attr("class", "x brush")
            .call(brush)
            .selectAll("rect")
            .attr("y", y.range()[1])
            .attr("height", y.range()[0] - y.range()[1] - 1);
    }

    chart.onSelect = function(data){ console.log(data);};
    chart.select = function(extent){
        d3.select('g.x.brush')
            .call(brush.extent(extent))
            .call(brush.event);
    };

    return chart;
};
