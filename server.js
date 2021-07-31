const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

const app = express();

// env configuration
dotenv.config();

//View Engine Setup
app.engine("handlebars", exphbs({ defaultLayout: false }));
app.set("view engine", "handlebars");

//body parser middleware
//For < Express 4.16
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())

//For > 4.17
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Public Folder
app.use("/public", express.static(path.join(__dirname + "/public"))); //Works

// Set api key to sgMail
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Index Route
app.get("/", (req, res) => {
  res.render("contact");
});

// Form submission endpoint
app.post("/send", (req, res) => {
  console.log(req.body);

  const { email, name, company, phone, message } = req.body;

  // send an asynchronous email here...

  const emailConfig = {
    to: email,
    from: process.env.FROM_MAILING_ADDRESS,
    subject: "test subject",
    html: `
      <h1>We have received your submission !</h1>
      <h3>Name: ${name}</h3>
      <h3>Company: ${company}</h3>
      <h3>phone: ${phone}</h3>
      <h3>message: ${message}</h3>
    `,
  };

  sgMail.send(emailConfig).then(console.log).catch(console.error);

  return res.json({
    msg: "Please check your mailbox !",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));