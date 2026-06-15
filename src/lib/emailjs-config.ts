// EmailJS Configuration
// Set these values after creating EmailJS account and templates

export const EMAILJS_CONFIG = {
  // Get these from: https://dashboard.emailjs.com
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateIds: {
    ownerNotification: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OWNER || '',
    customerReply: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_REPLY || '',
  },
};

export const CONTACT_INFO = {
  name: 'Pavan Kumar Inturi',
  title: 'Promoter & Developer, UV Infra',
  email: 'Pavankumarinturi@uv-infra.com',
  phones: ['+91 73860 86043', '+91 95059 44456'],
  address: '2Gether Heights (Ekam & Dviyam Block), UV\'s Pearl, Ameenpur, Hyderabad – 502032, Telangana',
  website: 'https://uv-infra.com',
  whatsapp: '+917386086043',
};

export const EMAIL_TEMPLATES = {
  ownerNotification: {
    subject: 'New Enquiry from {{from_name}} – {{project}}',
    templateVars: {
      to_email: CONTACT_INFO.email,
      from_name: '',
      from_email: '',
      from_phone: '',
      project: '',
      message: '',
      submitted_at: new Date().toLocaleString('en-IN'),
    },
  },
  customerReply: {
    subject: 'Thank you for contacting UV Infra, {{from_name}}!',
    templateVars: {
      to_email: '',
      from_name: '',
      project: '',
      from_phone: '',
      message: '',
      submitted_at: new Date().toLocaleString('en-IN'),
    },
  },
};
