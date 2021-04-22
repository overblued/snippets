var primes=[2,3];
function calcPrimeUpTo(num) {
  var sum=0;
  while (num > primes[primes.length-1]){
    var nextPrime = primes[primes.length-1];
    while( true ){
      nextPrime = nextPrime + 2;
      var sqrt = Math.sqrt(nextPrime);
      // console.log(nextPrime);
      var dividable=false;
      for (var i = 0; i < primes.length; i++){
        if (sqrt < primes[i]){
          break;
        }
        if ( 0 === nextPrime % primes[i]){
          dividable = true;
          break;
        }
      }
      if (!dividable){
        primes.push(nextPrime);
        break;
      }
    }
  }
}

function smallestCommons(arr) {
  calcPrimeUpTo(arr.sort()[1]);
  console.log(primes);
  var fullrange=[];
  for (var i = arr[0]; i <= arr[1]; i++){
    fullrange.push(i);
  }
  return fullrange.reduce(function(p, c){
    var cmd = [];
    while (c > 1){
      for (var i = 0; i < primes.length; i++){
        if ( 0 === c % primes[i] ){
          cmd[i] = cmd[i] ? cmd[i] + 1 : 1;
          c = c/primes[i];
          break;
        }
      }
    }

    for (var j = 0; j < cmd.length; j++){
      if (cmd[j] && (p[j]===undefined || cmd[j] > p[j])){
        p[j] = cmd[j];
      }
    }    

    return p;
         
  }, []).reduce(function(p, c, k){
    return p * Math.pow(primes[k],c);
  }, 1);

}


smallestCommons([1,5]);
