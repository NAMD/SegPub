exports.selector = function(){
    var keys = [].slice.call(arguments);
    return function(record){
        return keys.map(function(key){
            return record[key];
        });
    };
};

exports.filterByKind = function(kind){
    return function(record){
        var finalKinds = record[8];
        if(finalKinds === kind){
            return record;
        }
    };
};

