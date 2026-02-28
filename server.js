require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const sgMail = require("@sendgrid/mail");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email Route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  const msg = {
    to: "ritsan.enterprises1711@gmail.com", // your receiving email
    from: "ritsan.enterprises1711@gmail.com", // MUST be verified in SendGrid
    subject: `New Business Inquiry from ${name}`,
    html: `
      <div style="font-family:Arial;padding:20px;">
        <h2>New Client Inquiry</h2>
        <hr/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr/>
        <small>This email was sent from Ritsan Enterprises Website</small>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("SENDGRID ERROR:", error.response?.body || error);
    res.status(500).json({ message: "Email failed to send" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));