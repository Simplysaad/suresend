import nodemailer from "nodemailer";

const transporter = new nodemailer.createTransport({
  host: "localhost",//smtp.gmail.com
  port: 1025, //587
  secure: false, //true
  // tls: { rejectUnauthorized: false }
  // auth: {
  //   user: process.env.GMAIL_USER,
  //   pass: process.env.GMAIL_PASS
  // }
});

// transporter.sendMail(
//   {
//     from: "saad idris<saadidris23@gmail.com>",
//     to: "saad idris<saadidris70@gmail.com>",
//     subject: "Test",
//     text: "just a littel test",
//     html: "<button>Click me! </button>"
//   },
//   (err, info) => {
//     if (err) throw new Error("error sending mail");
//     console.log(info);
//   }
// );

export default transporter;
