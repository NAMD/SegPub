var fs = require('fs'),
    https = require('https'),
    zlib = require('zlib'),
    output = fs.createWriteStream('static/data/segpub.csv');

var request = https.get({ host: 'static.hpc.pypln.org',
                          path: '/segpub.csv.gz',
                          port: 443,
                          rejectUnauthorized: false,
                          headers: { 'accept-encoding': 'gzip' } });

request.on('response', function(response) {
    response.pipe(zlib.createGunzip()).pipe(output);
});

