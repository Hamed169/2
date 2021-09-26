ACC.autocomplete = {

	bindAll: function ()
	{
		this.bindSearchAutocomplete();
	},

	bindSearchAutocomplete: function ()
	{
		var $search = $("#search");
		var option  = $search.data("options");
		var cache   = {};

		if (option)
		{
            $search.autocomplete({
            	highlightClass: "bold-text",
                minLength: option.minCharactersBeforeRequest,
                delay:     option.waitTimeBeforeRequest,
                appendTo:  ".siteSearch",
                
                source:    function(request, response) {

                    var term = request.term.toLowerCase();

                    if (term in cache) {
                        return response(cache[term]);
                    }

                    $.getJSON(option.autocompleteUrl, {term: request.term}, function(data) {
                    	
                        var autoSearchData = [];
                        if(data.suggestions != null){
                            $.each(data.suggestions, function (i, obj)
                            {
                                autoSearchData.push(
                                        {value: obj.term,
                                            url: ACC.config.contextPath + "/search?text=" + obj.term,
                                            type: "autoSuggestion"});
                            });
                        }
                        var flag=0;
                        if(data.categories != null){
                        	
                        	$.each(data.categories, function (i, obj){                    
	                        		autoSearchData.push(
	                                        {
	                                        	value: obj.hierarchyName,
	                                            code: obj.hierarchyName,
	                                            //desc: obj.description,
	                                           // manufacturer: obj.manufacturer,
	                                            url: ACC.config.contextPath + obj.url,
	                                           // price: obj.price.formattedValue,
	                                            type: "categoryResult",
	                                           // image: obj.images[0].url
	                                            });	                        	
                             });
                        }
                        if(data.products != null){
                        	flag=1;
                        	$.each(data.products, function (i, obj){
                        		
                        		autoSearchData.push(
                                        {value: obj.code+" "+obj.name,
                                            code: obj.name,
                                            //desc: obj.description,
                                           // manufacturer: obj.manufacturer,
                                            url: ACC.config.contextPath + obj.url,
                                           // price: obj.price.formattedValue,
                                            type: "productResult",
                                           // image: obj.images[0].url
                                            });
                             });
                        		
                          /*  $.each(data.products, function (i, obj)
                            {
                            	if((obj.name.toLowerCase()).includes(term))
                            	{
                            		flag=1;
                            		autoSearchData.push(
                                        {value: obj.name,
                                            code: obj.code,
                                            //desc: obj.description,
                                           // manufacturer: obj.manufacturer,
                                            url: ACC.config.contextPath + obj.url,
                                           // price: obj.price.formattedValue,
                                            type: "productResult",
                                           // image: obj.images[0].url
                                            });
                            	}
                            	
                            	if((obj.code.toLowerCase()).includes(term))
                                {
                                flag=1;
                                autoSearchData.push(
                                           {value: obj.code,
                                               code: obj.name,
                                               //desc: obj.description,
                                              // manufacturer: obj.manufacturer,
                                               url: ACC.config.contextPath + obj.url,
                                              // price: obj.price.formattedValue,
                                               type: "productResult",
                                              // image: obj.images[0].url
                                               });
                                }
                            	});*/
                            /*if(flag == 1){
                            autoSearchData.push(
                            		{
                            		value:"View All",	
                            		url: ACC.config.contextPath + "/search?text=" + term,	
                            		});
                            }*/
                        }
                        cache[term] = autoSearchData;
                        return response(autoSearchData);
                    });
                },
                //Fix for BUG 90193
                focus: function (event, ui)
                {
                	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                		$(".ui-menu").hide();
                		window.location.href = ui.item.url;
                    }
                },
                select: function (event, ui)
                {
                    window.location.href = ui.item.url;
                }
              });
		}
	}
};

$(document).ready(function ()
{
	PatchAutocomplete();
	ACC.autocomplete.bindAll();
});


function PatchAutocomplete() {

    // Don't really need to save the old fn, 
    // but I could chain if I wanted to
    var oldFn = $.ui.autocomplete.prototype._renderItem;

    $.ui.autocomplete.prototype._renderItem = function( ul, item) {
    	
    	//var re = new RegExp("^" + this.term + "", "i") ; - To start with
        //var t = item.label.replace(re,"<span class='bold-text'>" + this.term + "</span>");

        var t=item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"),function(match) { return "<span class='bold-text'>" + match + "</span>" });
        var className = item.isQuickOrder ? 'menu-item' : '';
        var listClassName = '';
        if (item.type) {
    		if (item.type == 'categoryResult') {
    			listClassName = 'category-result';
    		} else if (item.type == 'productResult') {
    			listClassName = 'product-result';
    		}
        }

        return $( "<li class="+ listClassName +"></li>" )
            .data( "item.autocomplete", item )
            .append( "<a class="+ className +">" + t + "</a>" )
            .appendTo( ul );
    };
}