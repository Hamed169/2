ACC.track = {
	trackProductClick: function (productData)
		{
			window.mediator.publish('trackProductClick',{
				productData: productData
			});
		},
	trackAddToCart: function (productData)
	{
		window.mediator.publish('trackAddToCart',{
			productData: productData
		});
	},
	trackRemoveFromCart: function(entryData)
	{
		window.mediator.publish('trackRemoveFromCart',{
			entryData: entryData
		});
	},
	
	trackProceedToCheckout: function(cartData)
	{
		window.mediator.publish('trackProceedToCheckout',{
			cartData: cartData
		});
	},
	
	trackCheckoutPayment: function()
	{
		window.mediator.publish('trackCheckoutPayment',{
		});
	},
	trackCheckoutReview: function(cartData)
	{
		window.mediator.publish('trackCheckoutReview',{
			cartData: cartData
		});
	},
	
	trackNotification:function(notificationData)
	{
		window.mediator.publish('trackNotification',{
			notificationData: notificationData
		});
	},	
	
	trackListPage: function (listData)
	{	
		window.mediator.publish('trackListPage',{
			listData: listData
		});
	},
	
	trackListPageTotal: function (list_num)
	{	
		window.mediator.publish('trackListPageTotal',{
			list_num: list_num
		});
	},
	
	trackSaveList: function (productSku)
	{	
		window.mediator.publish('trackSaveList',{
			productSku: productSku
		});
	}
};


