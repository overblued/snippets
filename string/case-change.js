/* * *
 * change case
 * lower > camel > upper > lower
 * * * * * * * * * * * * * * * * * * */
function caps(str){
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