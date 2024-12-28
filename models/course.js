const mongoose = require("mongoose");

const Courseschema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    email: {
      type: String,
      Required: true,
    },
    number: {
      type: String,
      Required: true,
    },
    dob: {
      type: String,
      Required: true,
    },
    gender: {
      type: String,
      Required: true,
    },
    address: {
      type: String,
      Required: true,
    },
    college: {
      type: String,
      Required: true,
    },
    course: {
      type: String,
      Required: true,
    },
    branch: {
      type: String,
      Required: true,
    },
    status: {
      type: String,
      default: "Wait",
    },

    comment:{
      type: String,
      default: "Pending"
    },
    user_id:{
        type:String,
        Required:true
    }
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("courses", Courseschema);

module.exports = CourseModel;
