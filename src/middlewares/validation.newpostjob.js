import { body, validationResult } from "express-validator";

const validationNewpostjob = async(req, res, next) => {
    const rules =[
        body("job_category").notEmpty().withMessage("Job category is required"),
        body("job_designation").notEmpty().withMessage("Job designation is required"),
        body("job_location").notEmpty().withMessage("Job location is required"),
        body("company_name").notEmpty().withMessage("Company name is required"),
        body("salary").notEmpty().withMessage("Salary should be Positive or Grater then Zero Number"),
        body("number_of_openings").isFloat({gt:0}).withMessage("Number of openings should be grater then zero"),
        body("skills_required").notEmpty().withMessage("Skills required filed should be selected at least one skill"),
        body("apply_by").notEmpty().withMessage("Apply Date is required")
    ];
    await Promise.all(rules.map(rule=>rule.run(req)));

    var validationErrorsonnewpost = validationResult(req);
    if(!validationErrorsonnewpost.isEmpty()){
        return res.render("pagenotfound",{
            errorMessage:validationErrorsonnewpost.array()[0].msg
        });
    }else{
        next();
    }    
}

export default validationNewpostjob;