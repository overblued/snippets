function trans(d){
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
//个位以前的“0”要写或读出来，但连续的0只要写或读一个便可。例如：10002 应写成“一万零二”
console.log(trans('.23'));	//贰角叁分
console.log(trans('1200020'));	//壹佰贰拾万零贰拾元整
console.log(trans('1000000000.06'));	//壹拾亿元零陆分
console.log(trans('1010010010.25'));	//壹拾亿壹仟零壹万零壹拾元贰角伍分
console.log(trans('abs'));	//NaN




