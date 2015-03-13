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
					.article pre>code{\
						background-color:#e6e6fa;\
						padding:1em;\
						tab-size:4;\
					}\
\
					.article code{\
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
				<link href="http://cdn.bootcss.com/highlight.js/8.4/styles/default.min.css" rel="stylesheet">\
				<script src="http://cdn.bootcss.com/highlight.js/8.4/highlight.min.js"></script>\
				<script>hljs.initHighlightingOnLoad();</script>\
				\<body>';

/*
	a syntax  builder
*/

var syntax = [
//linebreak
	{	regex: /  \n/g,
		sub: '<br />'
	},
//block
	//heading
	{	regex: /^(.+\n)={4,}\n/gm,
		sub: '#$1\n'
	},
	{	regex: /^(.+\n)\-{4,}\n/gm,
		sub: '##$1\n'
	},
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
	//unordered list
	{	//regex: /^/gm,
	
	},
	// ordered list
	{	regex:/^\s*1\..*\n(?:[\d\s].*\n)+/gm,
		sub: function (m) {
			return '<ol><li>\n' + m.replace(/^\s*1\./,'').replace(/^\s*(\d{1,2}\.)/gm, '</li><li>\n') + '</li></ol>'
		}
	},
	//code block
	{	regex: /```\w+\n([\s\S]+?)```/g,
		sub: function(m,p){
		  p = p.replace(/&/g,'&amp')
					.replace(/</g,'&lt;')
					.replace(/>/g,'&gt;');
			return "<pre><code>" + p + "</code></pre>";
		}
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
	{	regex: /\*\*\*(.+?)\*\*\*/g,
		sub: function (m,p) {
			return "<i><b>" + p + "</b></i>";
		}
	},
	//bold:
	{	regex: /\*\*(.+?)\*\*/g,
		sub: function (m,p) {
			return "<b>" + p + "</b>";
		}
	},
	//italic
	{	regex: /\*(.+?)\*/g,
		sub: function (m,p) {
			return "<i>" + p + "</i>";
		}
	},
	//strikethrough
	{	regex: /~~(.+?)~~/g,
		sub: function (m,p) {
			return "<s>" + p + "</s>";
		}
	},
	//code
	{	regex: /`(.+?)`/g,
		sub: function (m,p) {
			return "<code>" + p + "</code>";
		}
	},
	//url
	{	regex: /\[([^\]]+)\]\((https?:\/\/[\/\-\w@&:%.\+~#=?]{2,256})\)/ig,
		sub: '<a rel="nofollow" href="$2">$1</a>'
	}
	
];

function md(text){
	//prepare the raw text
	var text = text.toString()
				.replace(/^\s*/,'')
				.replace(/\s*$/,'')
				.replace(/\r\n/g,'\n')
				.replace(/\r/g,'\n')
				.replace(/\n{2,}/g,'\n')
		;//		.split('\n');

	
	syntax.forEach(function (syn) {
		text = text.replace(syn.regex, syn.sub)
	});

	text = "<div class='article'>" + text + "</div>"
	return preHTML + text;
}


if (typeof exports === 'object') {
  module.exports = md;
} 

})();
