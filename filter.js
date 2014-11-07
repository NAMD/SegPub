var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    csvFile = path.join('static', 'data', 'segpub.csv');

var parser = csv.parse({delimiter: '|'}),
    input = fs.createReadStream(csvFile),
    transformer = csv.transform(function(record, callback){
        callback(null, record.join(' ') + '\n');
    }, {parallel: 10});
input.pipe(parser).pipe(transformer).pipe(process.stdout);
