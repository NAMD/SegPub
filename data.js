var fs = require('fs'),
    https = require('https'),
    path = require('path'),
    zlib = require('zlib');

function dataFileStream(filename){
    var filePath = path.join('static', 'data', filename);
    return fs.createWriteStream(filePath);
}

// We can't trust in response file type readers
// and the certificate is self signed
https.get({
    host: 'static.hpc.pypln.org',
    path: '/segpub.csv.gz',
    rejectUnauthorized: false,
    headers: {'accept-encoding': 'gzip'}
}).on('response', function(response){
    response.pipe(dataFileStream('segpub.csv.gz'));
    response.pipe(zlib.createGunzip())
            .pipe(dataFileStream('segpub.csv'));
});

