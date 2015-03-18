var d3 = require('d3'),
    summary = require('./summary').summary,
    byDate = require('./byDate').byDate,
    map = require('./map'),
    dateChart = byDate(),
    finalKind, from, to;

dateChart.onSelect = function(data){
    finalKind = finalKind || '';
    from = data[0];
    to = data[1]? data[1] : from;
    map.plot(finalKind, from, to);
};

d3.json('/incidents/summary', function(json){
    d3.select('div.boxes')
        .append('div')
        .attr('id', 'summary')
        .datum(json)
        .call(summary())
        .selectAll('input')
        .on('change', function(value){
            finalKind = value.key;
            from = from || '';
            to = to || '';
            map.plot(finalKind, from, to);
        }).node().click();
});

d3.json('/incidents/summary/date', function(json){
    d3.select('div.boxes div#by-date')
        .datum(json)
        .call(dateChart);
});

