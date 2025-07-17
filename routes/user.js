const express = require("express")
const router = express.Router()
const nodemailer = require('nodemailer')
const User = require("../models/User")
const verifyAdmin = require("../middleware/verifyAdmin")


  router.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
   auth: {
      user: "akhuwatfoundation.live078@gmail.com",
      pass: "bzznkvbqigrhigba", 
    },
  });

  try {
    await transporter.sendMail({
      from: "akhuwatfoundation.live078@gmail.com",
      to,
      subject,
      html: text,
    });

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});



router.post("/create", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      jobTitle,
      email,
      phoneNumber,
      cnic,
      address,
      loanStatus,
      loanAmount,
      bankName,
      bankAccountNumber,
      paymentScreenshot,
      frontCnic,
      backCnic,
      utilityBill,
    } = req.body;

    // Check if all fields are provided
    if (
      !firstName || !lastName || !email || !phoneNumber ||
      !cnic || !address || !loanStatus || !paymentScreenshot || !loanAmount || !frontCnic
      || !backCnic|| !utilityBill || !jobTitle || !bankName || !bankAccountNumber
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Optional: check if user with same email or CNIC exists
    const existingUser = await User.findOne({ $or: [{ email }, { cnic }] });
    if (existingUser) {
      return res.status(409).json({ error: "User with email or CNIC already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      jobTitle,
      email,
      phoneNumber,
      cnic,
      address,
      loanStatus,
      loanAmount,
      bankName,
      bankAccountNumber,
      paymentScreenshot,
         frontCnic,
      backCnic,
      utilityBill
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});



router.put("/update-loan-status/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { loanStatus } = req.body;
    
    if (!id || !loanStatus) {
      return res.status(400).json({ error: "User ID and loanStatus are required" });
    }

   const user = await User.findByIdAndUpdate(
      id,
      { loanStatus },
      { new: true } // return updated user
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Loan status updated successfully", user });
  } catch (error) {
    console.error("Error updating loan status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-users", verifyAdmin,async (req, res) => {
  try {
    const users = await User.find();  
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.get("/by-cnic/:cnic", async (req, res) => {
  try {
    const cnic = req.params.cnic;

    const user = await User.findOne({ cnic });

    if (!user) {
      return res.status(404).json({ error: "User not found with this CNIC" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error finding user by CNIC:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.get("/user-by-cnic/:cnic", async (req, res) => {
  
  const cnic = req.params.cnic;
  try {
    const user = await User.findOne({ cnic });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by CNIC:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router; 