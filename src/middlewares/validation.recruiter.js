import {userData} from "../models/user.model.js";


const validationRecruiter = (req, res, next) => {
    const {email, password} = req.body;

    const result = userData.find(
        (u) => u.email === email &&
        u.password === password
    );
    
    if(result === undefined){
        return res.render("pagenotfound",{
            errorMessage:"Email or Password incorrect"
        });
    }else{
        next();
    }    
}

export default validationRecruiter;