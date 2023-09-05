// pages/api/sendEmail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;

    // Create a transporter using your email service provider (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'dylantravis99@gmail.com',
        pass: 'fuomahhcgzyqjedo',
      },
    });

    try {
      // Send the email
      const info = await transporter.sendMail({
        from: 'dylantravis99@gmail.com',
        to: 'dylantravis99@gmail.com', // Replace with the recipient's email
        subject: "VOIDSPACE CONTACT FORM " + subject,
        text: email + message,
      });

      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
