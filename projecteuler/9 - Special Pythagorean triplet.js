/*
A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

a2 + b2 = c2
For example, 32 + 42 = 9 + 16 = 25 = 52.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.
*/

//from
//a2 + b2 = c2
//a + b + c = 1000
//we can get:
//a = (500-b)*1000/(1000-b)
//a and b are interchangeable, they are both under 500;
var b = 500,a,c;
var i,j;
while(b>1){
	b = b - 1;
	i = (500-b)*1000;
	j = 1000-b;
	if (i%j)
		continue;
	a = i/j;
	break;
}
c = 1000 - a - b;

console.log(a*b*c);
