/* * *
 *
 * a string manipulator
 * for dev or fun
 *
 * * * * * * * * * * * * * * * * * * */

var actions, defaultActions, processString;
actions = {
	 "d":	unescape
	,"e":	escape
	,"s":	function sort(str){ return str.split('\n').sort().join('\n'); }
	,"r":	function rev(s){
				return s.split('\n')
						.map(function(v){return v.split('').reverse().join('');})
						.join('\n');
			}
};
//a fall back sequence
//to transform the string
defaultActions = [
	//add quotes to keys/values inside a pair of {}
	,function jsonify(str){
		if (! /^{[^}]+}$/gm.test(str)){ return false; }
		return '{\n' + str.slice(1, -1).split(',').map(function(parts){
			if (parts.indexOf(':') == -1) {
				return parts;
			}
			return parts.replace(/^([^:]+)\s*:\s*(.+)$/mg,function(m,p1,p2){
				p1 = p1.trim();
				p2 = p2.trim();
				if (! /('|")$/.test(p1)){
					p1 = '"' + p1 + '"';
				}
				if (! /^('|")/.test(p2)){
					p2 = '"' + p2 + '"';
				}
				return '\t' + p1 + ': ' + p2;
			});
		}).join(', \n') + '}';
		
	}
	/* * *
	 * chinese numerals in currency
	 * * * * * * * * * * * * * * * * * * */
	,function trans(str){
		//在古代, 兆 = 10^12, 京 = 10^16;现在已废弃不用
		//现在的兆表示百万(m, mega)
		var ssb = '分角元拾佰仟万拾佰仟亿拾佰仟万',
			sss = '零壹贰叁肆伍陆柒捌玖';
		var i, j, len, tmp;
		
		tmp = str.replace(/\s*,\s*/g,'')
				 .match(/^(?:0*)?([1-9]\d*)?(?:\.)?(\d{0,2})?$/);
		if (tmp === null) return false;

		tmp = (tmp[1] || '') + ((tmp[2] || '') + '00').slice(0,2);

		i = 1;
		len = tmp.length;
		return tmp.replace(/\d/g, function (m){
					return sss[m] + (ssb[len - i++] || '?');})
				.replace(/(?:零[分角拾佰仟])+/g,'零')
				.replace(/零+([元万亿])/g,'$1')
				.replace(/亿万/, '亿')
				.replace(/零$/,'')
				.replace(/^零/,'');
	}
	,function arithmetic(str){
		//if the string consists of '0' to '9' and '.+-*/%'
		if (/^[0-9\/\(\)\-+*%.\s]+$/.test(str)){
		//it may be an invalid arithmetic expression
			try{
				return str + ' = ' + eval(str);
			} catch(e) {
				return false;
			}
		}
		return false;
	}
	/* * *
	 * change case
	 * lower > camel > upper > lower
	 * * * * * * * * * * * * * * * * * * */
	,function caps(str){
		//take a slice of the string to detemine which case to change
		try { var tmp = str.match(/^\b([a-zA-Z]{2})\w*\b/)[1]; }
		catch (e) { return false; }
		//lower > camel
		if (/^[a-z]+$/.test(tmp)){
			return str.replace(/\b([a-zA-Z])(\w*)\b/g,function (m,p1,p2){
				return p1.toUpperCase() + p2.toLowerCase();
			})
		}
		//upper > lower
		if (/^[A-Z]+$/.test(tmp)){
			return str.toLowerCase();
		}
		//other > upper
		return str.toUpperCase();
	}
	,function(str){
		console.log('unchanged');
		return str;
	}
];
processString = function (str){
	if (typeof str !== 'string') return 'not a string';

	if ( !(str = str.trim()) ) return '';
	//get action
	var act = str.match(/\\([a-z]{1,3})$/);
	if (act) {
		act = act[1];
		str = str.slice(0,str.length - act.length - 1)
		if (actions[act]){
			return actions[act](str);
		}
		return str;
	}

	return (function takeDefaultActions(index){ 
		return defaultActions[index](str) || takeDefaultActions(index+1);
	})(0);
};
console.log(processString(process.argv[2] || process.argv[3]));

//for some reason unknown, i have to add this line to make multiline string works
console.log('');
	
