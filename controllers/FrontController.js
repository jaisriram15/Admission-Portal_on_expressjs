const UserModel = require("../models/user");
const bcrypt = require("bcrypt"); // Password encryption ke liye
const jwt = require("jsonwebtoken"); // Token generate ke liye taki secure rahe login
const CourseModel = require("../models/course");

// File upload to cloudinary
const cloudinary = require("cloudinary").v2;
// Configuration
cloudinary.config({
  cloud_name: "dy1qu2vq3",
  api_key: "613635899497817",
  api_secret: "ntttNEe9hMOfMqOa-Wx-q17Uptc", // Click 'View API Keys' above to copy your API secret
});

class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static dashboard = async (req, res) => {
    try {
      const { name, id, image } = req.user;
      const btech = await CourseModel.findOne({
        user_id: id,
        course: "B.Tech",
      });
      const bca = await CourseModel.findOne({ user_id: id, course: "BCA" });
      const mca = await CourseModel.findOne({ user_id: id, course: "MCA" });
      res.render("dashboard", {
        n: name,
        btech: btech,
        bca: bca,
        mca: mca,
        i: image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, image } = req.user;
      res.render("about", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name, image } = req.user;
      res.render("contact", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static profile = async (req, res) => {
    try {
      const { name, image, email } = req.user;
      res.render("profile", {
        n: name,
        i: image,
        e: email,
        message: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static logOut = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.files.image)
      const { name, email, image } = req.body;

      // console.log(userimg);
      if (req.files) {
        const userImg = await UserModel.findById(req.user.id);
        const imgId = userImg.image.public_id;
        // console.log(imgId);
        await cloudinary.uploader.destroy(imgId); // For deleting the image from the server
        const file = req.files.image; //to upload image to cloudinary below code
        const imageUpload = await cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: "profile" }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(req.user.id, data);
      req.flash("success", "Profile updated successfully");
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  static changePassword = async (req, res) => {
    // console.log(req.body)
    const { oldpassword, newpassword, confirmpassword } = req.body;
    const { id } = req.user;

    if (oldpassword && newpassword && confirmpassword) {
      const user = await UserModel.findById(id);
      const ismatch = await bcrypt.compare(oldpassword, user.password);
        if (!ismatch) {
          req.flash("error", "Current password is incorrect");
          res.redirect("/profile");
          } else {
                  if (newpassword != confirmpassword) {
                      req.flash("error", "Password does not match");
                      res.redirect("/profile");
                  } else {
                        const newHashPassword = await bcrypt.hash(newpassword, 10);
                        await UserModel.findByIdAndUpdate(id, { password: newHashPassword });
                        req.flash("success", "Password updated successfully");
                        res.redirect("/profile");
                 }
         }
    } else {
      req.flash("error", "All fields are required");
      res.redirect("/profile");
    }
  };

  // Data insert through registration (method called insertReg)
  static insertReg = async (req, res) => {
    try {
      // console.log(req.files.image);
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        Folder: "Profile",
      });
      // console.log(imageUpload);

      const { name, email, password, cpassword } = req.body;

      const user = await UserModel.findOne({ email: email }); //find one record
      // console.log(user)

      if (user) {
        req.flash("error", "Email is already exist");
        res.redirect("/register");
      } else {
        if (name && email && password && cpassword)
          if (password == cpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              //model : view
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            await result.save();
            res.redirect("/");
          } else {
            req.flash("error", "Password and Confirm Password does not match");
            res.redirect("/register");
          }
        else {
          req.flash("error", "All Fields are required");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifyLogin = async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;

      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        // console.log(user);
        if (user != null) {
          const ismatch = await bcrypt.compare(password, user.password);
          if (ismatch) {
            if (user.role == "admin") {
              const token = jwt.sign(
                { ID: user._id },
                "jaisriram@904052@#$%&*#$#*"
              );
              // console.log(token);
              res.cookie("token", token);
              res.redirect("/admin/dashboard");
            }

            if (user.role == "user") {
              const token = jwt.sign(
                { ID: user._id },
                "jaisriram@904052@#$%&*#$#*"
              );
              // console.log(token);
              res.cookie("token", token);
              res.redirect("/dashboard");
            }
          } else {
            req.flash("error", "Email and Password is not valid");
            res.redirect("/");
          }
        } else {
          req.flash("error", "You are not a registered User");
          res.redirect("/");
        }
      } else {
        req.flash("error", "All fields are required");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontController;
