/* * *
 *
 * Quick sort
 *
 * Time:		O(nlogn), O(n^2)
 * Space:		O(logn)
 * in place:	false, can be true
 * stable:		false
 * comparison:	true
 * * * * * * * * * * * * * * * * * * */

function quickSort(ary, func){
	var i,
		pivot,
		len = ary.length,
		left = [],
		right = [];
		if (len-- <= 1)
			return ary;
		pivot = ary.pop();
		while (len--){
			func(ary[len], pivot) ? left.push(ary[len]) : right.push(ary[len]);
		}
		//always return left + privot + right
		return quickSort(left, func).concat(pivot, quickSort(right, func));
}
