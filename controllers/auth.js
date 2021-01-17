function checkAuth(req, res, next){
    if(req.session.userInfo == undefined) {
        res.redirect('/')
    } else {
        status = req.session.userInfo.loggedIn
        email = req.session.userInfo.email
        title = req.session.userInfo.userPerm
        userName = req.session.userInfo.username
        userId =req.session.userInfo.userId
    next()
    }
}
function checkAdmin(req, res, next){
    if(title == "Admin" && status == true) {
        console.log(title)
    } else {
        res.redirect('/dashboard')
    }
    next()
}

exports.checkAdmin = checkAdmin
exports.checkAuth = checkAuth