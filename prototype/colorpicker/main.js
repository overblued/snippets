(function () {
function ColorPicker(){
	var that = this;
	that.palette.addCircle($("#palette>span:first-of-type"));
	that.palette.addPalette($("#palette"));
	that.bar.addArrow($("#spectrum>#indicator"));

	that.set({r: 1, b: 0, g: 0});
	//event
	var doc = $("body");
	//this function detect if the mousebutton is released
	function which(btn){
		if (btn == 0){
			doc.off(".pick");
			return true;
		}
		return false;
	}
	doc.on("mousedown","#rainbow",function(event){
		event.preventDefault();
		var stop = event.pageX,
			h = event.offsetX;
		function pick_bar(e){
			if (which(e.which)){
				return false;
			}
			var offset = e.pageX - stop;
			that.set({h:offset + h});
		}
		doc.on("mousemove.pick",pick_bar);
		pick_bar(event);
	})
	.on('mousedown','#palette',function(event){
		event.preventDefault();
		var stopX = event.pageX,
			stopY = event.pageY,
			x = event.offsetX,
			y = event.offsetY;
		if (event.target.tagName != "DIV"){
			return false;
		}
		function pick_palette(e){
			if (which(e.which)){
				return false
			}
			var offsetX = e.pageX - stopX + x,
				offsetY = e.pageY - stopY + y;
			that.set({x: offsetX, y:offsetY});
		}
		doc.on("mousemove.pick",pick_palette);
		pick_palette(event);
	})
	.on('change','#rgb',function(){
		
		var value = that.parseRGBColor($(this).val());
		if (value){
			that.set(value);
		}
	});

}
ColorPicker.prototype = {
	//set the hue bar and palette base on provided arguments
	set: function(obj){
		//this changes 's' and 'v' value
		if (obj.x != undefined){
			obj.x = intVal(obj.x,0,200);
			obj.y = intVal(obj.y,0,200);
			this.palette.poke(obj);
		}
		
		if (obj.r != undefined){
			$.extend(obj,rgbtohsv(obj.r, obj.g, obj.b));
		}
		if (obj.s != undefined){
			this.palette.ajust(obj);
		}
		if (obj.h != undefined){
			obj.h = intVal(obj.h,0,359);
			this.bar.ajust(obj)
			this.palette.ajust(obj);
		}
		//console.log(obj)
	}
	,input:{
		addInput: function(e){
			this._input = e;
		}
	}
	,bar: {
		addArrow: function(e){
			this._arrow = e;
		}	
		,ajust: function(hsv){
			this._arrow.css('left',hsv.h-3);
		}
	}
	,palette: {
		addCircle: function(e){
			this._circle = e;
			this._circleRadius = Math.floor(this._circle.width()/2);
		}
		,addPalette: function(e){
			this._palette = e;
		}
		,poke: function(pos){
			var	x = intVal(pos.x,0,200),
				y = intVal(pos.y,0,200);
			
			this._circle
			.css({	left: x - this._circleRadius,
					top: y - this._circleRadius});
		}
		,ajust: function(hsv){
			if (hsv.h != undefined){
				this._palette.css('backgroundColor',"hsl(" + hsv.h + ",100%,50%)");
			}
			if (hsv.s != undefined){
				this._circle.css({left: hsv.s * 2 - this._circleRadius});
			}
			if (hsv.v != undefined){
				this._circle.css({top: 200 - hsv.v * 2 - this._circleRadius});
			}
		}
	}
	,data: {
		rgb: {r:0, b:0, g:0}
		,hsv: {h:0, s:0, v:0}
	}
	,parseRGBColor: function(str){
		var temp,
			base = 16,
			divisor = 255;
		//remove unwanted parts
		str = str.replace(/^(rgb)[#\s\(\)]/ig,'');

		//hex
		if (/^[\da-f]{3,6}$/i.test(str)){
			if (str.length == 3){
				divisor = 15;
				temp = str.split('');
			} else if (str.length == 6){
				temp = str.match(/[\da-f]{2}/gi);
			} else {
				return false;
			}
		} else if (/^\d{1,3},\d{1,3},\d{1,3}$/.test(str)){
			base = 10;
			temp = str.split(',');
		} else {
			return false;
		}
		$.each(temp, function(i,val){
			temp[i] = parseInt(val, base) / divisor;
		})
		//3 float number within [0,1]
		return {r: temp[0], g: temp[1], b: temp[2]}
	}

};
//helper
function intVal(n,l,h){
	return Math.min(Math.max(n,l),h);
}
function rgbtohsv(r,g,b){
	var min = Math.min(r,g,b),
		max = Math.max(r,g,b), 
		add = max + min,
		sub = max - min,
		h, s, v;
	if (max == 0){
		return {s: 0, v: 0}
	}
	v = Math.round(100 * max);
	if (max == min) {
		return {s: 0, v: v};
	} 
	s = Math.round(100 * sub / max);
	//h
	if (r == max){
		h = (g - b) / sub;
	} else if (g == max){
		h = 2 + (b - r) / sub;
	} else {
		h = 4 + (r - g) / sub;
	}
	h = Math.round(h * 60)
	if (h < 0){
		h += 360;
	}
	return {h: h,s: s,v: v}
}
function rgbtohsl(r,g,b){
	var min = Math.min(r,g,b),
		max = Math.max(r,g,b), 
		add = max + min,
		sub = max - min,
		h, s, l;
	//l
	l = add / 2;
	//s
	if (min == max){
		s = 0
	} else {
		if (l < 0.5){
			s = sub / add
		} else {
			s = sub / (2 - add)
		}
	}
	//h
	if (r == max){
		h = (g - b) / sub;
	} else if (g == max){
		h = 2 + (b - r) / sub;
	} else {
		h = 4 + (r - g) / sub;
	}
	h = Math.round(h * 60)
	
	return {h: h,s: s,l: l}
}
function hsltorgb(h,s,l){
	var r,g,b;
	if (!s){
		r = Math.round(l * 255);
		return [r,r,r];
	}
	if (l < 0.5){
		temp = l * (1 + s);
	} else {
		temp = l + s - l * s;
	}
	
	temp2 = 2 * l - temp;
	
	r = h + 0.333;
	if (r > 1){
		r -= 1;
	}
	g = h;
	b = h - 0.333;
	if (b < 1){
		b += 1;
	}
	return []
}
//http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/

$(function(){
	var app = new ColorPicker();
});
})();