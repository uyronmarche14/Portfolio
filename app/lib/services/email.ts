import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
};

const assertConfigured = (): void => {
  if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
    throw new Error('EmailJS is not configured (NEXT_PUBLIC_EMAILJS_* env vars missing).');
  }
};

export interface EmailParams {
  from_email: string;
  to_email: string;
  message: string;
  reply_to: string;
  from_name?: string;
  subject?: string;
}

export const sendEmail = async (params: EmailParams): Promise<void> => {
  assertConfigured();
  try {
    const templateParams = {
      from_email: params.from_email,
      to_email: params.to_email,
      message: params.message,
      reply_to: params.reply_to,
      from_name: params.from_name || 'Portfolio Visitor',
      subject: params.subject || 'New Client Inquiry from Portfolio',
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    void result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email. Please try again.');
  }
};

export const initializeEmailJS = (): void => {
  if (!EMAILJS_CONFIG.PUBLIC_KEY) return;
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};