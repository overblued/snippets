/* * *
 *
 * Merge sort
 *
 * Time:		O(n^2), O(n^2), O(n)
 * Space:		O(1), O(n)
 * in place:	true
 * stable:		true
 * comparison:	true
 * * * * * * * * * * * * * * * * * * */
 
function insertionSort(ary, func){
	var i = ary.length - 1,
      	len = i,
		temp,
		value;
	while(i){
		temp = i;
      	value = ary[--i];
		while ( (temp <= len) && func(value, ary[temp]) ){
			ary[temp-1] = ary[temp];
          	ary[temp++] = value;
		}
	}
	return ary;
}

//usage
var c = [{id: 4},{id: 6},{id: 2},{id: 1},{id: 3},{id: 9},{id: 5},{id: 8},{id: 0}];
insertionSort(c, function(a, b){return(a.id > b.id);});
console.log(c);

