import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let sendMail = (emailReceiver, emailContent, emailSubject) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "katherinebaker900@gmail.com",
      pass: "ovbd gxbd uftj umyc",
    },
  });

  let mailOptions = {
    from: {
      address: "itc6@gmail.com",

      name: "ITC6",
    },
    to: [emailReceiver],
    subject: emailSubject,
    html: emailContent,
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
