import express from 'express'
import nodemailer from 'nodemailer'

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  res.status(200).json({
    success: true,
    message: "Subscription successful. Welcome to BlogVerse!",
  });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BlogVerse" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to BlogVerse 📚",
      text: `
Hi there,

Thanks for subscribing to BlogVerse!

You’re now part of a growing community that values insightful stories, thoughtful perspectives, and the latest trends across technology, business, startups, and more.

What you can expect:
• Curated articles from our editors
• Weekly highlights & trending topics
• Thought-provoking reads delivered straight to your inbox

Stay curious,
— The BlogVerse Team
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Subscription successful. Welcome to BlogVerse!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to subscribe at the moment. Please try again later.",
    });
  }
});

export default router;
