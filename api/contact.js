// ============================================================
// Apexly Consulting — Contact Form API
// File: /api/contact.js  (Vercel Serverless Function)
//
// Receives form submissions and logs them to Notion.
// ============================================================

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, businessName, goals } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: {
          database_id: process.env.NOTION_DATABASE_ID,
        },
        properties: {
          Name: {
            title: [{ text: { content: name } }],
          },
          Email: {
            email: email,
          },
          'Business Name': {
            rich_text: [{ text: { content: businessName || '' } }],
          },
          Goals: {
            rich_text: [{ text: { content: goals || '' } }],
          },
        },
      }),
    });

    const responseText = await notionRes.text();

    if (!notionRes.ok) {
      console.error('Notion error:', responseText);
      return res.status(500).json({
        error: 'Could not save your message. Please email us at hello@apexlyconsulting.com',
      });
    }

    return res.status(200).json({ success: true, message: 'Message received!' });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Something went wrong. Please email us at hello@apexlyconsulting.com',
    });
  }
}
