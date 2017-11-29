var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')

var transport = {
	host: 'smtp.gmail.com',
	auth: {
		user: 'hayescapers45583@gmail.com',
		pass: 'hambone45583'
	}
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success)=>{
	if (error){
		console.log(error)
	}else{
		console.log("server is ready")
	}
})

/* GET home page. */
router.get('/', function(req, res, next) {
	var message = ""

	if(req.query.msg != undefined){
		message = req.query.msg
	}
  res.render('index', { title: 'Express' });
});

router.post('/send', (req,res,next)=>{
	var email = req.body.email
	var message = req.body.message
	var name = req.body.name
	var phone = req.body.phone
	var finalMessage = `${message} \n\n phone: ${phone} \n email: ${email}`

	var mail = {
		from:'Bugs Bunny',
		to: 'caseyezimmerman@gmail.com',
		subject: 'test',
		text: finalMessage
	}

	transporter.sendMail(mail, (error, data)=>{
		if (error){
			console.log(error)
			res.redirect('/?msg=fail')
		}else{
			console.log('success')
			res.redirect('/?msg=success')
		}
	})
})


module.exports = router;
