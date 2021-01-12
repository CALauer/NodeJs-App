$( document ).ready(function() {
    var dirName =  window.location.pathname;
    function fetchJSON() {
        $.getJSON( "/stocks/AMD", function( json ) {
            price = json.price
            stockSymbol = json.name
            $('#details').html("Symbol: " + stockSymbol + "<br />Price:")  
            $('#price').html(price)    
        })
    }
    function getPrices() {
        console.log($('#price').html())
        displayedPrice = $('#price').html()
        console.log(displayedPrice)
    
        if (displayedPrice.length < 1) {
            fetchJSON();
        } else {
            $.getJSON( "/stocks/AMD", function( json ) {
                price = json.price
                stockSymbol = json.name
                  
                $({ countNum: $('#price').html() }).animate({ countNum: price }, {
                    duration: 1000,
                    easing: 'linear',
                    step: function () {
                    $('#price').html((Math.round((this.countNum + Number.EPSILON) * 100) / 100));
                    }
                });
            })
        }
    }     
    if ( dirName == "/stocks" ) {
        getPrices()
        setInterval(getPrices,2000);
            }
        else {
            return;
        }
});    

$('#myAccount-dropdown-link').click('click', function() {
    console.log("Clicked")
    let x = $('.account-drop-down-menu');
    if (x.data('clicked', true) ) {
        x.fadeToggle(200).delay( 100 ).css({display: 'grid', top: 40, alignContent: 'flex-start'});
        }
    });

        



console.log("working")

