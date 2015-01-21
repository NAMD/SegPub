var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    express = require('express'),
    compression = require('compression'),
    app = express(),
    filter  = require('./filter'),
    csvFile = path.join('static', 'data', 'segpub.csv'),
    incidents = [],
    storeData = csv.transform([].push.bind(incidents));

if(!fs.existsSync(csvFile)){
    console.error('No data found! You probably forgot to run `npm run get-data` to create the file: ', csvFile);
    process.exit(8);
}

storeData.on('finish', function(){
    console.log('The incidents are in memory.');
});

var parser = csv.parse({delimiter: '|', columns: true});
file = fs.createReadStream(csvFile);
file.pipe(parser)
    .pipe(csv.transform(filter.filterByCategory('OCORRÊNCIA')))
    .pipe(storeData)
    .resume();

app.use(compression());

app.get('/incidents', function(req, res){
    var finalKind = req.query.finalKind || 'Roubo';
    res.set('Content-Type', 'text/csv');
    csv.stringify(
        incidents.filter(filter.filterByKind(finalKind)),
        {delimiter: '|', header: true})
    .pipe(res);
});

function summarizeBy(key){
    return function(summary, curr){
        var _key = key(curr);
        summary[_key] |= 0;
        summary[_key]++;
        return summary;
    };
}

function summary(cb){
    return function (req, res, next){
        res.json(incidents.reduce(summarizeBy(cb), {}));
    };
}

app.get('/incidents/summary', summary(function(incident){
    return incident['Descrição Natureza Final'];
}));

app.get('/incidents/summary/date', summary(function(incident){
    var date = incident['Inicio Atendimento'].slice(0, 10);
    return date;
}));

exports.app = app;
