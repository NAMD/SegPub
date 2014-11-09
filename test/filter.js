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
