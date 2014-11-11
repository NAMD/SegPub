var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    filter  = require('./filter'),
    csvFile = path.join('static', 'data', 'segpub.csv'),
    parser = csv.parse({delimiter: '|', auto_parse: true}),
    stringfier = csv.stringify(),
    file = fs.createReadStream(csvFile);

file.pipe(parser)
    .pipe(csv.transform(filter.filterByKind('Roubo')))
    .pipe(csv.transform(filter.selector(6, 8)))
    .pipe(stringfier)
    .pipe(process.stdout);
