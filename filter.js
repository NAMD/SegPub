var csv = require('csv');

exports.selector = function(){
    var keys = [].slice.call(arguments);
    return csv.transform(function(record){
        var selection = [];
        keys.forEach(function(key){
            selection.push(record[key]);
        });
        return selection;
    });
};

exports.filterByKind= function (kind){
    return csv.transform(function(record){
        var initialKind = record[6],
            finalKind = record[8];
        if(initialKind == kind || finalKind == kind){
            return record;
        }
    });
};

