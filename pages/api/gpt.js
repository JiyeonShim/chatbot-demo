export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { input } = req.body;

  const prompt = `You are Haniel, a celestial clerk with a dry tone.
Speak briefly, sarcastically, and sound slightly tired.
User: ${input}
Haniel:`;

  try {
    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!gptRes.ok) {
      return res.status(gptRes.status).json({ error: 'OpenAI request failed' });
    }

    const data = await gptRes.json();

    return res.status(200).json({
      message: data.choices[0].message.content.trim()
    });
  } catch (error) {
    console.error('🔥 GPT API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
