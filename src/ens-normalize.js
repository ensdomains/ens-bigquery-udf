import { ens_normalize } from '@adraffy/ens-normalize';
if(typeof(module) === 'undefined'){
    var module = {};
	module.exports = {}
}
var a = 2
module.exports.a = a
module.exports.ens_normalize = ens_normalize
