const db = require('../database');
const auth = require('../routes/dashboard');
const invoice = require('../routes/invoice');

function retrieveInvoice(req, res, next) {
    data = req.body
    console.log(data)
    res.send({success: true, data: data})
    // res.render('invoiceDefault', {success: true, data: data})
    // invoicePrintView(data)
}
// function invoicePrintView(req, res, next) {
//     console.log("data Passed Bitch")
// }

exports.retrieveInvoice = retrieveInvoice


// function getAllMembers(req, res, next) {
//     db.query('SELECT * FROM users', function (error, results, fields) {
//     if(results.length > 0) {
//         let membersList = []
//         for(i =0; i < results.length; i++) {
//             var date = results[i].created_at;
//             date = date.toLocaleDateString('en-CA')

   
//             console.log(date)
//             membersList.push({
//                 username: results[i].username, date: date, title: results[i].title
//                 })
//             }
//             list = membersList

//             next()
//         } else {
//             res.send({success: false})
//             res.redirect('/')
//         }
//         next()
//     })
// }