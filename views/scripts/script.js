

$('document').ready(function() {
    var dirName =  window.location.pathname;
    // function fetchJSON() {
    //     $.getJSON( "/stocks/AMD", function( json ) {
    //         price = json.price
    //         stockSymbol = json.name
    //         $('#details').html("Symbol: " + stockSymbol + "<br />Price:")  
    //         $('#price').html(price)    
    //     })
    // }
    // function getPrices() {
    //     displayedPrice = $('#price').html()
    
    //     if (displayedPrice.length < 1) {
    //         fetchJSON();
    //     } else {
    //         $.getJSON( "/stocks/AMD", function( json ) {
    //             price = json.price
    //             stockSymbol = json.name
                  
    //             $({ countNum: $('#price').html() }).animate({ countNum: price }, {
    //                 duration: 1000,
    //                 easing: 'linear',
    //                 step: function () {
    //                 $('#price').html((Math.round((this.countNum + Number.EPSILON) * 100) / 100));
    //                 }
    //             });
    //         })
    //     }
    // }     
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
                myContent.innerHTML += '<div class="blog-content">' + '<ul><li><h4>' + data[i].title + '</h4></li><li class="username"><a href="/profileView/'+ data[i].username +'" id="'+ data[i].blogId +'">' + data[i].username + '</a></li><li class="date">' + data[i].date + '</li></ul><div class="blog-body">' + data[i].post + '</div><div id="'+ data[i].blogId +'" class="blog_actions">' +
                '<ul class="blog_action_buttons_ul"><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Edit</a></li><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Remove</a></li><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'"><img src="../images/SVG/SVG/snile.svg" class="upvote_icon" alt="test"/></a></li><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Dislike</a></li></ul>'
                } 
            } else {
                status = res.failed
                myContent.innerHTML += status
            }
        })
    }

});    
let accountOverview =  $('.account-overview')
let accountWritePost = $('.account-write-post')
let accountPosts = $('.account-posts')
alertBox = $('#alert_box')
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
        minutes = dateObj.getMinutes()
        minutes = checkTime(minutes)
        event.preventDefault();
        let title = $('#title').val();
        let postDate = year + "/" + month + "/" + day + " " + hour + ":" + minutes;

        console.log(postDate)
        let post = $('#post-body').html();
        let privacy = $('input[name=privacy_level]:checked', '#user-post').val()
$.ajax({
    url: '/post-user-blog',
    method: 'POST',
    data: { title: title, post: post, privacy_level: privacy, date: postDate }
    }).done(function(res) {
        if (res.success) {
            displayUserPost()
        }
    });
})

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
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
function dashboardLinkHandle(id) {
    let linkId = id
    if(linkId == "post_write") {
        accountWritePost.fadeIn().css("display", "grid")
        accountPosts.css("display", "none")
        accountOverview.css("display", "none")
    } else if(linkId == "my_posts") {
        displayUserPost()
    } else if(linkId == "account_overview") {
        accountOverview.fadeIn().css("display", "grid")
        accountWritePost.css("display", "none")
        accountPosts.css("display", "none")
    }
}
function displayUserPost() {
    $.ajax({
        url: '/my-blog-posts',
        method: 'POST',
        }).done(function(res) {
            myContent = document.getElementById('my_blog_posts');
            myContent.innerHTML = "";
            if (res.success) {
                data = res.data;

            for (var i = 0; i < data.length; i++) {
                myContent.innerHTML += '<div class="blog-content">' + '<ul><li><h4>' + data[i].title + '</h4></li><li class="username"><a href="/profileView/'+ data[i].username +'" id="'+ data[i].blogId +'">' + data[i].username + '</a></li><li class="date">' + data[i].date + '</li></ul><div class="blog-body">' + data[i].post + '</div><div id="'+ data[i].blogId +'" class="blog_actions">' +
                '<ul class="blog_action_buttons_ul"><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Edit</a></li><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Remove</a></li><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Like</a></li><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Dislike</a></li></ul>'
            } 
            accountPosts.fadeIn().css("display", "grid")
            accountWritePost.css("display", "none")
            accountOverview.css("display", "none")
        } else {
            alertMsg = res.failed
            console.log(res.failed)
            alertBox.html(alertMsg).fadeIn().fadeOut(2000)
            myContent.innerHTML = '<div class="blog-content">You have no posts yet....post something.</p>'
            }
        })
}
$('document').ready(function() {
    if(window.location.pathname == "/profileView/:username") 
    console.log("Profile View") 
})

function renderUserManager() {
    content = document.getElementById('memberlist')
    content.innerHTML = "<tr><th>ID</th><th>Username</th></tr>"
    $.ajax({
        url: '/admin/membersList',
        method: 'GET',
        }).done(function(res) {
            console.log(res)
            if (res.success) {
                data = res.results
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i])
                        content.innerHTML += '<tr><td>'+ data[i].id +'</td><td>'+data[i].username+'</td><td>' +
                        '<a href="javascript:void(0)" id="'+data[i].id+'" data="'+data[i].username+'" class="user-management">Delete User</a></td></tr>'
                }
            } else {
                console.log("Request Failed")
            }
        })
    }
    $(document).on('click', '.user-management',function(){
        userId = $(this).attr('id');
        userName = $(this).attr('data');
        console.log(userName)
        alertBox.html(
            "<div>Are you sure you want to delete: <span class='orange'>"+ userName +"</div>" +
            "<div><button class='confirm-delete' id='confirm-delete' onclick='deleteUser(\""+userName+"\")'>Delete User</button><button  type='button' id='cancel-delete' class='cancel-delete' onclick='cancelAction()'>Cancel</button></div>"
            );
        alertBox.fadeIn();
    });
  
function deleteUser(username) {
    console.log(username)
    $.ajax({
        url: '/admin/deleteuser/'+username,
        method: 'POST',
        }).done(function(res) {
            if (res.success) {
                alertBox.html(username + "User has been deleted")
                setTimeout(function() {
                    alertBox.fadeOut()
                }, 1500)
            }
        })

    return
}
function cancelAction() {
    setInterval(alertBox.fadeOut(), 2000)
    console.log("cancelled")
}

        // for (var i = 0; i < data.length; i++) {
        //     myContent.innerHTML += '<div class="blog-content">' + '<ul><li><h4>' + data[i].title + '</h4></li><li class="username"><a href="/profileView/'+ data[i].username +'" id="'+ data[i].blogId +'">' + data[i].username + '</a></li><li class="date">' + data[i].date + '</li></ul><div class="blog-body">' + data[i].post + '</div><div id="'+ data[i].blogId +'" class="blog_actions">' +
        //     '<ul class="blog_action_buttons_ul"><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Edit</a></li><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Remove</a></li><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Like</a></li><li class="blog_action_buttons_li"><a href="javascript:void(0)" id="'+ data[i].blogId +'">Dislike</a></li></ul>'
        // } 
    //     accountPosts.fadeIn().css("display", "grid")
    //     accountWritePost.css("display", "none")
    //     accountOverview.css("display", "none")
    // } else {
    //     alertMsg = res.failed
    //     myContent.innerHTML = '<div class="blog-content">You have no posts yet....post something.</p>'
    //     }
    // })   


