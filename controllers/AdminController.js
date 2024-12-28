const CourseModel = require("../models/course");
const nodeMailer = require("nodemailer");


class AdminController {

    static getUserDisplay = async (req, res) => {
        try {
          const { name, image } = req.user;
          const course = await CourseModel.find();
          res.render("admin/getUserDisplay", { n: name, i: image, c: course });
        } catch (error) {
          console.log(error);
        }
      };

      static updateStatus = async (req, res) => {
        try {
          const { comment, email, name, status } = req.body;
          await CourseModel.findByIdAndUpdate(req.params.id, {
            comment: comment,
            status: status,
          });
          // this.sendMail(name, comment, email, status);
          res.redirect("/admin/dashboard");
        } catch (error) {
          console.log(error);
        }
      };

      static adminView = async (req,res)=>{
        try {
            const {image,name} = req.user
            const view = await CourseModel.findById(req.params.id)
            // console.log(view);

            res.render('admin/adminView',{adminview:view,n:name,i:image})

        } catch (error) {
            console.log(error)
        }
      }

      static adminEdit = async (req, res) => {
        try {
          // console.log(req.params.id);
          const { name, id,image } = req.user;
          const edit = await CourseModel.findById(req.params.id);
          // console.log(edit);
          res.render("admin/adminEdit", { adminedit: edit, n: name ,i:image });
        } catch (error) {
          console.log(error);
        }
      };

      // static sendMail = async (name, email, status, comment) => {
      //   // console.log(name,email);
      //   let transporter = await nodeMailer.createTransport({
      //     host: "smtp.gmail.com",
      //     port: 587,
    
      //     auth: {
      //       user: "blackhuntjai17@gmail.com",
      //       pass: "mfxxtffegqyopayx",
      //     },
      //   });
    
      //   let info = await transporter.sendMail({
      //     from: "test@gmail.com", //Sender address
      //     to: email, // List of receivers
      //     subject: `Course ${status}`,
      //     text: "hello",
      //     html: `<b>${name}</b> Course <b>${status}</b> successfull! <br>
      //     <b> Comment from Admin </b> ${comment}`,
      //   });
      // };
    
}

module.exports=AdminController