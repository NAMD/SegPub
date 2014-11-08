var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    csvFile = path.join('static', 'data', 'segpub.csv');

var parser = csv.parse({delimiter: '|', auto_parse: true}),
    input = fs.createReadStream(csvFile);

parser.on('readable', function(){
    var record = parser.read(),
        initialKind = record[6],
        finalKind = record[8];
    if(initialKind == 'Roubo' || finalKind == 'Roubo'){
        console.log(initialKind, '-', finalKind);
    }
});
input.pipe(parser);
