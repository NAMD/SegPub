exports.selector = function(){
    var keys = [].slice.call(arguments);
    return function(record){
        return keys.map(function(key){
            return record[key];
        });
    };
};

var filterBy = function(field, value){
    return function(record){
        var category = record[field];
        if(category === value){
            return record;
        }
    };
};
exports.filterBy = filterBy;

exports.filterByKind = function(value){
    return filterBy('Descrição Natureza Final', value);
};

exports.filterByCategory = function(value){
    return filterBy('Categoria', value);
};

