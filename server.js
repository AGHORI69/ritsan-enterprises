require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Ritsan Website Inquiry" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: `New Business Inquiry from ${name}`,
      html: `
        <div style="font-family:Arial;padding:20px;background:#f4f4f4">
          <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:10px">
            <h2 style="color:#7c3aed">New Client Inquiry</h2>
            <hr/>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background:#f9f9f9;padding:15px;border-radius:5px">
            ${message}
            </p>
            <hr/>
            <p style="font-size:12px;color:gray">
            This message was sent from Ritsan Enterprises official website.
            </p>
          </div>
        </div>
      `
    });

    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ message: "Email failed to send" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));