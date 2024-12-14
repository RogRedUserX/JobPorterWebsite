
import { body, validationResult } from "express-validator";


const validationApplicant = async(req, res, next) => {
    const rules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Email should be vaild"),
        body("contact").isMobilePhone().withMessage("Contact should be vaild"),
        body("resume").custom((value, { req }) => {
            if(!req.file){
                throw new Error("Resume is required");
            }else return true;
        })
    ];

    await Promise.all(rules.map(rule=>rule.run(req)));

    var validationErrorsonapplicant = validationResult(req);
    
    if(!validationErrorsonapplicant.isEmpty()){
        return res.render("pagenotfound", {
            errorMessage:validationErrorsonapplicant.array()[0].msg
        });
    }else{
        next();
    }
}

export default validationApplicant;