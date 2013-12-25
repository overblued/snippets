/* * *
 *
 * Heap sort
 * @overblued, using siftup
 *
 * Time:		O(nlogn)
 * Space:		O(n), O(1)
 * in place:	true
 * stable:		false
 * * * * * * * * * * * * * * * * * * */

function heapSort(ary, func) {

	/* * *
	 * heapify a given segment in the array
	 * from @start to @end
	 * * * * * * * * * * * * * * * * * * */
	function heapify(startNodeIndex, end){
		var i = startNodeIndex + 1,
		while ( i < end ){
			siftUp(startNodeIndex, i++);
		}
	}
	/* * *
	 * sift up the given node
	 * til the given @start node
	 * * * * * * * * * * * * * * * * * * */
	function siftUp(start, index) {
		while ( index > start && func(ary[index], ary[(index - start - 1 >> 1) + start]) ) {
			switchPlace(index , index = (index - start - 1 >> 1) + start);
		}
	}
	
	function switchPlace(index, pIndex){
		var temp = ary[index];
		ary[index] = ary[pIndex];
		ary[pIndex] = temp;
	}

	// sort begins here
	var i = 0,
		len = ary.length;	
	while (i < len) {
		heapify(i++, len);
	}
	return ary;
}

//usage
var c = [{id: 5},{id: 6},{id: 2},{id: 7}, {id: 1},{id: 3},{id: 9},{id: 4},{id: 8},{id: 0}];
heapSort(c, function(a, b){ return(a.id < b.id);});
console.log(c);
