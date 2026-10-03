// Branded emails: the visitor confirmation and the internal admin notification.
// The leading underscore keeps Vercel from exposing this file as an API route.
//
// Built to survive real mail clients, not just browsers:
//  - Tables + inline styles + bgcolor attributes (Outlook for Windows renders
//    with Word's engine, which ignores most modern CSS).
//  - A fixed-width "ghost" table inside MSO conditionals, because Word ignores
//    max-width. VML button, since Word ignores padding on links.
//  - Line breaks as <br> (Word ignores white-space:pre-wrap).
//  - Dark mode three ways: prefers-color-scheme (Apple Mail, iOS, Outlook for
//    Mac, new Outlook), [data-ogsc]/[data-ogsb] (Outlook.com and the Outlook
//    mobile apps), and colours that still read well when Gmail or classic
//    Outlook invert them on their own.

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
  accentSoft: '#9a4bf5',
  accentTint: '#f2ecfc',
}

const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
// Word needs an explicit line-height rule or it adds its own spacing.
const MSO = 'mso-line-height-rule:exactly;'

// Dark-mode palette. Each rule is written twice below: once for clients that
// honour prefers-color-scheme, once for Outlook.com / Outlook mobile.
const DARK = {
  page: '#0a090e',
  card: '#17141f',
  ink: '#f5f3f8',
  inkSoft: '#b4aebf',
  line: '#2a2632',
  tint: '#241a3a',
  tintTitle: '#d6bbff',
  accentText: '#b98bff',
  note: '#8f8999',
}

const TEXT_RULES = [
  ['.dm-ink', 'color', DARK.ink],
  ['.dm-soft', 'color', DARK.inkSoft],
  ['.dm-accent', 'color', DARK.accentText],
  ['.dm-tint-title', 'color', DARK.tintTitle],
  ['.dm-note', 'color', DARK.note],
  ['.dm-line', 'border-color', DARK.line],
]

const BG_RULES = [
  ['.dm-page', 'background-color', DARK.page],
  ['.dm-card', 'background-color', DARK.card],
  ['.dm-tint', 'background-color', DARK.tint],
]

const rules = (prefix, list) => list.map(([sel, prop, val]) => `${prefix}${sel} { ${prop}: ${val} !important; }`).join('\n    ')

const EMAIL_CSS = `
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
  a[x-apple-data-detectors], .x-gmail-data-detectors, .x-gmail-data-detectors * { color: inherit !important; text-decoration: none !important; }

  @media (max-width: 480px) {
    .wrap { padding: 12px 8px !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .h1 { font-size: 26px !important; line-height: 32px !important; }
    .lbl, .val { display: block !important; width: 100% !important; }
    .lbl { padding-top: 12px !important; padding-bottom: 2px !important; }
    .val { padding-top: 0 !important; padding-bottom: 4px !important; }
    .btn { width: 100% !important; }
    .btn a { display: block !important; text-align: center !important; }
  }

  /* Apple Mail, iOS Mail, Outlook for Mac, new Outlook for Windows */
  @media (prefers-color-scheme: dark) {
    body { background-color: ${DARK.page} !important; }
    ${rules('', BG_RULES)}
    ${rules('', TEXT_RULES)}
  }

  /* Outlook.com and the Outlook iOS/Android apps */
  [data-ogsb] body { background-color: ${DARK.page} !important; }
  ${rules('[data-ogsb] ', BG_RULES)}
  ${rules('[data-ogsc] ', TEXT_RULES)}
  ${rules('[data-ogsb] ', [['.dm-line', 'border-color', DARK.line]])}
`

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Escaped text with line breaks that every client (including Word) respects.
function htmlWithBreaks(value) {
  return escapeHtml(value).replace(/\r?\n/g, '<br>')
}

function spacer(height) {
  return `<tr><td height="${height}" style="height:${height}px;line-height:${height}px;font-size:1px;">&nbsp;</td></tr>`
}

// Shared frame: head, dark-mode/Outlook plumbing, header banner, card shell.
// `body` is a string of <tr> rows that go inside the white card.
function shell({ title, preheader, eyebrow, heading, intro, body, footer, outerNote }) {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>td, th, p, a, h1, div { font-family: 'Segoe UI', Arial, sans-serif !important; }</style>
<![endif]-->
<title>${title}</title>
<style>${EMAIL_CSS}</style>
</head>
<body class="dm-page" bgcolor="${COLOR.page}" style="margin:0;padding:0;width:100%;background-color:${COLOR.page};">
<div style="display:none;mso-hide:all;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px;">${preheader}</div>
<table role="presentation" class="dm-page" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.page}" style="width:100%;background-color:${COLOR.page};border-collapse:collapse;">
  <tr>
    <td class="wrap dm-page" align="center" bgcolor="${COLOR.page}" style="padding:32px 12px;background-color:${COLOR.page};">
<!--[if mso]><table role="presentation" align="center" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:collapse;">

        <!-- Header (dark in both themes, so it never needs inverting) -->
        <tr>
          <td class="px" bgcolor="${COLOR.noir}" style="background-color:${COLOR.noir};border-radius:20px 20px 0 0;padding:36px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
              <td valign="middle"><img src="${LOGO_URL}" width="40" height="40" alt="Syphar" style="display:block;width:40px;height:40px;border:0;border-radius:10px;"></td>
              <td valign="middle" style="padding-left:12px;font-family:${FONT};font-size:15px;line-height:20px;${MSO}font-weight:700;letter-spacing:4px;color:#f5f3f8;">SYPHAR</td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td class="px" bgcolor="${COLOR.noir}" style="background-color:${COLOR.noir};padding:44px 40px 46px 40px;font-family:${FONT};">
            <p style="margin:0;font-size:12px;line-height:16px;${MSO}letter-spacing:2px;text-transform:uppercase;color:${COLOR.accentSoft};font-weight:600;">${eyebrow}</p>
            <h1 class="h1" style="margin:14px 0 0 0;font-size:34px;line-height:42px;${MSO}font-weight:600;color:#f5f3f8;">${heading}</h1>
            <p style="margin:16px 0 0 0;font-size:16px;line-height:26px;${MSO}color:${COLOR.noirSoft};">${intro}</p>
          </td>
        </tr>
        <tr>
          <td height="4" bgcolor="${COLOR.accent}" style="height:4px;line-height:4px;font-size:4px;background-color:${COLOR.accent};background-image:linear-gradient(90deg,${COLOR.accentDeep},${COLOR.accent},${COLOR.accentSoft});">&nbsp;</td>
        </tr>
${body}
        <!-- Footer -->
        <tr>
          <td class="px dm-card dm-line" bgcolor="${COLOR.card}" style="background-color:${COLOR.card};border-top:1px solid ${COLOR.line};border-radius:0 0 20px 20px;padding:26px 40px 30px 40px;font-family:${FONT};">
${footer}
          </td>
        </tr>
      </table>
<!--[if mso]></td></tr></table><![endif]-->
${outerNote ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:520px;border-collapse:collapse;"><tr>
        <td align="center" class="dm-note" style="padding:20px 8px 0 8px;font-family:${FONT};font-size:12px;line-height:18px;${MSO}color:#8a8494;">${outerNote}</td>
      </tr></table>` : ''}
    </td>
  </tr>
</table>
</body>
</html>`
}

// A white-card section row.
function cardRow(inner, { top = 32, bottom = 8 } = {}) {
  return `        <tr>
          <td class="px dm-card" bgcolor="${COLOR.card}" style="background-color:${COLOR.card};padding:${top}px 40px ${bottom}px 40px;font-family:${FONT};">
${inner}
          </td>
        </tr>
`
}

function sectionLabel(text) {
  return `            <p class="dm-accent" style="margin:0;font-size:12px;line-height:16px;${MSO}letter-spacing:2px;text-transform:uppercase;color:${COLOR.accent};font-weight:600;">${text}</p>`
}

// ---------------------------------------------------------------------------
// Visitor confirmation
// ---------------------------------------------------------------------------

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
                    <td width="32" height="32" align="center" valign="middle" bgcolor="${COLOR.accent}" style="width:32px;height:32px;border-radius:16px;background-color:${COLOR.accent};color:#ffffff;font-family:${FONT};font-size:14px;line-height:32px;${MSO}font-weight:700;">${index + 1}</td>
                  </tr></table>
                </td>
                <td valign="top" style="padding:0 0 22px 0;font-family:${FONT};">
                  <p class="dm-ink" style="margin:0;font-size:16px;line-height:24px;${MSO}font-weight:600;color:${COLOR.ink};">${step.title}</p>
                  <p class="dm-soft" style="margin:4px 0 0 0;font-size:15px;line-height:24px;${MSO}color:${COLOR.inkSoft};">${step.body}</p>
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

  const body =
    cardRow(`${sectionLabel('What happens next')}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;border-collapse:collapse;">${STEPS.map(stepRow).join('')}
            </table>`, { top: 40, bottom: 8 }) +
    cardRow(`            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td class="dm-tint" bgcolor="${COLOR.accentTint}" style="background-color:${COLOR.accentTint};border-radius:14px;padding:22px 24px;font-family:${FONT};">
                  <p class="dm-tint-title" style="margin:0;font-size:16px;line-height:24px;${MSO}font-weight:600;color:${COLOR.accentDeep};">We&rsquo;ll be in touch</p>
                  <p class="dm-soft" style="margin:6px 0 0 0;font-size:15px;line-height:24px;${MSO}color:${COLOR.inkSoft};">A member of our team will contact you personally, at the email address you provided.</p>
                </td>
              </tr>
            </table>`, { top: 0, bottom: 40 })

  const footer = `            <p class="dm-ink" style="margin:0;font-size:14px;line-height:22px;${MSO}color:${COLOR.ink};font-weight:600;">The Syphar team</p>
            <p class="dm-soft" style="margin:2px 0 0 0;font-size:13px;line-height:21px;${MSO}color:${COLOR.inkSoft};">Software, AI &amp; cloud for ambitious businesses &middot; <a class="dm-accent" href="${SITE_URL}" style="color:${COLOR.accent};text-decoration:none;font-weight:600;">syphar.net</a></p>`

  return shell({
    title: 'We received your message',
    preheader: `Thanks for reaching out, ${firstName}. A member of our team will be in touch.`,
    eyebrow: 'Message received',
    heading: `Thanks, ${firstName}. We&rsquo;re on it.`,
    intro: 'Your message has reached us, and a real person is reading it right now.',
    body,
    footer,
    outerNote:
      'You are receiving this automated confirmation because you sent a message through the contact form at syphar.net. Please do not reply to this email. We only use your details to contact you about your enquiry.',
  })
}

// ---------------------------------------------------------------------------
// Internal notification sent to the team for every inquiry
// ---------------------------------------------------------------------------

// The contact form sends service interest as a first line on the message
// ("Interested in: A, B"); split it out so it can be shown as its own field.
function splitInterest(message) {
  const match = message.match(/^Interested in: (.*)\r?\n\r?\n([\s\S]*)$/)
  return match ? { interest: match[1].trim(), body: match[2].trim() } : { interest: '', body: message.trim() }
}

function detailRow(label, valueHtml) {
  return `
              <tr>
                <td class="lbl dm-soft" width="110" valign="top" style="padding:10px 0;font-family:${FONT};font-size:12px;line-height:20px;${MSO}letter-spacing:1.5px;text-transform:uppercase;color:${COLOR.inkSoft};font-weight:600;">${label}</td>
                <td class="val dm-ink" valign="top" style="padding:10px 0;font-family:${FONT};font-size:15px;line-height:22px;${MSO}color:${COLOR.ink};word-break:break-word;overflow-wrap:anywhere;">${valueHtml}</td>
              </tr>`
}

export function adminSubject(name) {
  return `New project inquiry from ${name}`
}

export function adminText({ name, email, company, budget, message }) {
  return [`Name: ${name}`, `Email: ${email}`, `Company: ${company || '—'}`, `Budget: ${budget}`, '', message].join('\n')
}

// Outlook for Windows ignores padding on links, so the button is VML there
// and a normal styled link everywhere else.
function replyButton(href) {
  return `            <table role="presentation" class="btn" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
              <td align="center" bgcolor="${COLOR.accent}" style="background-color:${COLOR.accent};border-radius:999px;">
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="50%" stroke="f" fillcolor="${COLOR.accent}">
<w:anchorlock/>
<center style="color:#ffffff;font-family:'Segoe UI',Arial,sans-serif;font-size:15px;font-weight:600;">Reply to this inquiry &rarr;</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-- -->
                <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:15px;line-height:20px;font-weight:600;color:#ffffff;text-decoration:none;">Reply to this inquiry &rarr;</a>
<!--<![endif]-->
              </td>
            </tr></table>`
}

export function adminHtml({ name, email, company, budget, message }) {
  const { interest, body: messageBody } = splitInterest(message)
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const received = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date())
  const replyHref = `mailto:${safeEmail}?subject=${encodeURIComponent('Re: your enquiry to Syphar')}`

  const rows = [
    detailRow('Name', safeName),
    detailRow(
      'Email',
      `<a class="dm-accent" href="mailto:${safeEmail}" style="color:${COLOR.accent};text-decoration:none;font-weight:600;">${safeEmail}</a>`,
    ),
    detailRow('Company', company ? escapeHtml(company) : `<span class="dm-soft" style="color:${COLOR.inkSoft};">Not provided</span>`),
    detailRow('Budget', `<strong>${escapeHtml(budget)}</strong>`),
    interest ? detailRow('Interested in', escapeHtml(interest)) : '',
  ].join('')

  const body =
    cardRow(`            <table role="presentation" class="dm-line" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-bottom:1px solid ${COLOR.line};">${rows}
            </table>`, { top: 32, bottom: 8 }) +
    cardRow(`${sectionLabel('Their message')}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;border-collapse:collapse;">
              <tr>
                <td class="dm-tint dm-ink" bgcolor="${COLOR.accentTint}" style="background-color:${COLOR.accentTint};border-left:4px solid ${COLOR.accent};border-radius:6px 14px 14px 6px;padding:20px 24px;font-family:${FONT};font-size:16px;line-height:26px;${MSO}color:${COLOR.ink};word-break:break-word;overflow-wrap:anywhere;">${htmlWithBreaks(messageBody)}</td>
              </tr>
            </table>`, { top: 28, bottom: 8 }) +
    cardRow(`${replyButton(replyHref)}
            <p class="dm-soft" style="margin:14px 0 0 0;font-size:13px;line-height:20px;${MSO}color:${COLOR.inkSoft};">We promised a reply within one business day.</p>`, { top: 28, bottom: 40 })

  const footer = `            <p class="dm-soft" style="margin:0;font-size:13px;line-height:20px;${MSO}color:${COLOR.inkSoft};">Internal notification &middot; the visitor has been sent an automatic confirmation.</p>`

  return shell({
    title: 'New project inquiry',
    preheader: `New inquiry from ${safeName}${company ? ` at ${escapeHtml(company)}` : ''}. Reply within one business day.`,
    eyebrow: 'New inquiry',
    heading: `${safeName} would like to talk.`,
    intro: `Received ${received} IST &middot; via the syphar.net contact form`,
    body,
    footer,
  })
}
