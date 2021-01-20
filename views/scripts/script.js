$(document).ready(function() {
    var dirName =  window.location.pathname;
    $(document).on('click','#insertForm', function() {
        renderItemForm();
    });
    i= 0
function renderItemForm() {
    console.log("clicked")
    form = $('#item-form-container')
    console.log(form)
    i++
    myForm = '<div class="info-container-items two-columns" id="item-input-form" identifier="'+i+'"> <div class="info"> <input type="text" name="itemName[]" id="itemName" placeholder="Item Name" autocomplete="new-password" required> <input type="text" name="itemDesc[]" id="itemDesc" placeholder="Item description..." autocomplete="new-password" required> </div> <div class="info" id="values"> <input type="number" name="itemQty[]" id="itemQty" placeholder="Qty" required> <input type="number" name="itemPrice[]" id="itemPrice" placeholder="Price" required>' +
    '</div><div id="result"></div> <button class="btn-style-delete span_columns" type="button" id="removeItemForm-btn">Remove</button></div>' 
    form.append(myForm)
    }
myPriceArray = []
myQtyArray = []
invoiceForm = $('#generateInvoice')
invoiceForm.on('change', '#values', function () {
    itemPrice = ""
    itemQty = ""
    price = $(this).children().last().val()
    quantity = $(this).children().first().val()
    outputDiv = $(this).parent().find("#result")
    if(quantity != "" && price != "") {
        result = quantity * price 
        outputDiv.html("$" + result.toFixed(2))
    } else {
        return
    }
    console.log(price)
    console.log(quantity)
})

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

class Alert {
    constructor(message) {
      this.msg = message;
    }
    success() {
      alertBox.fadeIn()
      alertBox.html(this.msg)
      console.log("Success Called")
      setTimeout(
        function() 
        {
            alertBox.fadeOut()
        }, 5000);
    }
    failed() {
        alertBox.fadeIn()
        alertBox.html(this.msg)
        console.log("Failed")
        setTimeout(
          function() 
          {
              alertBox.fadeOut()
          }, 3000);
    }
  }
  
//   let myAlert = new Alert("John");
//   myAlert.success();
//   myAlert.success();

$('#notWorking').on("click", function() {
    alertMsg = "This feature is not yet available"
    let myAlert = new Alert(alertMsg)
    myAlert.failed()
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
let cancelAction = () => {
    setInterval(alertBox.fadeOut(), 2000)
    console.log("cancelled")
}

$(document).on("click", '#removeItemForm-btn', function(e) {
        $(this).parent().remove()
})
let sendInvoice = () => {
 //get input, select, textarea of form
 let sender = $('#senderCompany').val();
 let senderAdd = $('#senderAddress').val();
 let senderAdd2 = $('#senderAddress2').val();
 let senderEmail = $('#senderEmail').val();
 let senderTel = $('#senderTele').val();
 let senderSlogan = $('#senderSlogan').val();
 let recName = $('#recName').val()
 let recCompAdd = $('#recCompanyAdd').val()
 let recCompAdd2 = $('#recCompanyAdd2').val()
 let checkForItems = $('#generateInvoice').find('div#item-input-form').each(function (e) {})

 myArray = []
 myObject = {}

 if((sender == "") || (senderAdd == "") || (senderAdd2 == "") || (senderEmail == "") ||  (senderTel == "")) {
    myMsg = "You need to fill in your contact information"
    let myAlert = new Alert(myMsg);
    myAlert.failed(); 
    return 
 } else if((recName == "") || (recCompAdd == "") || (recCompAdd2 =="")){
    myMsg = "You need to fill in the receivers information"
    let myAlert = new Alert(myMsg);
    myAlert.failed(); 
    return 
 } else {
    if(checkForItems.length < 1) {
        myMsg = "You need to add items to your invoice"
        let myAlert = new Alert(myMsg);
        myAlert.failed();
    } else {
        console.log("You have at least 1 item")
        $('#generateInvoice').find('div#item-input-form').each(function (e) {
            $('#item-input-form').find('input').each(function (e, value) {
                Object.defineProperties(myObject, {
                    [this.id]: {
                      value: this.value
                    }
                  });
            })
            myArray.push(myObject)
            console.log(myArray)
            if(myArray.length < 1) {
                console.log("You need to add items")
            } else if(myArray.length >= 1)
                for(i =0; i < myArray.length; i++) {
                    if(myArray[i].itemName == "" && myArray[i].itemPrice == "" && myArray[i].itemQty == "" && myArray[i].itemDesc == "") {
                        myMsg = "You need to fill in all the fields"
                        let myAlert = new Alert(myMsg);
                        myAlert.failed();
                    }
                    else if(myArray[i].itemName == "") {
                        myMsg = "One of your items is missing a name"
                        let myAlert = new Alert(myMsg);
                        myAlert.failed();
                    }
                    else if(myArray[i].itemDesc == "") {
                        myMsg = "Your items must have a description"
                        let myAlert = new Alert(myMsg);
                        myAlert.failed();
                    }
                    else if(myArray[i].itemQty == "") {
                        myMsg = "One of your items is missing the quanitity"
                        let myAlert = new Alert(myMsg);
                        myAlert.failed();
                    } 
                    else if(myArray[i].itemPrice == "") {
                        myMsg = "One of your items is missing its price"
                        let myAlert = new Alert(myMsg);
                        myAlert.failed();
                    }
                    else {
                    formData = $('#generateInvoice').serialize()
                    $.ajax({
                        url: "/recInvoice",
                        type: "POST",
                        data: formData,
                        success: function(res) {
                            console.log(res)
                        if (res.success == true) {
                            alertMsg = "Your account has been created. Please login.";
                            // alertBox.html(alertMsg) 
                            data = res.data
                                myMsg = "Your invoice is ready"
                                let myAlert = new Alert(myMsg);
                                myAlert.success();
                                revealData(data)
                            }
                            
                        else {
                            myMsg = "Something went wrong"
                            let myAlert = new Alert(myMsg);
                            myAlert.success();  
                                }
                            }
                        })
                    }
                }
            })        
        }
    }
}

let revealData = (data) => {
    if(!data.itemName.length) {
        alertMsg = 
        alertMsg = "You must add items to the form."
        let myAlert = new Alert(alertMsg)
        myAlert.failed()
        return false
    } else {
        invoiceHead = $('#invoiceHead') 
        $('#item-input-form').remove()
        invoiceHead.html(
        '<div><h1>'+data.senderName+'</h1>'+
        '<p>'+data.senderAddress+'</p>'+
        '<p>'+data.senderAddress2+'</p>'+
        '<p>'+data.senderEmail+'</p>'+
        '<p>'+data.senderTele+'</p>'+
        '<p><h2>Receivers Information</h2></p>'+

        '<p>'+data.recName+'</p>'+
        '<p>'+data.recCompanyAdd+'</p>'+
        '<p>'+data.recCompanyAdd2+'</p>'+
        '<h3>Items</h3><div><table width="100%" id="itemization">'+
        '<tr>'+
            '<th>Item Name</th>'+
            '<th>Item Description</th>'+
            '<th>Item Qty</th>'+
            '<th>Item Price</th>'+
            '<th>Items Total</th></tr></table>'
        )
        renderTotals(data)
    }
}
    
let renderTotals = (data) => {
    items = $('#itemization')
    grandTotal = 0;
    for(i = 0; i <data.itemName.length; i++) {
        total =  data.itemQty[i] * data.itemPrice[i]
        grandTotal = grandTotal + total;
        myTotal =  grandTotal
        items.append(
            '<tr><td>'+data.itemName[i]+'</td>'+
            '<td>'+data.itemDesc[i]+'</td>'+
            '<td>'+data.itemQty[i]+'</td>'+
                '<td>'+data.itemPrice[i]+'</td>'+
                '<td>'+total.toFixed(2)+'</td>'+
                '<td>' +grandTotal.toFixed(2)+'</td>'+
            '</tr>')
    }
    renderThanks(data)
}
let renderThanks = (data) => {
    note = $('#note')
    msg = "A custumized message here, along with your personal info like name, and title."
    note.html("<div>"+msg+"<div><button type='button' class='btn-style-save'>Save</button></div></div>")
}

// console.log(senderCompany.text($(senderCompany).val()))
