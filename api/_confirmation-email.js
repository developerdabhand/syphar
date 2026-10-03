// Branded "we received your message" email sent to the visitor. The leading
// underscore keeps Vercel from exposing this file as an API route.
//
// Email clients ignore most modern CSS, so this is table-based with inline
// styles and solid fallback colours. Colours and logo match the site.

const SITE_URL = 'https://syphar.net'
const LOGO_URL = `${SITE_URL}/logo-192.png`

const COLOR = {
  page: '#f4f1f8',
  card: '#ffffff',
  noir: '#0e0c13',
  noirSoft: '#a8a2b3',
  ink: '#16141c',
  inkSoft: '#5c5766',
  line: '#e7e1ed',
  accent: '#7c1fef',
  accentDeep: '#57119e',
  accentTint: '#f2ecfc',
}

const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

// Phone tweaks. Inline styles carry the desktop look, so these need !important.
// Clients that drop <style> (some webmail) just show the desktop layout, which
// is already fluid (width:100% up to 600px).
const MOBILE_CSS = `
  body { -webkit-text-size-adjust: 100%; }
  .wrap { padding: 12px 8px !important; }
  .px { padding-left: 24px !important; padding-right: 24px !important; }
  .h1 { font-size: 26px !important; line-height: 1.25 !important; }
  .lbl, .val { display: block !important; width: 100% !important; padding-top: 0 !important; padding-bottom: 0 !important; }
  .lbl { padding-top: 12px !important; padding-bottom: 2px !important; }
  .val { padding-bottom: 4px !important; }
  .btn a { display: block !important; text-align: center !important; }
  .btn { width: 100% !important; }
`

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const STEPS = [
  {
    title: 'We read it',
    body: 'An engineer, not a sales script, goes through your message and works out what you are really trying to build.',
  },
  {
    title: 'We reply within one business day',
    body: 'You will hear back from us with questions, initial thoughts, or a suggested time to talk.',
  },
  {
    title: 'We shape the approach together',
    body: 'No obligation. We help you find the right technical direction, whether or not we end up working together.',
  },
]

function stepRow(step, index) {
  return `
    <tr>
      <td width="44" valign="top" style="padding:0 0 22px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="32" height="32" align="center" valign="middle" bgcolor="${COLOR.accent}" style="width:32px;height:32px;border-radius:16px;background:${COLOR.accent};color:#ffffff;font-family:${FONT};font-size:14px;font-weight:700;line-height:32px;">${index + 1}</td>
        </tr></table>
      </td>
      <td valign="top" style="padding:0 0 22px 0;font-family:${FONT};">
        <div style="font-size:16px;font-weight:600;color:${COLOR.ink};line-height:1.4;">${step.title}</div>
        <div style="margin-top:4px;font-size:14.5px;color:${COLOR.inkSoft};line-height:1.6;">${step.body}</div>
      </td>
    </tr>`
}

export function confirmationSubject() {
  return 'We received your message — Syphar'
}

export function confirmationText(name) {
  return [
    `Hi ${name},`,
    '',
    'Thank you for reaching out to Syphar. Your message has reached us and a real person is reading it.',
    '',
    'What happens next:',
    ...STEPS.map((s, i) => `${i + 1}. ${s.title} - ${s.body}`),
    '',
    'A member of our team will contact you personally, at the email address you provided.',
    '',
    '— The Syphar team',
    SITE_URL,
  ].join('\n')
}

export function confirmationHtml(name) {
  const firstName = escapeHtml(name.split(/\s+/)[0] || name)
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<style>${MOBILE_CSS}</style>
<title>We received your message</title>
</head>
<body style="margin:0;padding:0;background:${COLOR.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
  Thanks for reaching out, ${firstName}. An engineer will reply within one business day.
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.page}" style="background:${COLOR.page};">
  <tr>
    <td class="wrap" align="center" style="padding:32px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

        <!-- Header -->
        <tr>
          <td class="px" bgcolor="${COLOR.noir}" style="background:${COLOR.noir};border-radius:20px 20px 0 0;padding:36px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
              <td valign="middle"><img src="${LOGO_URL}" width="40" height="40" alt="Syphar" style="display:block;border:0;border-radius:10px;"></td>
              <td valign="middle" style="padding-left:12px;font-family:${FONT};font-size:15px;font-weight:700;letter-spacing:0.28em;color:#f5f3f8;">SYPHAR</td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td class="px" bgcolor="${COLOR.noir}" style="background:${COLOR.noir};padding:44px 40px 48px 40px;font-family:${FONT};">
            <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#9a4bf5;font-weight:600;">Message received</div>
            <h1 class="h1" style="margin:14px 0 0 0;font-size:34px;line-height:1.2;font-weight:600;color:#f5f3f8;">Thanks, ${firstName}. We&rsquo;re on it.</h1>
            <p style="margin:18px 0 0 0;font-size:16px;line-height:1.7;color:${COLOR.noirSoft};">
              Your message has reached us, and a real person is reading it right now.
            </p>
          </td>
        </tr>
        <tr>
          <td bgcolor="${COLOR.accent}" height="4" style="height:4px;line-height:4px;font-size:4px;background:${COLOR.accent};background-image:linear-gradient(90deg,${COLOR.accentDeep},${COLOR.accent},#9a4bf5);">&nbsp;</td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="px" bgcolor="${COLOR.card}" style="background:${COLOR.card};padding:40px 40px 8px 40px;">
            <div style="font-family:${FONT};font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${COLOR.accent};font-weight:600;">What happens next</div>
            <div style="height:20px;line-height:20px;font-size:20px;">&nbsp;</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${STEPS.map(stepRow).join('')}
            </table>
          </td>
        </tr>

        <!-- Reassurance -->
        <tr>
          <td class="px" bgcolor="${COLOR.card}" style="background:${COLOR.card};padding:0 40px 40px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="${COLOR.accentTint}" style="background:${COLOR.accentTint};border-radius:14px;padding:22px 24px;font-family:${FONT};">
                  <div style="font-size:15px;font-weight:600;color:${COLOR.accentDeep};">We&rsquo;ll be in touch</div>
                  <div style="margin-top:6px;font-size:14.5px;line-height:1.6;color:${COLOR.inkSoft};">
                    A member of our team will contact you personally, at the email address you provided.
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="px" bgcolor="${COLOR.card}" style="background:${COLOR.card};border-top:1px solid ${COLOR.line};border-radius:0 0 20px 20px;padding:28px 40px 32px 40px;font-family:${FONT};">
            <div style="font-size:14px;line-height:1.6;color:${COLOR.ink};font-weight:600;">The Syphar team</div>
            <div style="margin-top:2px;font-size:13px;line-height:1.6;color:${COLOR.inkSoft};">
              Software, AI &amp; cloud for ambitious businesses &middot;
              <a href="${SITE_URL}" style="color:${COLOR.accent};text-decoration:none;font-weight:600;">syphar.net</a>
            </div>
          </td>
        </tr>
      </table>

      <div style="max-width:520px;margin:20px auto 0 auto;font-family:${FONT};font-size:12px;line-height:1.6;color:#8a8494;">
        You are receiving this automated confirmation because you sent a message through the contact form at
        syphar.net. Please do not reply to this email. We only use your details to contact you about your enquiry.
      </div>
    </td>
  </tr>
</table>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// Internal notification sent to the team for every inquiry.
// ---------------------------------------------------------------------------

// The contact form sends service interest as a first line on the message
// ("Interested in: A, B"); split it out so it can be shown as its own field.
function splitInterest(message) {
  const match = message.match(/^Interested in: (.*)\n\n([\s\S]*)$/)
  return match ? { interest: match[1].trim(), body: match[2].trim() } : { interest: '', body: message.trim() }
}

function detailRow(label, valueHtml) {
  return `
    <tr>
      <td class="lbl" width="110" valign="top" style="padding:10px 0;font-family:${FONT};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${COLOR.inkSoft};font-weight:600;">${label}</td>
      <td class="val" valign="top" style="padding:10px 0;font-family:${FONT};font-size:15px;line-height:1.5;color:${COLOR.ink};word-break:break-word;overflow-wrap:anywhere;">${valueHtml}</td>
    </tr>`
}

export function adminSubject(name) {
  return `New project inquiry from ${name}`
}

export function adminText({ name, email, company, message }) {
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || '\u2014'}`,
    '',
    message,
  ].join('\n')
}

export function adminHtml({ name, email, company, message }) {
  const { interest, body } = splitInterest(message)
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const firstName = escapeHtml(name.split(/\s+/)[0] || name)
  const received = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date())
  const replyHref = `mailto:${safeEmail}?subject=${encodeURIComponent('Re: your enquiry to Syphar')}`

  const rows = [
    detailRow('Name', safeName),
    detailRow('Email', `<a href="mailto:${safeEmail}" style="color:${COLOR.accent};text-decoration:none;font-weight:600;">${safeEmail}</a>`),
    detailRow('Company', company ? escapeHtml(company) : `<span style="color:${COLOR.inkSoft};">Not provided</span>`),
    interest ? detailRow('Interested in', escapeHtml(interest)) : '',
  ].join('')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<style>${MOBILE_CSS}</style>
<title>New project inquiry</title>
</head>
<body style="margin:0;padding:0;background:${COLOR.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
  New inquiry from ${safeName}${company ? ` at ${escapeHtml(company)}` : ''}. Reply within one business day.
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.page}" style="background:${COLOR.page};">
  <tr>
    <td class="wrap" align="center" style="padding:32px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

        <!-- Header -->
        <tr>
          <td class="px" bgcolor="${COLOR.noir}" style="background:${COLOR.noir};border-radius:20px 20px 0 0;padding:36px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
              <td valign="middle"><img src="${LOGO_URL}" width="40" height="40" alt="Syphar" style="display:block;border:0;border-radius:10px;"></td>
              <td valign="middle" style="padding-left:12px;font-family:${FONT};font-size:15px;font-weight:700;letter-spacing:0.28em;color:#f5f3f8;">SYPHAR</td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td class="px" bgcolor="${COLOR.noir}" style="background:${COLOR.noir};padding:40px 40px 44px 40px;font-family:${FONT};">
            <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#9a4bf5;font-weight:600;">New inquiry</div>
            <h1 class="h1" style="margin:14px 0 0 0;font-size:32px;line-height:1.2;font-weight:600;color:#f5f3f8;">${safeName} would like to talk.</h1>
            <p style="margin:16px 0 0 0;font-size:14px;line-height:1.7;color:${COLOR.noirSoft};">
              Received ${received} IST &middot; via the syphar.net contact form
            </p>
          </td>
        </tr>
        <tr>
          <td bgcolor="${COLOR.accent}" height="4" style="height:4px;line-height:4px;font-size:4px;background:${COLOR.accent};background-image:linear-gradient(90deg,${COLOR.accentDeep},${COLOR.accent},#9a4bf5);">&nbsp;</td>
        </tr>

        <!-- Details -->
        <tr>
          <td class="px" bgcolor="${COLOR.card}" style="background:${COLOR.card};padding:32px 40px 8px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid ${COLOR.line};">${rows}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td class="px" bgcolor="${COLOR.card}" style="background:${COLOR.card};padding:28px 40px 8px 40px;">
            <div style="font-family:${FONT};font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${COLOR.accent};font-weight:600;">Their message</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;">
              <tr>
                <td bgcolor="${COLOR.accentTint}" style="background:${COLOR.accentTint};border-left:4px solid ${COLOR.accent};border-radius:6px 14px 14px 6px;padding:20px 24px;font-family:${FONT};font-size:15.5px;line-height:1.7;color:${COLOR.ink};white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(body)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Action -->
        <tr>
          <td class="px" bgcolor="${COLOR.card}" style="background:${COLOR.card};padding:28px 40px 40px 40px;">
            <table class="btn" role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
              <td bgcolor="${COLOR.accent}" style="background:${COLOR.accent};border-radius:999px;">
                <a href="${replyHref}" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">Reply to ${firstName} &rarr;</a>
              </td>
            </tr></table>
            <div style="margin-top:14px;font-family:${FONT};font-size:13px;line-height:1.6;color:${COLOR.inkSoft};">
              We promised a reply within one business day.
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="px" bgcolor="${COLOR.card}" style="background:${COLOR.card};border-top:1px solid ${COLOR.line};border-radius:0 0 20px 20px;padding:22px 40px 26px 40px;font-family:${FONT};font-size:12.5px;line-height:1.6;color:${COLOR.inkSoft};">
            Internal notification &middot; the visitor has been sent an automatic confirmation.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}
