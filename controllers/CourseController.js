const CourseModel = require ('../models/course')
const nodeMailer = require ('nodemailer')

class CourseController{

    static btechFormInsert = async (req,res)=>{
        try {
            // console.log(req.body);
            const {name,email,mobileNo,dob,gender,address,college,course,branch,} = req.body;
      const result = new CourseModel({
        name: name,
        email: email,
        number: mobileNo,
        dob: dob,
        gender: gender,
        address: address,
        college: college,
        course: course,
        branch: branch,
        user_id: req.user.id,
      });
      await result.save();
      this.sendMail(name,email)
      res.redirect("/courseDisplay");
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

    static bcaFormInsert = async (req,res)=>{
      try {
        // console.log(req.body);
        const {name,email,mobileNo,dob,gender,address,college,course,branch,} = req.body;
        const result = new CourseModel({
          name: name,
          email: email,
          number: mobileNo,
          dob: dob,
          gender: gender,
          address: address,
          college: college,
          course: course,
          branch: branch,
          user_id: req.user.id,
        });
        await result.save();
        res.redirect("/courseDisplay");
        
        
      } catch (error) {
        console.log(error);
        
      }
    }

    static mcaFormInsert = async (req,res)=>{
          try {
             // console.log(req.body);
        const {name,email,mobileNo,dob,gender,address,college,course,branch,} = req.body;
        const result = new CourseModel({
          name: name,
          email: email,
          number: mobileNo,
          dob: dob,
          gender: gender,
          address: address,
          college: college,
          course: course,
          branch: branch,
          user_id: req.user.id,
        });
        await result.save();
        res.redirect("/courseDisplay");
          } catch (error) {
            console.log(error);
            
          }
    }

    static  courseDisplay = async(req,res)=>{
        const {name,id,image}=req.user
         const data= await CourseModel.find({user_id:id})
        //  console.log(data);
        res.render('course/courseDisplay',{n:name,d:data,i:image, message:req.flash('success') })
         
    }

    static courseView = async (req,res)=>{
        try {
            // console.log(req.params.id);
                const {name,id,image} = req.user
            const view = await CourseModel.findById(req.params.id)
            // console.log(view);
            
            res.render('course/courseView',{courseview:view,n:name,i:image})
            
        } catch (error) {
            console.log(error);
            
        }
    }

    static courseEdit = async (req,res)=>{
        try {
            const {name,id,image} =req.user
            const edit = await CourseModel.findById(req.params.id)
            res.render('course/courseEdit',{courseedit:edit,n:name,i:image})
        } catch (error) {
            console.log(error);
            
        }
    }

    static courseUpdate = async (req, res) => {
        try {
          // console.log(req.params.id);
          const {id } = req.user;
          const {name,email,mobileNo,dob,gender,address,college,course,branch} = req.body;
           await CourseModel.findByIdAndUpdate(req.params.id, {
            name: name,
            email: email,
            number: mobileNo,
            dob: dob,
            gender: gender,
            address: address,
            college: college,
            course: course,
            branch: branch,
            user_id: req.user.id,
          });
          
          req.flash('success','Course updated successfully')
          res.redirect('/courseDisplay')
        } catch (error) {
          console.log(error);
        }
      };

      static courseDelete = async (req, res) => {
        try {
          // console.log(req.params.id);
          await CourseModel.findByIdAndDelete(req.params.id)
          
          req.flash('success','Course deleted successfully')
          res.redirect('/courseDisplay')
    
        } catch (error) {
          console.log(error);
        }
      };

      static sendMail =async (name,email)=>{
        // console.log(name,email)
        let transporter = await nodeMailer.createTransport({
          host : "smtp.gmail.com",
          port: 587,
    
          auth: {
            user:"blackhuntjai17@gmail.com",
            pass: "mfxxtffegqyopayx",
          }
        });
    
        let info = await transporter.sendMail({
          from: "test@gmail.com",     //Sender address
          to: email,    // List of receivers
          subject: "Course has been registered successfully!",  //subject line
          text: " Hello", // plain text body
          html: `<b>${name}</b> Course updated Successful! Wait for approval.`, // html body
        });
      }
 
}

module.exports=CourseController