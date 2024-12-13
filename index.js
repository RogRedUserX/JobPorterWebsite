// importing all models
import express from "express";
import ejs from "ejs";
import path from "path"
import expressEjsLayouts from "express-ejs-layouts"; 
import { RenderHomepage, Jobpage, Loginpage, Jobdetails, Postnewjob, EditPostjob, DeleteJob, Logout } from "./src/controllers/user.controller.js";
import UserModel from "./src/models/user.model.js";
import validationLogin from "./src/middlewares/validation.logininput.js";
import validationRegister from "./src/middlewares/validation.registerinput.js";
import validationRecruiter from "./src/middlewares/validation.recruiter.js";
import validationNewpostjob from "./src/middlewares/validation.newpostjob.js";
import RecruiterModel from "./src/models/recruiter.model.js";
import ApplicantModel from "./src/models/applicant.model.js";
import validationApplicant from "./src/middlewares/validation.applicant.js";
import uploadFile from "./src/middlewares/file-upload.middleware.js";
import sendMail from "./src/middlewares/mail-sender.middleware.js"
import session from "express-session";
import auth from "./src/middlewares/authentication.middleware.js";
import setLastVisit from "./src/middlewares/lastvisit.middleware.js";
import cookieParser from "cookie-parser";


// creating new instance of classes
const userModel = new UserModel();
const recruiterModel = new RecruiterModel();
const applicantModel = new ApplicantModel();

// creating server
const server = express();
// creating some locals variable
server.locals.applicantcount = 0;


// setting view engine 
server.set("view engine", "ejs");
// setting views path
server.set("views", path.resolve("src", "views"));
// setting ejs layouts
server.use(expressEjsLayouts);
// setting urlencoded for using url for showing custom views
server.use(express.urlencoded({ extended:true }));
// exposing public files 
server.use(express.static("public"));
// setting session for authentication
server.use(session({
    secret: "my_super_secret_key_9876$%#^&*()",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}));
// setting this for layout view dynamic data 
server.use((req, res, next) => {
    if(req.session.userEmail){
        res.locals.layoutData = {
            user:req.session.userEmail.split('@')[0],    
        }        
    } else {
        res.locals.layoutData = {
            user:req.session.userEmail,        
        }
    }      
    next();
});
// setting cookieparser for lastvisit
server.use(cookieParser());
  


// all get and post routes
server.get("/", RenderHomepage);
server.get("/jobs", Jobpage);
server.get("/login", Loginpage);
server.get("/job/:id", setLastVisit, Jobdetails);
server.get("/postjob", auth, Postnewjob);
server.post("/register", validationRegister, setLastVisit, userModel.getRegisterRecruiter);
server.post("/login", validationLogin, validationRecruiter, setLastVisit, userModel.getLoginRecruiter);
server.post("/job", validationNewpostjob, recruiterModel.postRecruiterData);
server.get("/job/applicants/:id", auth, applicantModel.getApplicant);
server.post("/apply/:id", uploadFile.single("resume"), validationApplicant, sendMail, applicantModel.postApllicant, Jobpage);
server.get("/job/update/:id", auth, EditPostjob);
server.get("/job/delete/:id", auth, DeleteJob);
server.get("/logout", Logout);
server.post("/editpostjob/:id", validationNewpostjob, recruiterModel.editpostRecruiterData)


// creating port where server listen to
server.listen(3200, ()=>{
    console.log("Server is listening on port 3200");
})


export default server;