
//faster
function turnToPalindrome(abc){
	var pa,a,b,c
	pa = abc*1000;
	a = Math.floor(abc/100);
	b = Math.floor((abc - a*100)/10);
	c = abc- a*100-b*10;
	pa += c*100+b*10+a;
	return pa;
}
console.time("clapsedtime");
var result=0,
	divisor1,
	divisor2,
	fullPalindrome,
	halfPalindrome=999;
while(halfPalindrome > 99){
	var divisor1 = 990;
	while(divisor1 > 99){
		fullPalindrome = turnToPalindrome(halfPalindrome);
		if ((fullPalindrome % divisor1 === 0) && (fullPalindrome / divisor1 < 999) && (fullPalindrome / divisor1 > 99) && fullPalindrome > result) {
			result = fullPalindrome;
		}
		divisor1-=11;
	}
	halfPalindrome-=1;
}
console.timeEnd("clapsedtime");
console.log(result);


