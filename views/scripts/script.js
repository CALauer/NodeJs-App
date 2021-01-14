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

    $('#user-post').on('click', '#submit-post', function(event) {
        event.preventDefault();
        const title = $('#title').val();
        const post = $('#post-body').val();
        const privacy = $('input[name=privacy_level]:checked', '#user-post').val()
        console.log(privacy)
console.log(title)
        $.ajax({
            url: '/post-user-blog',
            method: 'POST',
            data: { title: title, post: post, privacy_level: privacy }
            }).done(function(res) {
                if (res.success) {
                alert("Your post was successfully submitted.")
            } else {
                console.log('error...ajax');
                }
            })
    });
// RICH TEXT FORMATTER
$('a').on('click', function() {
    var accountOverview =  $('.account-overview')
    var accountWritePost = $('.account-write-post')
    var accountPosts = $('.account-posts')
    console.log(this.id)
    if(this.id == "post_write") {
        accountWritePost.fadeIn().css("display", "grid")
        accountPosts.css("display", "none")
        accountOverview.css("display", "none")
    } else if (this.id == "my_posts") {
        accountPosts.fadeIn().css("display", "grid")
        accountWritePost.css("display", "none")
        accountOverview.css("display", "none")
    }
    else if (this.id == "account_overview") {
        accountOverview.fadeIn().css("display", "grid")
        accountWritePost.css("display", "none")
        accountPosts.css("display", "none")
    }
    else {
        return
    }
}) 

//   $("#my_posts").click(function(){
//     $(".account-overview").toggle();
//     $(".account-write-post").toggle();
//     $(".account-write-post").toggle();
//   });