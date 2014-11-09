var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    csvFile = path.join('static', 'data', 'segpub.csv'),
    parser = csv.parse({delimiter: '|', auto_parse: true}),
    stringfier = csv.stringify(),
    file = fs.createReadStream(csvFile);

function filterByKind(kind){
    return csv.transform(function(record){
        var initialKind = record[6],
            finalKind = record[8];
        if(initialKind == kind || finalKind == kind){
            return [initialKind, finalKind];
        }
    });
}

file.pipe(parser)
    .pipe(filterByKind('Roubo'))
    .pipe(stringfier)
    .pipe(process.stdout);
