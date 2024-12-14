
import {recruiterData} from "../models/recruiter.model.js";
import { applicantData } from "../models/applicant.model.js";
import session from "express-session";

export const RenderHomepage = (req, res) => {
    res.status(200).render("homepage");
}

export const Jobpage = (req,res) => {
    res.status(200).render("jobpage",{recruiterData});
}

export const Loginpage = (req, res) => {
    res.status(200).render("loginpage");
}

export const Pagenotfound = (req, res) => {
    res.status(400).render("pagenotfound",{errorMessage:undefined});
}

export const Jobdetails = (req, res) => {
    var paramsid = (req.params.id);
    var usersecure = req.session.userEmail;
    res.status(200).render("jobdetails", { recruiterData: recruiterData , paramsid: paramsid, applicantData:applicantData, usersecure: usersecure });
}

export const Postnewjob = (req, res) => {
    res.status(200).render("postnewjob", {recruiterData: null, paramsidforeditpost: null});
}

export const EditPostjob = (req, res) => {
    var paramsidforeditpost = String(req.params.id);
    var updatedRecruiterData = [...recruiterData];
   
    res.status(200).render("editpostnewjob", {recruiterData: updatedRecruiterData, paramsidforeditpost: paramsidforeditpost});
}

export const DeleteJob = (req, res) => {
    var paramsiffordeletejob = String(req.params.id);

    const startIndex = Number(paramsiffordeletejob)-1; 
    recruiterData.splice(startIndex, 1);


    res.status(200).render("jobpage", {recruiterData})
}

export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        }else {
            res.status(200).render("loginpage");
        }
    });
}
