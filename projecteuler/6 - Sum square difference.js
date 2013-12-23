var number = 100;
var result=0,i,j;
for(i = 1; i < number; i++){
	for(j = i + 1; j <= number; j++){
		if (i !== j){
			result += i * j;
		}
	}
}
result *= 2;
console.log(result);

