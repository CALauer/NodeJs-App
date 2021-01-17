const db = require('../database');
const auth = require('../routes/dashboard');

function getAllMembers(req, res, next) {
    db.query('SELECT * FROM users', function (error, results, fields) {
    if(results.length > 0) {
        let membersList = []
        for(i =0; i < results.length; i++) {
            var date = results[i].created_at;
            date = date.toLocaleDateString('en-CA')

   
            console.log(date)
            membersList.push({
                username: results[i].username, date: date, title: results[i].title
                })
            }
            list = membersList

            next()
        } else {
            res.send({success: false})
            res.redirect('/')
        }
        next()
    })
}

// new Date().toLocaleDateString() // 8/19/2020

// new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}); // 08/19/2020 (month and day with two digits)

// new Date().toLocaleDateString('en-ZA'); // 2020/08/19 (year/month/day) notice the different locale

// new Date().toLocaleDateString('en-CA'); // 2020-08-19 (year-month-day) notice the different locale

// new Date().toLocaleString("en-US", {timeZone: "America/New_York"}); // 8/19/2020, 9:29:51 AM. (date and time in a specific timezone)

// new Date().toLocaleString("en-US", {hour: '2-digit', hour12: false, timeZone: "America/New_York"});  // 09 (just the hour)

exports.getAllMembers = getAllMembers