;
!function($) {

    // Readied
    $(function() {
        var loginForPricing = "<a class='LACKS_AUTHENTICATION' href='#'>Sign in to view pricing</a>",
            permissionsErrorUrl = "/upsell";

        //always do ATP check on PLP even if unauthenticated
        if (typeof Lennox != "undefined") {
            Lennox.loadAvailabilityData();
            Lennox.loadAccAvailabilityData("#acc-avail-");
        }


        if (window.auth) {

            if (window.cvyp) {
                Lennox.loadPriceData("#price-box-");
                Lennox.loadACCPriceData("#acc-price-box-");
                Lennox.loadCdqPriceData();
            } else {
                $(".price-box .loader-wrap").hide();
                $(".acc-price-box .loader-wrap").hide();
            }

            $(document.body).on('click', '.LACKS_PERMISSIONS' ,function(e){
                e.preventDefault();
                window.location = permissionsErrorUrl;
            });

			//Make sure to set user entered values (like delivery method, quantity etc) after login is successfull
            setTimeout(function(){
            	Lennox.addToCartAfterLogin();
            });

        } else {

            $(".LACKS_AUTHENTICATION").off("click");
            $('.add-to-box .add-to-cart').off('click','button[type="submit"]');
            $(document).off('click','#add-to-cart-success button.add-to-cart'); 
            $('.add_to_cart_form').off('click','button.add-to-cart');
            $('.slider').off('click','button.add-to-cart');
            $('.v2-product-carousel').off('click','button.add-to-cart');
            $("p.price").html(loginForPricing);
            $(".OT-ProductAcc__Price").html(loginForPricing);
            $(".item").find(".loader-wrap, .ship-to-wrapper, .pickup-wrapper").hide();
            $(document.body).on('click', '.LACKS_AUTHENTICATION' ,function(e){
                e.preventDefault();
                Lennox.cacheAddToCartValues(e.target);
                $("#login-modal").Moby("show");
            });
        }
    });
}(window.jQuery);


