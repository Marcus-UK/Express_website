const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodeMailer = require('nodemailer')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index', {title: 'Express Website solutions'});
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.post('/contact/send', function(req, res){
    var transporter = nodeMailer.createTransport({
        service: 'Outlook',
        auth: {
            user: 'marcus_node@outlook.com',
            pass: 'Sheffield109'
        }
    });

    var mailOptions = {
        from: 'Marcus Node <marcus_node@outlook.com>',
        to: 'mrands@hotmail.co.uk',
        subject: 'Website Submission',
        text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
        html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent '+ info.response);
            res.redirect('/');
        }
    })
});

app.listen(3000);
console.log('Server is running on port 3000.');
