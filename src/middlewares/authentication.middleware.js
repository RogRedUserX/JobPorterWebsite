
import session from "express-session";

const auth = (req, res, next) => {
    if(req.session.userEmail){
        next();
    }else{
        res.render("pagenotfound",{
            errorMessage:null
        })
    }
}

export default auth;
