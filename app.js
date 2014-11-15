var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    express = require('express'),
    app = express(),
    filter  = require('./filter'),
    csvFile = path.join('static', 'data', 'segpub.csv');


app.get('/incidents', function(req, res){

    res.set('Content-Type', 'text/csv');

    var parser = csv.parse({delimiter: '|', columns: true}),
        stringfier = csv.stringify({delimiter: '|', header: true});

    file = fs.createReadStream(csvFile);
    file.pipe(parser)
        .pipe(stringfier)
        .pipe(res);
});



exports.app = app;
