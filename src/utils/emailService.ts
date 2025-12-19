// src/utils/emailService.ts
import emailjs from '@emailjs/browser';

// 🔐 EmailJS Configuration
// ⚠️ توی production این کلیدها رو توی environment variables بذار
const EMAILJS_CONFIG = {
  publicKey: 'g1PyWiSPSE0NBIGOn',      // از EmailJS Dashboard
  privateKey: 'feD9mk0ygOj6LqR90GPle',    // از EmailJS Dashboard  
  serviceId: 'service_q455z5k',      // مثلاً 'service_abc123'
  templateId: 'template_a0jwai4',    // مثلاً 'template_xyz789'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * ارسال ایمیل از طریق EmailJS
 */
export async function sendContactEmail(
  formData: ContactFormData
): Promise<EmailResponse> {
  try {
    // ✅ اعتبارسنجی اولیه
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
        error: 'VALIDATION_ERROR',
      };
    }

    // 📧 ارسال ایمیل
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'hamidrezadanesh1996@gmail.com', // ایمیل دریافت‌کننده
        reply_to: formData.email,
      },
      EMAILJS_CONFIG.publicKey
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Your message was sent successfully!',
      };
    }

    return {
      success: false,
      message: 'Error sending message',
      error: 'SEND_FAILED',
    };
  } catch (error: any) {
    console.error('EmailJS Error:', error);

    // 🔍 پردازش خطاهای مختلف
    let errorMessage = 'An error occurred. Please try again.';

    if (error.text) {
      errorMessage = error.text;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      error: 'NETWORK_ERROR',
    };
  }
}

/**
 * بررسی اتصال به EmailJS
 */
export async function testEmailConnection(): Promise<boolean> {
  try {
    // یه تست ساده برای چک کردن config
    return !!(
      EMAILJS_CONFIG.publicKey &&
      EMAILJS_CONFIG.serviceId &&
      EMAILJS_CONFIG.templateId
    );
  } catch {
    return false;
  }
}

/**
 * اعتبارسنجی فرمت ایمیل
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * اعتبارسنجی داده‌های فرم
 */
export function validateContactForm(
  data: ContactFormData
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'The name must be at least 2 characters long.';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email.';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  if (data.message && data.message.length > 1000) {
    errors.message ='Message should not exceed 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export default {
  sendContactEmail,
  testEmailConnection,
  validateEmail,
  validateContactForm,
};