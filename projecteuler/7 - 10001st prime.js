//By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

//What is the 10 001st prime number?

function findNthPrime(n){
	var primes = [2,3,5,7,11,13];
	var nth = primes.length;
	var i, latest = 15, sr;
	while(nth < n){
		//loop through primes
		sr = (Math.sqrt(latest) >> 0) + 1;
		for(i = 1; i < nth; i++){
			//factor found
			if (!(latest % primes[i])){
				break;
			}
			//factor not found
			//then latest is a prime
			if (sr < primes[i]){
				primes.push(latest);
				nth++;
				break;
			}
		}
		latest +=2;
	}
	return primes.pop();
}
var n = 10001;
console.time('time eclapsed:');
console.log("%sst prime number is: ",n,findNthPrime(n));
console.timeEnd('time eclapsed:');
