import { sendOtpEmail, generateOTP } from '../src/utils/send-otp';
import transporter from '../src/config/nodemailer';

jest.mock('../src/config/nodemailer');

describe('send-otp utilities', () => {
  describe('generateOTP()', () => {
    it('should generate a 6-digit number', () => {
      const otp = generateOTP();
      expect(otp).toBeGreaterThanOrEqual(0);
      expect(otp).toBeLessThanOrEqual(999999);
      expect(otp.toString().length).toBeLessThanOrEqual(6);
    });
  });

  describe('sendOtpEmail()', () => {
    const mockSendMail = jest.fn();
    (transporter.sendMail as jest.Mock) = mockSendMail;

    beforeEach(() => {
      mockSendMail.mockClear();
    });

    it('should send email with correct options', async () => {
      mockSendMail.mockResolvedValue(true);
      
      await sendOtpEmail({
        email: 'test@example.com',
        otp: '123456'
      });

      expect(mockSendMail).toHaveBeenCalledWith({
        from: expect.any(String),
        to: 'test@example.com',
        subject: 'Your OTP for Registration',
        text: 'Your OTP is: 123456'
      });
    });

    it('should log success on successful send', async () => {
      mockSendMail.mockResolvedValue(true);
      const consoleSpy = jest.spyOn(console, 'log');

      await sendOtpEmail({
        email: 'test@example.com',
        otp: '123456'
      });

      expect(consoleSpy).toHaveBeenCalledWith('OTP sent to test@example.com');
    });

    it('should handle errors gracefully', async () => {
      mockSendMail.mockRejectedValue(new Error('SMTP error'));
      const consoleSpy = jest.spyOn(console, 'error');

      await sendOtpEmail({
        email: 'test@example.com',
        otp: '123456'
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error sending email:',
        expect.any(Error)
      );
    });
  });
});