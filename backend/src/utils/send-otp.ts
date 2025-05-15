import transporter, { accountEMail } from "../config/nodemailer";
import { sendOtpProps } from "../types/types";


export function generateOTP(): number {
  return Math.floor(Math.random() * 1000000); 
}


export const sendOtpEmail = async ({email, otp}: sendOtpProps) => {
    const mailOptions = {
        from: accountEMail ,
        to: email,
        subject: 'Your OTP for Registration',
        text: `Your OTP is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }

}

