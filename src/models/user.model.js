import { recruiterData } from "./recruiter.model.js";
import session from "express-session";

export var userData = [];



export default class UserModel {
    constructor(name, email, password) {
        this.id = userData.length + 1;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    getRegisterRecruiter(req, res) {
        req.session.userEmail = req.body.email;
        userData.push(req.body);
        res.render("loginpage");
    }

    getLoginRecruiter(req, res) {
        req.session.userEmail = req.body.email;
        res.render("jobpage",{
            recruiterData
        });
    }

}