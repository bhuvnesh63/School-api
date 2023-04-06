const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  Sr: {
    type: Number,
    required: [true, "Please enter your Sr Number"],
  },
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

  DOA: {
    type: Date,
    default: Date.now,
    required: [true, "Please enter your Date of Admission"],
  },
  currentClass: {
    type: Number,
    required: [true, "Please enter your Current Class"],
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
  Sibling: {
    type: Number,
    default: false,
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
  Present_Address: {
    type: String,
    required: [true, "Please enter Present Address"],
  },
  Permanent_Address: {
    type: String,
    required: [true, "Please enter Permanent Address"],
  },
  City: {
    type: String,
    required: [true, "Please enter City name"],
  },
  Religion: {
    type: String,
    required: [true, "Please enter your Religion"],
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  // user:{
  //   type:mongoose.Schema.ObjectId,
  //   ref:"User",
  //   required:true,
     
  // },
});

module.exports = mongoose.model("Student",studentSchema);
