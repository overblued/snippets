//	function getPrimeDivisors(n){
//		var list = [];
//		var i=2;
//		while(n>1){
//			while(n%i){
//				i+=1;
//			}
//			list.push(i);
//			while (!(n%i)){
//				n/=i;
//			}
//		}
//		return list;
//	}

function getPrimes(number){
	var i=2,j,list=[];
	while(i <= number){
		j = 2;
		while(i%j){
			j+=1;
		}
		if (j===i)
			list.push(j);
		i++;
	}
	return list;
}

var number = 20;
var divisors = getPrimes(number),
	i,temp,result = 1;
for (i = 0; i < divisors.length; i++){
	temp = 1;
	while(temp < number/divisors[i]){
		temp *= divisors[i];
	}
	result *= temp;
}
console.log(result);//232792560
