import { body, validationResult } from "express-validator";




const validationLogin = async (req, res, next) => {
    const rules = [
        body("email").isEmail().withMessage("Email should be vaild"),
        body("password").notEmpty().withMessage("Password is required")
    ];

    await Promise.all(rules.map(rule=>rule.run(req)));
    var validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        return res.render("pagenotfound", {
            errorMessage:"Email or Password invaild",
        });
    }
    next();
}

export default validationLogin;