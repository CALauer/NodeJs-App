$(document).ready(function() {
    var dirName =  window.location.pathname;
    $('#preloadInvoice').on('click', function(){


        //get input, select, textarea of form
    $('#senderCompany').val("Viabull LLC");
    $('#senderAddress').val("123 Fake Street");
    $('#senderAddress2').val("Southern, CA 12345");
    $('#senderEmail').val("myFakeEmail@google.com");
    $('#senderTele').val("(123)-123-1234");
    $('#senderSlogan').val("Invest");
    $('#recName').val("Johnsku Holdings Corp.")
    $('#recCompanyAdd').val("123 Fake Road")
    $('#recCompanyAdd2').val("Northern, CA 12345")
    })
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
    $('#sendInvoice').on('click', function(){
        let sender = $('#senderCompany').val();
        let senderAdd = $('#senderAddress').val();
        let senderAdd2 = $('#senderAddress2').val();
        let senderEmail = $('#senderEmail').val();
        let senderTel = $('#senderTele').val();
        let recName = $('#recName').val()
        let recCompAdd = $('#recCompanyAdd').val()
        let recCompAdd2 = $('#recCompanyAdd2').val()
        let taxrate = $('#taxrate').val()
        let discount = $('#discount').val()
        let checkForItems = $('#generateInvoice').find('div#item-input-form').each(function (e) {})
       console.log(taxrate)
       console.log(discount)
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
                           // ajaxReqPostInvoice()
                           ajaxReqPostInvoice()
                           
                       }
                   }
                   })        
               }
           }
       })
    
    $('#notWorking').on("click", function() {
        alertMsg = "This feature is not yet available"
        let myAlert = new Alert(alertMsg)
        myAlert.failed()
    })
    $('#insertForm').on('click', function() {
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



let ajaxReqPostInvoice = () => {
    $.ajax({
        url: "/recInvoice",
        type: "POST",
        data: formData,
        success: function(res) {
            console.log(res)
        if (res.success == true) {
            // alertBox.html(alertMsg) 
            data = res.data
                myMsg = "Your invoice is ready"
                let myAlert = new Alert(myMsg);
                myAlert.success();
                revealData(data)
                console.log(data)
            }
            
        else {
            myMsg = "Something went wrong"
            let myAlert = new Alert(myMsg);
            myAlert.success();  
                }
            }
        })
    }
mySubtotal = []    
myTotal = []   
myDiscount = []
myTax = []
let revealData = (data) => {

    if(!data.itemName.length) {
        alertMsg = 
        alertMsg = "You must add items to the form."
        let myAlert = new Alert(alertMsg)
        myAlert.failed()
        console.log("Failed...itemName does not exist")
        return false
    } else {
        invoiceHead = $('#invoiceHead'); 
        $('#item-input-form').remove();
        invoiceHead.html('<div class="invoice-one-column-head"><div><h1 class="heading-style-2 print-color-1">'+data.senderName+'</h1><h4 class="heading-style-3 print-color-1">Company Slogan</h4></div><div class="pad-top-20"><h4 class="heading-style-4 print-color-1">'+data.senderAddress+'</h4><h4 class="heading-style-4 print-color-1">'+data.senderAddress2+'</h4></div></div><div class="invoice-two-column-head"><div><h1 class="heading-style-1 print-color-1">Invoice</h1><h4 class="heading-style-4 print-color-2">#0001</h4></div><div class="inline"><ul><li class="print-li print-color-2">'+data.senderEmail+'</li><li class="print-li print-color-2">'+data.senderTele+'</li></ul></div></div><div class="invoice-two-column-head-rec-details"><div><h2 class="heading-style-2 print-color-1">Invoice To:</h2><h3 class="heading-style-3 print-color-1">'+data.recName+'</h3><p class="print-color-2 fs-med">'+data.recCompanyAdd+'</p><p class="print-color-2 fs-med">'+data.recCompanyAdd2+'</p></div><div><table class="invoice-display-table"><tr class="underline"><td class="print-color-1">Total Due:</td><td class="print-color-1 bold align-right" id="grand-total"></td></tr><tr><td class="print-color-2">Invoice No:</td><td class="align-right print-color-1 pad-left-20">#0001</td></tr><tr><td class="print-color-2">Invoice Date</td><td class="align-right print-color-1 pad-left-20">Janurary 20, 2021</td></tr></table></div></div><div class="items-display"><table class="items-table" id="items-table"><tr><th>Items Description</th><th class="align-center">QTY</th><th class="align-center">PRICE</th><th class="align-right">TOTAL</th></tr>');
        renderTotals(data)
    }
}
let renderTotals = (data) => {
    items = $('#items-table')
    displayedGrand = $('#grand-total')
    grandTotal = 0;
    subtotal = 0;
    taxrate = data.taxrate
    discount = data.discount

    for(i = 0; i <data.itemName.length; i++) {
        // GENERATING ITEMIZED TOTALS
        itemtotal =  data.itemQty[i] * data.itemPrice[i]
        subtotal = subtotal + itemtotal;
        // GENERATING GRAND TOTAL
        if( mySubtotal.length == 0) {
        mySubtotal.push(subtotal)
        } else {
        mySubtotal.pop()  
        mySubtotal.push(mySubtotal)  
        }
        items.append(
            '<tr><td><h4 class="heading-style-4 print-color-1">'+data.itemName[i]+'</h4><p class="print-color-2 fs-small italic">'+data.itemDesc[i]+'</p></td><td class="align-center">'+data.itemQty[i]+'</td><td class="align-center">$'+data.itemPrice[i]+'</td><td class="align-right">$'+itemtotal.toFixed(2)+'</td></tr>')

    }
    items.append("</table></div>")
    if(taxrate > 0 && discount > 0) {
        saved = discount / 100 * mySubtotal
        newSubtotal = mySubtotal - saved;
        taxed = taxrate / 100 * newSubtotal
        total = newSubtotal + taxed
        myTotal.push(total.toFixed(2))
        myTax.push(taxed.toFixed(2))
        myDiscount.push(saved.toFixed(2))
        mySubtotal.pop()
        mySubtotal.push(newSubtotal.toFixed(2))
 }
    // } else if ((taxrate > 0) && (discount == 0)) {
    //    taxed = taxrate / 100 * grandTotal 
    //    grandTotal = grandTotal + taxed
    //    myTax.push(taxed)
    //    myTotal.pop()
    //    myTotal.push(grandTotal)
    // } else {
    //     saved = discount / 100 * grandTotal
    //     myDiscount.push(saved)
    // }
    renderThanks(data)
}

let renderThanks = (data) => {
    thanks = $('#thanks')
    thanks.html('<table class="totals-table"><tr><td class="print-color-2">Discount:</td><td class="align-right pad-left-20 bold" id="discount">$'+myDiscount+'</td></tr><tr><td class="print-color-2">Subtotal:</td><td class="align-right pad-left-20 bold"id="subtotal">$'+mySubtotal+'</td></tr><tr><td class="print-color-2">Tax:</td><td class="align-right pad-left-20 bold" id="taxed">$'+myTax+'</td></tr><tr><td class="print-color-2">Total:</td><td class="align-right pad-left-20 bold" id="grand-total-2">$'+myTotal+'</td></tr></table></div><div class="align-left"><h3 class="heading-style-3 print-color-1" id="senderMsg">Thank you for your business!</h3><p class="print-color-2" id="senderTitle"></p><p class="print-color-1" id="senderFullName"></p><button class="btn-style-save" onclick="window.print()">Print</button></div>')
    $([ document.documentElement, document.body ]).animate(
        {
            scrollTop: ($('#invoiceHead').offset().top - 60 )
        },
        800
    );
}


// console.log(senderCompany.text($(senderCompany).val()))
