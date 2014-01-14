function trans(d){
	var ssb = '分角点元拾佰仟万拾佰仟亿拾佰仟',
		sss = '零壹贰叁肆伍陆柒捌玖';
	var i = 0, j, frac = '',
		len = d.length;
	if (!/^\d*(\.\d{0,2})?$/.test(d)){
		return NaN;
	}
	j = d.indexOf('.');
	if (j === -1)
		frac = '.00';
	if (j === len - 1)
		frac = '00';
	if (j === len - 2)
		frac = '0';
	d += frac;
	
	len = d.length;
	return d.replace(/./g, function (m){
		i += 1;
		if(m === '.') return '';
		return sss[m] + ssb[len - i];
	}).replace(/(?:零[分角拾佰仟])+/g,'零').replace(/零+([元万亿])/g,'$1').replace(/亿万/, '亿').replace(/零$/,'整');
}
//个位以前的“0”要写或读出来，但连续的0只要写或读一个便可。例如：10002 应写成“一万零二”
console.log(trans('.23'));	//贰角叁分
console.log(trans('1200020'));	//壹佰贰拾万零贰拾元整
console.log(trans('1000000000.06'));	//壹拾亿元零陆分
console.log(trans('1010010010.25'));	//壹拾亿壹仟零壹万零壹拾元贰角伍分
console.log(trans('abs'));	//NaN




