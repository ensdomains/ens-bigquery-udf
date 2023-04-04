
import {
    ens_normalize,
    ens_tokenize
} from '@adraffy/ens-normalize';

if(typeof(module) === 'undefined'){
    var module = {};
	module.exports = {}
}
var a = 2

function filter_emoji(s) {
	// remove non-rgi emoji
	s = s.replace(/(\u{1f1e6}|\u{1f1e7}|\u{1f1e8}|\u{1f1e9}|\u{1f1ea}|\u{1f1eb}|\u{1f1ec}|\u{1f1ed}|\u{1f1ee}|\u{1f1ef}|\u{1f1f0}|\u{1f1f1}|\u{1f1f2}|\u{1f1f3}|\u{1f1f4}|\u{1f1f5}|\u{1f1f6}|\u{1f1f7}|\u{1f1f8}|\u{1f1f9}|\u{1f1fa}|\u{1f1fb}|\u{1f1fc}|\u{1f1fd}|\u{1f1fe}|\u{1f1ff}|\u{1f3fb}|\u{1f3fc}|\u{1f3fd}|\u{1f3fe}|\u{1f3ff}|\u{1f431}\u{200d}\u{1f409}️?|\u{1f431}\u{200d}\u{1f4bb}️?|\u{1f431}\u{200d}\u{1f680}️?|\u{1f431}\u{200d}\u{1f464}️?|\u{1f431}\u{200d}\u{1f3cd}️?|\u{1f431}\u{200d}\u{1f453}️?|\u{1f93c}\u{1f3fb}\u{200d}\u{2642}️?|\u{1f93c}\u{1f3fc}\u{200d}\u{2642}️?|\u{1f93c}\u{1f3fd}\u{200d}\u{2642}️?|\u{1f93c}\u{1f3fe}\u{200d}\u{2642}️?|\u{1f93c}\u{1f3ff}\u{200d}\u{2642}️?|\u{1f93c}\u{1f3fb}\u{200d}\u{2640}️?|\u{1f93c}\u{1f3fc}\u{200d}\u{2640}️?|\u{1f93c}\u{1f3fd}\u{200d}\u{2640}️?|\u{1f93c}\u{1f3fe}\u{200d}\u{2640}️?|\u{1f93c}\u{1f3ff}\u{200d}\u{2640}️?)/gu, '');
	// remove real emoji 
	return String.fromCodePoint(...ens_tokenize(s).flatMap(token => {
		switch (token.type) { 
			case 'emoji': return []; // ignore
			case 'nfc': return token.input; // pre-nfc
			case 'mapped':
			case 'valid': return token.cps;
			default: return token.cp;
		}
	}));
}

function is_invis_spoof(s) {
	return /(\uFE0F|\uFE0E|\u200C|\u200D)/u.test(filter_emoji(s));
}

module.exports.a = a
module.exports.is_invis_spoof = is_invis_spoof
module.exports.ens_normalize = ens_normalize
