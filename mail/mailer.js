import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let sendMail = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "teammedonor@gmail.com",
      pass: process.env.PASS,
    },
  });

  let mailOptions = {
    from: {
      address: "itc6@gmail.com",

      name: "ITC6",
    },
    to: ["apoorvavpendse@gmail.com"],
    subject: "Your timetable request has been granted",
    html: `
        <h1>Your timetable request has been granted successfully</h1>
        Visit the <a href="https://ttrs.onrender.com">website</a> for further details

        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("mail sent:", info.response);
    }
  });
};

export default sendMail;
