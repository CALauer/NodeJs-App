

$('document').ready(function() {
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
        displayedPrice = $('#price').html()
    
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
    // if ( dirName == "/stocks" ) {
    //     getPrices()
    //     setInterval(getPrices,2000);
    //         }
    //     else {
    //         return;
    //     }
if(window.location.pathname == "/feed") {

    $.ajax({
        url: '/feed',
        method: 'POST',
        }).done(function(res) {
            myContent = document.getElementById('public_blog_posts');
            myContent.innerHTML = "";
            if (res.success) {
                data = res.data;
            for (var i = 0; i < data.length; i++) {
                myContent.innerHTML += '<div class="blog-content">' + '<ul><li><h4>' + data[i].title + '</h4></li><li>UserName</li><li>Date: ' + data[i].date + '</li></ul><div class="blog-body">' + data[i].post + '</div></div></div>';
                
                } 
            } else {
                status = res.failed
                myContent.innerHTML += status
            }
        })
    }


});    

$('#myAccount-dropdown-link').click('click', function() {
    let x = $('.account-drop-down-menu');
    if (x.data('clicked', true) ) {
        x.fadeToggle(200).delay( 100 ).css({display: 'grid', top: 40, alignContent: 'flex-start'});
        }
    });


    $('#user-post').on('click', '#submit-post', function(event) {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let hour = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        event.preventDefault();
        let title = $('#title').val();
        let postDate = year + "/" + month + "/" + day + "|" + hour + ":" + minutes;

        console.log(postDate)
        let post = $('#post-body').html();
        let privacy = $('input[name=privacy_level]:checked', '#user-post').val()
        $.ajax({
            url: '/post-user-blog',
            method: 'POST',
            data: { title: title, post: post, privacy_level: privacy, date: postDate }
            }).done(function(res) {
                if (res.success) {
                alert("Your post was successfully submitted.")
            } else {
                console.log('error...ajax');
                }
            })
    });
$('a').on('click', function() {
    var accountOverview =  $('.account-overview')
    var accountWritePost = $('.account-write-post')
    var accountPosts = $('.account-posts')
    if(this.id == "post_write") {
        accountWritePost.fadeIn().css("display", "grid")
        accountPosts.css("display", "none")
        accountOverview.css("display", "none")
    } else if (this.id == "my_posts") {
       
        $.ajax({
            url: '/my-blog-posts',
            method: 'POST',
            }).done(function(res) {
                if (res.success) {
                    data = res.data;
                    myContent = document.getElementById('my_blog_posts');
                    myContent.innerHTML = "";

                for (var i = 0; i < data.length; i++) {
                    myContent.innerHTML += '<div class="blog-content">' + '<ul><li><h4>' + data[i].title + '</h4></li><li>UserName</li><li>Date: ' + data[i].date + '</li></ul><div class="blog-body">' + data[i].post + '</div></div></div>';
                       
                } 
                
                accountPosts.fadeIn().css("display", "grid")
                accountWritePost.css("display", "none")
                accountOverview.css("display", "none")
            } else {
                myContent.innerHTML = '<div class="blog-content">You have no posts yet....post something.</p>'
                }
            })
    }
    else if (this.id == "account_overview") {
        accountOverview.fadeIn().css("display", "grid")
        accountWritePost.css("display", "none")
        accountPosts.css("display", "none")
    }
    else if(this.id == "feed") {

        } 
        else {
        }
    }) 
function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function registerUser() { 
    let userName = $('#username').val();
    let userEmail = $('#email').val();
    let userPassword = $('#password').val();
    let userConfirmedPassword = $('#confirm_password').val();
    let alertBox = document.getElementById('alertMsg')
    let alertMsg = ""
    let userRegData = {
        username: userName,
        email: userEmail, 
        password: userPassword,
        confirmedPassword: userConfirmedPassword }
        console.log(userRegData)
    if(!userName  || !userPassword || !userConfirmedPassword ||!userEmail) {
        alertMsg = "Please fill out all fields."
        alertBox.innerHTML = alertMsg
    } else if(userPassword != userConfirmedPassword) {
            alertMsg = "Passwords do not match";
            alertBox.innerHTML = alertMsg
            console.log(alertMsg)
    } else if(ValidateEmail(userEmail) == false){
        alertMsg = "You entered and invalid email";
        alertBox.innerHTML = alertMsg
        console.log(alertMsg)
    } else if (userPassword.length < 7) {
        alertMsg = "Your password must be at least 7 characters";
        alertBox.innerHTML = alertMsg
        console.log(alertMsg)
    } else {
console.log(userRegData)
        jQuery.ajax({
        url: '/register',
        contentType: "application/json; charset=utf-8",
        type: "POST",
        dataType: "JSON",
        data:  JSON.stringify(userRegData),
        success: function(res) {
        if (res.success == true) {
            alertMsg = "Your account has been created. Please login.";
            alertBox.innerHTML = alertMsg
            console.log(res)
        } else if (res.failed){
            alertMsg = res.failed;
            alertBox.innerHTML = alertMsg
                }
            }
        })
    }
}



