import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env';

export const accountEMail = 'ajiboyemuyideen7@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: accountEMail ,
        pass: EMAIL_PASSWORD
    }
})

export default transporter