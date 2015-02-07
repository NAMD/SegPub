var d3 = require('d3'),
    timeParser = d3.time.format('%d/%m/%Y');

function value(d){ return d.value; }
function date(d){ return timeParser.parse(d.key); }
function plusOneDay(date){
    return new Date(date).setDate(date.getDate() + 1);
}
function plusOneMonth(date){
    return new Date(date).setMonth(date.getMonth() + 1);
}

exports.byDate = function(){
    return function(container){
        var data = d3.entries(container.datum()),
            width = 400,
            height = 100,
            marginTop = 20,
            daysInterval = d3.time.days(d3.min(data, date), plusOneDay(d3.max(data, date))),
            monthsInterval = d3.time.months(d3.min(data, date), plusOneMonth(d3.max(data, date))),
            x = d3.scale.ordinal().domain(daysInterval).rangeBands([0, width], 0.25, 2),
            y = d3.scale.linear().domain([0, d3.max(data.map(value))]).range([height - marginTop, 0]),
            xAxis = d3.svg.axis().scale(x).tickFormat(function(d){
                var day = d.getDate();
                if(day === 15){
                    d3.select(this)
                        .append('tspan')
                        .attr('dy', '-1em')
                        .text(d3.time.format('%m')(d));
                }
                return day;
            }),
            svg = container.append('svg')
                .attr('viewBox', '0 0 ' + width + ' ' + height)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .attr('width', '100%');


        svg
            .append('g')
            .attr('class', 'bars')
            .attr('transform', 'translate(0, ' + marginTop + ')')
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
