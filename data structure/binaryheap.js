/* * *
 *
 * Binary Heap
 *
 * @overblued
 * * * * * * * * * * * * * * * * * * */


/* * *
 * BinaryHeap
 * Function Constructor
 *
 * @param {function} a compare function, optional
 * * * * * * * * * * * * * * * * * * */

function BinaryHeap( fn ){
	this.fn = fn || this.defaultfn;
	this.stack = [];
}

BinaryHeap.prototype = {
	push: function ( obj ){
		this.stack.push(obj);
		this.siftup();
	},
	pop: function (){
		if (this.stack.length){
			var item = this.stack[0],
				len = this.stack.length - 1;
			if (len){
				this.stack[0] = this.stack[len];
				this.stack.length = len;
			
				this.siftdown();
			}
			return item;
		}
		//nothing to pop
		return false;
	},
	siftup: function (){
		var index = this.stack.length - 1;
		if (index < 1) return;
		while ( index > 0 && this.fn(this.stack[index], this.stack[(index - 1 >> 1)]) ) {
			this.switchPlace(index , index = (index - 1 >> 1));
		}
	},
	// sift the first node (0) down
	siftdown: function (){
		var index = 0,
			childIndex1, childIndex2,
			child1, child2,
			candidate;
		while (true){
			childIndex1 = (index << 1) + 1,
			childIndex2 = childIndex1 + 1,
			child1 = this.stack[childIndex1],
			child2 = this.stack[childIndex2],
			candidate = 0;
			//find the target to switch in one of its children;
			if (child2 && this.fn(child2, child1) && this.fn(child2, this.stack[index])){
				candidate = childIndex2;
			} else if (child1 && this.fn(child1, this.stack[index])){
				candidate = childIndex1;
			}
			//do the switch and continue(recusive) sifting
			if (candidate){
				this.switchPlace(candidate, index);
				index = candidate;
				continue;
			}
			//done
			return false;
		}
	},
	switchPlace: function (i, j) {
		var temp = this.stack[i];
		this.stack[i] = this.stack[j];
		this.stack[j] = temp;
	},
	// a default compare function
	defaultfn: function (a, b){
		return a < b;
	}
};

//try out
var a = [5,2,9,7,8,1,3,6,4];
var bh = new BinaryHeap();
a.forEach(function (i){
	bh.push(i);
})
console.log(bh.stack);
bh.pop()
console.log(bh.stack);


var c = [{id: 4},{id: 6},{id: 2},{id: 1},{id: 3},{id: 9},{id: 5},{id: 8},{id: 0}];

var bh2 = new BinaryHeap(function(a, b){return(a.id < b.id);});
c.forEach(function (e,i,a){
	bh2.push(a[i]);
});
console.log(bh2.stack);
bh2.pop()
console.log(bh2.stack);
