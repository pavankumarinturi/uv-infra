# SETUP_EMAILJS.md — Make the Enquiry Form Send Real Emails

## What is EmailJS?

EmailJS lets your HTML form send real emails **without any backend server**.
It's 100% free for up to **200 emails/month** — more than enough for UV Infra.

```
Customer fills form → EmailJS → 2 emails sent simultaneously:
                              1. Notification to Pavankumarinturi@uv-infra.com
                              2. Auto-reply confirmation to customer
```

---

## PHASE 1 — Create EmailJS Account (5 minutes)

### Step 1: Sign Up
1. Go to **https://emailjs.com**
2. Click **Sign Up** (top right) → use your Gmail: `Pavankumarinturi@uv-infra.com`
3. Verify your email → log in

---

## PHASE 2 — Connect Your Gmail (3 minutes)

### Step 2: Add Email Service
1. In EmailJS dashboard → click **Email Services** (left sidebar)
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account** → sign in with `Pavankumarinturi@uv-infra.com`
5. Allow permissions
6. **Service Name:** `UV Infra Gmail`
7. Click **Create Service**
8. ✅ Copy the **Service ID** (looks like: `service_abc1234`) — save it

---

## PHASE 3 — Create Template 1: Owner Notification (5 minutes)

This email goes to **YOU** (Pavan) whenever someone submits the form.

### Step 3: Create Owner Notification Template
1. Click **Email Templates** (left sidebar) → **Create New Template**
2. Fill in:

**Template Name:** `UV Infra - New Enquiry Notification`

**Subject:**
```
New Enquiry from {{from_name}} – {{project}}
```

**Content (copy exactly):**
```
New Enquiry Received — UV Infra Website
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name:     {{from_name}}
📞 Phone:    {{from_phone}}
📧 Email:    {{from_email}}
🏢 Project:  {{project}}
🕐 Time:     {{submitted_at}}

💬 Message:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reply directly to this email to respond to the customer.
UV Infra Website — uv-infra.com
```

3. In the **To Email** field: `Pavankumarinturi@uv-infra.com`
4. In the **From Name** field: `UV Infra Website`
5. In the **Reply To** field: `{{from_email}}`  ← so you can reply directly to customer!
6. Click **Save**
7. ✅ Copy the **Template ID** (looks like: `template_notify123`) — save it

---

## PHASE 4 — Create Template 2: Auto-Reply to Customer (5 minutes)

This email goes **automatically to the customer** confirming their enquiry.

### Step 4: Create Auto-Reply Template
1. Click **Email Templates** → **Create New Template** again
2. Fill in:

**Template Name:** `UV Infra - Customer Auto Reply`

**Subject:**
```
Thank you for contacting UV Infra, {{from_name}}!
```

**Content (copy exactly):**
```
Dear {{from_name}},

Thank you for reaching out to UV Infra! 🏠

We have received your enquiry and our team will get back to you
within 24 hours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR ENQUIRY DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project Interested: {{project}}
Your Phone:         {{from_phone}}
Submitted On:       {{submitted_at}}

Your Message:
{{message}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HAPPENS NEXT?
✅ Our team reviews your enquiry
✅ We call you within 24 hours
✅ We schedule a personal site visit at your convenience

For urgent queries, contact us directly:
📞 +91 73860 86043 (Pavan Kumar Inturi)
📞 +91 95059 44456
📍 2Gether Heights, Ameenpur, Hyderabad – 502032

Visit our website: https://uv-infra.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated confirmation. Please do not reply to this email.
For queries, call us or WhatsApp: +91 73860 86043

Warm regards,
Pavan Kumar Inturi
Promoter & Developer — UV Infra
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

3. In the **To Email** field: `{{from_email}}`  ← sends to the customer!
4. In the **From Name** field: `UV Infra — Pavan Kumar Inturi`
5. Click **Save**
6. ✅ Copy the **Template ID** (looks like: `template_reply456`) — save it

---

## PHASE 5 — Get Your Public Key (1 minute)

### Step 5: Copy Public Key
1. In EmailJS dashboard → click your **Account** (top right icon)
2. Click **API Keys** tab
3. ✅ Copy the **Public Key** (looks like: `user_aBcDeFgHiJkL`) — save it

---

## PHASE 6 — Update Your index.html (2 minutes)

### Step 6: Replace Placeholders

Open `index.html` in VS Code (or any text editor).
Find this section near the top of the `<script>` block at the bottom:

```javascript
(function(){
  emailjs.init({ publicKey: 'YOUR_EMAILJS_PUBLIC_KEY' });
})();
```

Replace `YOUR_EMAILJS_PUBLIC_KEY` with your real Public Key.

Then find:
```javascript
const EMAILJS_SERVICE_ID      = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_OWNER  = 'YOUR_TEMPLATE_OWNER';
const EMAILJS_TEMPLATE_REPLY  = 'YOUR_TEMPLATE_REPLY';
```

Replace all 3 with your real values:

```javascript
const EMAILJS_SERVICE_ID      = 'service_abc1234';     // your Service ID
const EMAILJS_TEMPLATE_OWNER  = 'template_notify123';  // owner notification
const EMAILJS_TEMPLATE_REPLY  = 'template_reply456';   // auto-reply to customer
```

---

## PHASE 7 — Test It (2 minutes)

### Step 7: Test the form
1. Open `index.html` in your browser (or your live site)
2. Scroll to the **Send Us an Enquiry** form
3. Fill in all fields — use YOUR email address in the Email field
4. Click **Send Enquiry**
5. Check:
   - ✅ `Pavankumarinturi@uv-infra.com` receives the notification email
   - ✅ YOUR email receives the auto-reply confirmation

---

## PHASE 8 — Push to GitHub → Auto-Deploy (1 minute)

### Step 8: Deploy the updated file
```bash
cd D:\Learning\uv-infra
git add .
git commit -m "Add EmailJS form with owner notification and auto-reply"
git push
```

Vercel auto-deploys within 60 seconds. Your live site at `uv-infra.vercel.app`
will now send real emails when the form is submitted!

---

## Summary of Values to Collect

| What | Looks Like | Where to Find |
|------|-----------|---------------|
| Public Key | `user_aBcDeFgH...` | EmailJS → Account → API Keys |
| Service ID | `service_abc1234` | EmailJS → Email Services |
| Owner Template ID | `template_notify123` | EmailJS → Email Templates |
| Reply Template ID | `template_reply456` | EmailJS → Email Templates |

---

## EmailJS Free Plan Limits

| Feature | Free Limit |
|---------|-----------|
| Emails/month | 200 |
| Templates | Unlimited |
| Services | 2 |
| Support | Community |

200 emails/month = ~6-7 enquiries per day. **More than enough for UV Infra.**

If you grow beyond 200/month (great problem to have!), upgrade to Starter plan ($15/month) for 1,000 emails/month.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Form shows error | Check all 4 placeholder values are replaced with real ones |
| Email not received | Check spam folder; verify Gmail service is connected |
| "Service not found" | Double-check Service ID spelling |
| "Template not found" | Double-check Template IDs spelling |
| Works locally, not on live site | Re-push to GitHub and wait 1 min for Vercel to redeploy |