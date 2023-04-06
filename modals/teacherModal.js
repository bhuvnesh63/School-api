const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
//   Sr: {
//     type: Number,
//     required: [true, "Please enter your Sr Number"],
//   },
  FirstName: {
    type: String,
    required: [true, "Please enter First Name"],
    trim: true,
  },
  LastName: {
    type: String,
    required: [true, "Please enter Last Name"],
    trim: true,
  },

  DOJ: {
    type: Date,
    default: Date.now,
    required: [true, "Please enter your Date of Joining"],
  },
  Qualification: {
    type: String,
    required: [true, "Please enter your Qualification"],
  },
  Experience: {
    type: Number,
    required: [true, "Please enter your Experience"],
  },
  Specialization_in_Subject: {
    type: String,
    required: [true, "Please enter Specialization in Subject"],
  },
  Last_Qualification: {
    type: String,
    required: [true, "Please enter your Last_Qualification"],
  },
  Marraige_Status: {
    type: String,
    required: [true, "Please enter your Marraige Status"],
  },
  DOB: {
    type: Date,
    default: Date.now,
    required: [true, "Please enter your Date of Birth"],
  },
  Age: {
    type: Number,
    required: [true, "Please enter your Age"],
  },
  Gender: {
    type: String,
    required: [true, "Please enter your Gender"],
  },
  Board: {
    type: String,
    required: [true, "Please enter your Board"],
  },
  AadharNumber: {
    type: Number,
    maxlength: 14,
    required: [true, "Please enter your AadharNumber"],
  },
  mobileNumber: {
    type: String,
    maxlength: 10,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Please enter your Category"],
  },
  Fathername: {
    type: String,
    required: [true, "Please enter Father Name"],
  },
  Mothername: {
    type: String,
    required: [true, "Please enter Mother Name"],
  },
  Father_Occupation: {
    type: String,
    required: [true, "Please enter Father Occupation"],
  },
  Mother_Occupation: {
    type: String,
    required: [true, "Please enter Mother Occupation"],
  },
  Address: {
    type: String,
    required: [true, "Please enter Address"],
  },
 
  City: {
    type: String,
    required: [true, "Please enter City name"],
  },
  Religion: {
    type: String,
    required: [true, "Please enter your Religion"],
  },
  // user:{
  //   type:mongoose.Schema.ObjectId,
  //   ref:"User",
  //   required:true,
     
  // },
});

module.exports = mongoose.model("Teacher",teacherSchema);
