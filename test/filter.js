var assert = require('assert'),
    csv = require('csv'),
    filter = require('../filter');

describe('Selector', function(){
    var data;
    beforeEach(function(){
        data = [[1, 2, 3], [4, 5, 6]];
    });
    it('should select only the first element of each tuple', function(){
        var select = filter.selector(0);

        csv.transform(data, select, function(err, output){
            assert.equal(err, null);
            assert.deepEqual(output, [[1], [4]]);
        });
    });
    it('should select the two first element of each tuple', function(){
        var select = filter.selector(0, 1);

        csv.transform(data, select, function(err, output){
            assert.equal(err, null);
            assert.deepEqual(output, [[1, 2], [4, 5]]);
        });
    });
    it('should select the first and the third element of each tuple', function(){
        var select = filter.selector(0, 2);

        csv.transform(data, select, function(err, output){
            assert.equal(err, null);
            assert.deepEqual(output, [[1, 3], [4, 6]]);
        });
    });
});

describe('filterByKind', function(){
    var fixture, parser;
    beforeEach(function(){
        parser = csv.parse({delimiter: '|'});
        fixture = require('fs').createReadStream('test/fixture.csv');
    });
    context('with no matches', function(){
        it('should return empty array', function(){
            var byKind = filter.filterByKind('Inexistent Kind');
            fixture.pipe(parser)
                .pipe(csv.transform(byKind, function(err, output){
                    assert.equal(err, null);
                    assert.deepEqual(output, []);
                }));
        });
    });
    context('data with one "Atropelamento"', function(){
        it('should return the mached record', function(){
            var byKind = filter.filterByKind('Atropelamento');
            fixture.pipe(parser)
                .pipe(csv.transform(byKind, function(err, output){
                    assert.equal(err, null);
                    assert.equal(output.length, 1);
                    assert.equal(output[0][6], 'Atropelamento');
                    assert.equal(output[0][8], 'Atropelamento');
                    assert.equal(output[0][0], '1211201203254');
                }));
        });
    });
    context('data with one "Cancelado pelo Supervisor"', function(){
        it('should return the all mached record', function(){
            var byKind = filter.filterByKind('Cancelado pelo Supervisor');
            fixture.pipe(parser)
                .pipe(csv.transform(byKind, function(err, output){
                    var initialKinds = output.map(function(v){
                        return v[6];
                    });
                    assert.equal(err, null);
                    assert.deepEqual(initialKinds, [
                        'Pertubação do Trabalho e Sossego',
                        'Informe',
                        'Pertubação do Trabalho e Sossego',
                        'Entorpecente (posse e uso)' ]);
                    assert.equal(output.length, 4);
                }));
        });
    });
});
