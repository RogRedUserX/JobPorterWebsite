
import nodemailer from "nodemailer";
import fs from "fs";

export default async function sendMail(req, res, next){
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'codingninjas2k16@gmail.com',
        pass: 'slwvvlczduktvhdj',
        },
    });
    
    // Read the image file as a base64 string
    const imageFilePath = 'public/images/email.avif';
    const imageBase64 = fs.readFileSync(imageFilePath, { encoding: 'base64' });
    
    // Create an HTML email with the embedded image
    const mailOptions = {
        from: 'codingninjas2k16@gmail.com',
        to: req.body.email,
        subject: 'Job Application Received',
        html: `<html>
                <body>
                    <img width='300' height='300' src="data:image/avif;base64,${imageBase64}" alt="Embedded Image">
                    <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold;">Dear User,</p>
                    <p>Thank you for applying to a job at Jobportal. We have received your application and are currently reviewing it.</p>
                    <p>If your qualifications match our requirements, we will contact you for the next steps of the selection process.</p>
                    <p>Thank you for your interest in joining our team!</p>
                    <p>Best regards,</p>
                    <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">The Jobportal Team</p>
                </body>
                </html>`,        
    };
    
    // Send the email
    try{
        const result = await transporter.sendMail(mailOptions);
    }catch (err) {
        console.log("email send failed with error" + err)
    }
    next();
}  

