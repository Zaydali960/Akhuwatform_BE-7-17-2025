const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  cnic: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  loanStatus: {
    type: String,
      default: "Pending",
  },
  loanAmount: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  bankAccountNumber: {
    type: String,
    required: true
  },
  paymentScreenshot: {
    type: String, // Store image URL or base64 string
    required: true
  },
  frontCnic: {
    type: String, // Store image URL or base64 string
    required: true
  },
  backCnic: {
    type: String, // Store image URL or base64 string
    required: true
  },
  utilityBill: {
    type: String, // Store image URL or base64 string
    required: true
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User; 
