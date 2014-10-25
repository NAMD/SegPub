var fs = require('fs'),
    https = require('https'),
    zlib = require('zlib'),
    output = fs.createWriteStream('static/data/segpub.csv');

https.get({
    host: 'static.hpc.pypln.org',
    path: '/segpub.csv.gz',
    rejectUnauthorized: false,
    headers: {'accept-encoding': 'gzip'}
}).on('response', function(response){
    response.pipe(zlib.createGunzip())
            .pipe(output);
});

