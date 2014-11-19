var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    express = require('express'),
    app = express(),
    filter  = require('./filter'),
    csvFile = path.join('static', 'data', 'segpub.csv');

require('./getData');

var incidents = [],
    storeData = csv.transform([].push.bind(incidents));

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
    var finalKind = req.query.finalKind || 'Roubo';
    res.set('Content-Type', 'text/csv');

    csv.stringify(
        incidents.filter(filter.filterByKind(finalKind)),
        {delimiter: '|', header: true})
    .pipe(res);
});

app.get('/incidents/summary', function(req, res){
    var summary = incidents.reduce(function(summary, curr){
        var finalKind = curr['Descrição Natureza Final'];
        summary[finalKind] |= 0;
        summary[finalKind]++;
        return summary;
    }, {});
    res.json(summary);
});

exports.app = app;
