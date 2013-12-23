/* * *
 *
 * Merge sort
 *
 * Time:		O(nlogn), O(n^2)
 * Space:		O(nlogn), O(n)
 * in place:	false, can be true
 * stable:		true
 * comparison:	true
 * * * * * * * * * * * * * * * * * * */

//merge sort
function mergeSort(ary, func){
	mergeSort.compareFunc = func;
	return mergeSort.sort(ary);
}

mergeSort.merge = function(a, b){
	var i = 0,j = 0,
		lenA = a.length,
		lenB = b.length,
		c = [];
	while (i+j < lenA + lenB){
      	if (i==lenA)
        	c.push(b[j++]);
     	else if (j==lenB)
          	c.push(a[i++]);
      	else
			mergeSort.compareFunc(a[i], b[j]) ? c.push(a[i++]) : c.push(b[j++]);
	}
	return c;
};

mergeSort.sort = function(ary){
	var len = ary.length,
		mid = Math.round(len / 2);
	if (len <= 1)
		return ary;
	return mergeSort.merge(mergeSort.sort(ary.slice(0, mid)), mergeSort.sort(ary.slice(mid)));
};

//usage
var a = [{id: 4},{id: 6},{id: 2},{id: 1},{id: 3},{id: 9},{id: 5},{id: 8},{id: 0}];
a = mergeSort(a, function(a,b){ return a.id < b.id;});
