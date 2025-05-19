export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text } = req.body;

  try {
    const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.3,
          similarity_boost: 0.8
        }
      })
    });

    if (!ttsRes.ok) {
      return res.status(ttsRes.status).json({ error: 'TTS request failed' });
    }

    const audioBuffer = await ttsRes.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');

    return res.status(200).json({
      audioUrl: `data:audio/mpeg;base64,${base64Audio}`
    });
  } catch (err) {
    console.error('🔥 TTS Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
