var csv = require('csv');

exports.selector = function(){
    var keys = [].slice.call(arguments);
    return function(record){
        return keys.map(function(key){
            return record[key];
        });
    };
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

