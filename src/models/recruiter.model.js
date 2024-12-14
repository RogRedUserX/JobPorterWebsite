export var recruiterData =[{
    job_category: 'Tech',
    job_designation: 'SDE',
    job_location: 'Gurgaon HR IND Remote',
    company_name: 'Coding Ninjas',
    salary: '14-20lpa',
    number_of_openings: '3',
    skills_required: [ 'React', 'NodeJs', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS' ],
    apply_by: '2023-09-13',
    id: "1"
  },{
    job_category: 'Tech',
    job_designation: 'Angular Developer',
    job_location: 'Pune IND On-Site',
    company_name: 'Go Digit',
    salary: '26-10lpa',
    number_of_openings: '4',
    skills_required: [ 'Angular', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS' ],
    apply_by: '2023-09-14',
    id: "2"
  },{
    job_category: 'Tech',
    job_designation: 'SDE',
    job_location: 'Bangalore IND',
    company_name: 'Juspay',
    salary: '20-26lpa',
    number_of_openings: '1',
    skills_required: [ 'React', 'NodeJs', 'JS', 'MongoDB', 'Express', 'JS', 'AWS' ],
    apply_by: '2023-09-20',
    id: "3"
  }];




export default class RecruiterModel {
    constructor(company_name, job_category, job_designation, job_location, salary, skills_required) {
        this.id = recruiterData.length + 1;
        this.company_name = company_name;
        this.job_category = job_category;
        this.job_designation = job_designation;
        this.job_location = job_location;
        this.salary = salary;
        this.skills_required = skills_required;
    }

    postRecruiterData(req, res) {
        const data = req.body;
        data.id = String(recruiterData.length + 1);
        recruiterData.push(data);
        res.render("jobpage",{
            recruiterData
        })
    }

    editpostRecruiterData(req, res) {
      let data = req.body;
      data.id = req.params.id;
      Object.assign(recruiterData[req.params.id-1], data);
      res.render("jobpage",{
        recruiterData
      })
    }

} 