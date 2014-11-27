var fs = require('fs'),
    https = require('https'),
    path = require('path'),
    zlib = require('zlib'),
    csvFile = path.join('static', 'data', 'segpub.csv'),
    gzFile = csvFile + '.gz',
    headers = {'Accept-Encoding': 'gzip'};

if(fs.existsSync(gzFile)){
    headers['If-Modified-Since'] = fs.statSync(gzFile).mtime.toGMTString();
}

console.log('Gathering data...');
// We can't trust in response file type readers
// and the certificate is self signed
https.get({
    host: 'static.hpc.pypln.org',
    path: '/segpub.csv.gz',
    rejectUnauthorized: false,
    headers: headers
}).on('response', function(response){
    console.info('Status code: ', response.statusCode);
    if(response.statusCode === 200){
        console.log('Receiving dozens of csv lines, please, be patient. :)');
        response.pipe(fs.createWriteStream(gzFile));
        response.pipe(zlib.createGunzip())
                .pipe(fs.createWriteStream(csvFile));
    }else{
        response.resume();
    }
    response.on('end', function(){
        // The modified time of the file and last-modified header don't match
        var mtime = new Date(this.headers['last-modified']);
        fs.utimesSync(gzFile, mtime, mtime);
        console.log('Done.');
    });
}).on('error', function(error){
    console.error("Unreachable data:", error.code);
});

