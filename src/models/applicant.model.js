

export var applicantData = [{
    name: 'John',
    email: 'Johnrob@gmail.com',
    contact: '9012345678',
    id: "0",
    resume: "1694438194372-sample.pdf"
  }];


export default class ApplicantModel {
    constructor(name, email, contact, resume) {
        this.id = applicantData.length + 1;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resume = resume;
    }

    getApplicant(req, res) {
        var parmsidforjoblist = (req.params.id)-1;
        res.render("applicantpage", { applicantData: applicantData, parmsidforjoblist: parmsidforjoblist })
    }
    
    postApllicant(req, res, next) {
        const data = req.body;
        const count = req.params.id-1; 
        // const count = applicantData.length + 1;
        data.id = String(count)
        data.resume = String(req.file.filename);
        applicantData.push(data);
        next();
    }
} 
