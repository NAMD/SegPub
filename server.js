var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000,
    fs = require('fs'),
    path = require('path'),
    csv = require('csv'),
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

app.use(express.static('static'));
app.listen(port);
console.log('Listening on port', port);

