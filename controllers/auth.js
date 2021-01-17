function checkAuth(req, res, next){
    if(req.session.userInfo == undefined) {
        res.redirect('/')
    } else {
        status = req.session.loggedIn
        email = req.session.userInfo.email
        title = req.session.userInfo.userPerm
        userName = req.session.userInfo.username
        userId =req.session.userInfo.userId
    next()
    }
}
exports.checkAuth = checkAuth