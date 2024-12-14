import {body, validationResult} from "express-validator";




const validationRegister = async (req, res, next) => {
    const rules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Email should be vaild"),
        body("password").notEmpty().withMessage("Password is required")
    ];

    await Promise.all(rules.map(rule=>rule.run(req)));
    var validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        return res.render("pagenotfound", {
            errorMessage:"name, email or password invaild",
        });
    }
    next();
}

export default validationRegister;