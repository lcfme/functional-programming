function Template(str) {
  this._raw = str;
}

Template.prototype.compile = function (o){
  return this._raw.replace(/{{\s*(\w+)?\s*}}/g, function(m,p0) {
    return o[p0];
  });
}

var template = new Template('<h1>{{ a }}{{ bb }}</h1>')

template.compile({
  a: '瞎aa',
  bb: '瞎逼逼'
});


//采用递归的方法执行exec
function f (str, reg) {
  	function _f (arr) {
		var _a = [...arr];
        var _r = reg.exec(str);
        if (_r) {
            _a.push(_r);
            return _f(_a);
        }
        return _a;
    }
    return _f([]);
}
