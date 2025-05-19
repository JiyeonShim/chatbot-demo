export default async function handler(req, res) {
  const { text } = req.body;

  const ttsResponse = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${process.env.VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.3,
          similarity_boost: 0.8,
        },
      }),
    }
  );

  const audioBuffer = await ttsResponse.arrayBuffer();
  const base64Audio = Buffer.from(audioBuffer).toString("base64");
  res.status(200).json({ audioUrl: `data:audio/mpeg;base64,${base64Audio}` });
}