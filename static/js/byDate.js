var d3 = require('d3');

exports.byDate = function(){
    return function(container){
        var data = d3.entries(container.datum());
        container
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect');
    };
};
