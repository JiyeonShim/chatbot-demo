export default async function handler(req, res) {
  const { input } = req.body;
  const prompt = `You are Haniel, a celestial clerk with a dry tone.
Speak briefly, sarcastically, and sound slightly tired.
User: ${input}
Haniel:`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  res.status(200).json({ message: data.choices[0].message.content.trim() });
}