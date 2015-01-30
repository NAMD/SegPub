function summarizeBy(key){
    return function(summary, curr){
        var _key = key(curr);
        summary[_key] |= 0;
        summary[_key]++;
        return summary;
    };
}

exports.summary = function (data, cb){
    return function (req, res, next){
        res.json(data.reduce(summarizeBy(cb), {}));
    };
};

