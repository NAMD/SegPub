var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    express = require('express'),
    app = express(),
    filter  = require('./filter'),
    csvFile = path.join('static', 'data', 'segpub.csv');

var incidents = {},
    storeData = csv.transform(function(record){
        var finalKind = record['Descrição Natureza Final'];
        if(incidents[finalKind] === undefined){
           incidents[finalKind] = [];
        }
        incidents[finalKind].push(record);
    });

storeData.on('finish', function(){
    console.log('The incidents are in memory.');
});

var parser = csv.parse({delimiter: '|', columns: true});
file = fs.createReadStream(csvFile);
file.pipe(parser)
    .pipe(csv.transform(filter.filterByCategory('OCORRÊNCIA')))
    .pipe(storeData)
    .resume();

app.get('/incidents', function(req, res){
    res.set('Content-Type', 'text/csv');

    csv.stringify(
        incidents['Roubo'],
        {delimiter: '|', header: true}
    ).pipe(res);
});

exports.app = app;
