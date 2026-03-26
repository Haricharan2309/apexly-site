// ============================================================
// Apexly Consulting — Contact Form API
// File: /api/contact.js  (Vercel Serverless Function)
//
// What this does:
//   1. Receives form submissions from your website
//   2. Sends you an email notification (via Resend — free)
//   3. Adds the lead to your Notion "Inbound Inquiries" database
// ============================================================

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, businessName, goals } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    // Step 1: Send email via Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Apexly Website <onboarding@resend.dev>',
        to: [process.env.NOTIFY_EMAIL || 'haricharan2309@gmail.com'],
        subject: `New Lead: ${name} from ${businessName || 'unknown business'}`,
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px"><h2 style="color:#00e5a0">New Inquiry on apexlyconsulting.com</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Business:</b> ${businessName || '—'}</p><p><b>Goals:</b> ${goals || '—'}</p><p style="color:#999;font-size:12px">Auto-logged in <a href="https://www.notion.so/081e3dc183e244b5abe66e7907a97ce1" style="color:#00e5a0">Notion Inbound Inquiries</a>.</p></div>`,
      }),
    });
    if (!emailRes.ok) console.error('Resend error:', await emailRes.json());

    // Step 2: Add to Notion
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: name } }] },
          Email: { email: email },
          'Business Name': { rich_text: [{ text: { content: businessName || '' } }] },
          Goals: { rich_text: [{ text: { content: goals || '' } }] },
          Status: { select: { name: 'New' } },
          Source: { rich_text: [{ text: { content: 'Website Contact Form' } }] },
        },
      }),
    });
    if (!notionRes.ok) console.error('Notion error:', await notionRes.json());

    return res.status(200).json({ success: true, message: 'Message received!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
