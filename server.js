const express = require('express')
const nodemailer = require('nodemailer')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

//View Engine Setup
app.engine("handlebars", exphbs({ defaultLayout: false }));
app.set('view engine', 'handlebars')

//body parser middleware
//For < Express 4.16
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())

//For > 4.17
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

//Public Folder
//NOTE- app.use(express.static('./public')) //is not working when importing files inside my handlebares, instead use below approach:-

app.use('/public', express.static(path.join(__dirname + '/public'))); //Works

app.get('/', (req, res) => {
    res.render('contact');
})

app.post('/send', (req, res) => {
    console.log(req.body)
    return res.json({msg: 'Form data saved !'})
    // send email here (npm i @sendgrid/mail) See yoursTRULY YT for reference
    // verigy sender on send grid account
    // create api key> restricted access > send emails, schedule emails > Create
    // Use that API key inside config
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))