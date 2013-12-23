console.log((function getLargestPrime(n){
	if (!(n&1))
		n = n >> 1;
	var i=3;
	while(n>1){
		while(n%i)
			i+=2;
		n/=i;
	}
	return i;
})(600851475143));
