# EmailJS Setup Guide

## Quick Setup Steps:

1. **Create EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Create Email Service**
   - Go to "Email Services" in dashboard
   - Add your email service (Gmail, Outlook, etc.)
   - Note down your Service ID

3. **Create Email Template**
   - Go to "Email Templates" in dashboard
   - Create new template with these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - Message content
     - `{{to_name}}` - Your name (Zayed)
     - `{{reply_to}}` - Reply-to email
     - `{{subject}}` - Email subject line
   - **Template Example:**
     ```
     Subject: {{subject}}
     
     Hello {{to_name}},
     
     You received a new message from your portfolio contact form:
     
     From: {{from_name}} ({{from_email}})
     Message: {{message}}
     
     Reply directly to: {{reply_to}}
     ```
   - Note down your Template ID

4. **Get Public Key**
   - Go to "Account" → "General"
   - Copy your Public Key

5. **Update Configuration**
   - Replace these values in `src/components/CafeInterior.tsx`:
     ```javascript
     const serviceId = 'service_your_service_id'; // Your actual service ID
     const templateId = 'template_your_template_id'; // Your actual template ID  
     const publicKey = 'your_public_key'; // Your actual public key
     ```

6. **Install EmailJS Package**
   ```bash
   npm install @emailjs/browser
   ```

7. **Uncomment EmailJS Code**
   - Uncomment the import line: `import emailjs from '@emailjs/browser';`
   - Uncomment the actual send call: `await emailjs.send(serviceId, templateId, templateParams, publicKey);`
   - Remove the simulation code

## Current Status:
- ✅ Email visibility fixed (now always visible)
- ✅ Form validation working
- ✅ Loading states implemented
- ✅ Error handling added
- ⏳ EmailJS integration ready (needs your credentials)

## Fallback:
Currently the form shows a success message after 1 second. Once you add your EmailJS credentials, it will send real emails!
