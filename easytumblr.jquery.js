(function($) {
	/*
		jquery.tumblr.js v0.1
		Last updated: 10 June 2011

		Created by Jon Kirkman - Versus The Moon
	*/

	$.fn.getTumblr = function(options) 
	{

		$.fn.getTumblr.defaults = {
			userName: null,
			numPosts: 5,
			titleElement: 'h3',
			bodyElement: 'p',
			bodyLimit: 20,
			slideDuration: 750,
		};
		var o = $.extend({}, $.fn.getTwitter.defaults, options);

		function _truncate (text, limit, append) 
		{
		    if (typeof text !== 'string')
		        return '';

		    if (typeof append == 'undefined')
		        append = '...';

		    var parts = text.split(' ');

		    if (parts.length > limit) 
		    {
		        // loop backward through the string
		        for (var i = parts.length - 1; i > -1; --i) 
		        {
		            // if i is over limit, drop this word from the array
		            if (i+1 > limit)
		                parts.length = i;

		        }
		        // add the truncate append text
		        parts.push(append);
		    }
		    // join the array back into a string
		    return parts.join(' ');
		}

		return this.each(function()
		{
			var container = $(this);
			$.getJSON( 'http://'+o.userName+'.tumblr.com/api/read/json?num='+o.numPosts+'&filter=text&callback=?', function(tumblr){

				container.append('<ul style="display:none;"></ul>');

				$(tumblr.posts).each(function()
				{
					var title = (typeof(this['regular-title']) != 'undefined' && typeof(this['url-with-slug']) != 'undefined')? '<'+o.titleElement+'><a href="'+this['url-with-slug']+'">'+this['regular-title']+'</a></'+o.titleElement+'>' : '';
					var body = (typeof(this['regular-body']) != 'undefined')? '<'+o.bodyElement+'>'+truncate(this['regular-body'], o.bodyLimit)+'</'+o.bodyElement+'>' : '';
					container.children('ul').append('<li>'+title+body+'</li>');
				});
				container.children('ul').slideDown(o.slideDuration);
			});
		});
	}

})(jQuery);