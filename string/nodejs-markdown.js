/**
 * a markdown parser
 * used in my local server
 * return a fully rendered html page(string)
 */

;(function() {
var preHTML = '<html><head>\
				<style>\
					.article {\
						max-width:800px;\
						margin:auto;\
						padding:1em;\
						font-family:arial;\
					}\
					.article h1, .article h2{\
						padding-bottom:3px;\
						border-bottom:1px solid #ddd;\
					}\
					.article p{\
						line-height: 1.6;\
					}\
					.article pre{\
						background-color:#e6e6fa;\
						padding:1em;\
						tab-size:4;\
					}\
\
					.article p>code{\
						border-radius:3px;\
						background-color:#fae6e6;\
						padding:0.2em 5px\
					}\
					.article pre p {\
						margin:0;\
						display:inline;\
					}				\
					.article blockquote {\
					  background: #e6fae6;\
					  border-left: 10px solid #ccc;\
					  margin: 1.5em 10px;\
					  padding: 0.5em 10px;\
					  quotes: "\201C""\201D""\2018""\2019";\
					}\
				\</style>\
				<link rel="stylesheet" href="http://localhost:8000/Code/lib/highlightjs/default.css">\
				<script src="http://localhost:8000/Code/lib/highlightjs/highlight.pack.js"></script>\
				<script>hljs.initHighlightingOnLoad();</script>\
				\<body>';

/*
	a syntax  builder
*/

var syntax = [
//escape
	{	regex: /</g,
		sub: '&lt;'
	},
//block
	//heading
	{	regex: /^(#{1,6})(.*)$/gm,
		sub: function (m,p1,p2) {
			return "<h" + p1.length + ">" + p2 + "</h" + p1.length + ">";
		}
	},
	//blockquote
	{	regex: /^(>.*\n)+/gm,
		sub: function (m) {
			return '<blockquote>\n' + m.replace(/^>/gm, '') + '</blockquote>\n'
		}
	},
	//list
	{	regex:/^1\./gm,
		sub: '<ol><li>\n'
	},
	{
		regex: /^(\d{1,2}\.)/gm,
		sub: "</li><li>\n"
	},

	{	regex:/\?listend$/gm,
		sub: '</li></ol>'
	},
	//code block
	{	regex: /^```(\w+)\n/gm,
		sub: function(m,p){
			return "<pre><code>";
		}
	},
	//code block 
	{	regex: /^```$/gm,
		sub: "</code></pre>"
	},
//after block
	//adding a <p> tag to every line without a tag
	{
		regex: /^[^<].+$/gm,
		sub: function (m) {
			return "<p>" + m + "</p>";
		}
	},
//before inline
//inline
	//italicBold
	{	regex: /\*\*\*([^\*]+)\*\*\*/g,
		sub: function (m,p) {
			return "<i><b>" + p + "</b></i>";
		}
	},
	//bold:
	{	regex: /\*\*([^\*]+)\*\*/g,
		sub: function (m,p) {
			return "<b>" + p + "</b>";
		}
	},
	//italic
	{	regex: /\*([^\*]+)\*/g,
		sub: function (m,p) {
			return "<i>" + p + "</i>";
		}
	},
	//code
	{	regex: /`([^`]+)`/g,
		sub: function (m,p) {
			return "<code>" + p + "</code>";
		}
	}
	
];

function md(text){
	//prepare the raw text
	var text = text.toString()
				.replace(/^\s*/,'')
				.replace(/\s*$/,'')
				.replace(/\r\n/g,'\n')
				.replace(/\n+/g,'\n')
		;//		.split('\n');
	//bootstap the end of some multiline block
	var stack = text.split('\n');
	findIndexs(stack,function (t) {
		return /^1\./gm.test(t);
	}).forEach(function(i){
		var l = findIndex(stack,[i],function(t){
			return /^[^\s\d]/.test(t);
		})
		stack[l-1] = stack[l-1] + '?listend'
	})
	
	text = stack.join("\n");
	
	syntax.forEach(function (syn) {
		text = text.replace(syn.regex, syn.sub)
	});

	text = "<div class='article'>" + text + "</div>"
	return preHTML + text;
}

//utilities
//find the index of certain element in an array
function findIndexs(a, fn) {
	var i = 0,len = a.length,result = [];
	for (i; i < len; i++) {
		if (fn(a[i]))
			result.push(i);
	}
	return result;
}
function findIndex(a, range,fn) {
	if (typeof range == 'function'){
		fn = range;
		range = [0];
	}
	var i = range[0],len = range[1] || a.length;
	for (i; i < len; i++) {
		if (fn(a[i]))
			return i;
	}
}
if (typeof exports === 'object') {
  module.exports = md;
} 

})();
