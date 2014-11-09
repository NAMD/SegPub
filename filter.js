var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    csvFile = path.join('static', 'data', 'segpub.csv'),
    parser = csv.parse({delimiter: '|', auto_parse: true}),
    stringfier = csv.stringify(),
    file = fs.createReadStream(csvFile);

function selector(){
    var keys = [].slice.call(arguments);
    return csv.transform(function(record){
        var selection = [];
        keys.forEach(function(key){
            selection.push(record[key]);
        });
        return selection;
    });
}

function filterByKind(kind){
    return csv.transform(function(record){
        var initialKind = record[6],
            finalKind = record[8];
        if(initialKind == kind || finalKind == kind){
            return record;
        }
    });
}

file.pipe(parser)
    .pipe(filterByKind('Roubo'))
    .pipe(selector(6, 8))
    .pipe(stringfier)
    .pipe(process.stdout);
