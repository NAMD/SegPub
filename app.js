var fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
    express = require('express'),
    compression = require('compression'),
    app = express(),
    filter  = require('./filter'),
    summary = require('./summary').summary,
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

function parseDate(dateString){
    var split = dateString.split('/');
    return new Date(split.reverse().join('-'));
}

function validatePreconditions(req, res, next){
    if(!req.query.finalKind){
        res.status(412).send({error: 'Final kind missing'});
    }else{
        next();
    }
}

app.get('/incidents', validatePreconditions, function(req, res){
    var finalKind = req.query.finalKind;

    res.set('Content-Type', 'text/csv');
    csv.stringify(
        incidents.filter(filter.filterByKind(finalKind))
                 .filter(function(incident){
                     // TODO: Refactoring and test covering are needed.
                     var date = parseDate(incident['Inicio Atendimento'].slice(0, 10)),
                         show = true;
                     if(req.query.from){
                         show = show && date >= new Date(req.query.from);
                     }
                     if(req.query.to){
                         show = show && date <= new Date(req.query.to);
                     }
                     return show;
                 }),
        {delimiter: '|', header: true})
    .pipe(res);
});

app.get('/incidents/summary', summary(incidents, function(incident){
    return incident['Descrição Natureza Final'];
}));

app.get('/incidents/summary/date', summary(incidents, function(incident){
    var date = parseDate(incident['Inicio Atendimento'].slice(0, 10));
    return date.toISOString().slice(0, 10);
}));

exports.app = app;
