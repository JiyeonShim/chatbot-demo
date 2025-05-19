export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { text } = req.body

  const ttsResponse = await fetch('https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': process.env.ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text,
      voice_settings: {
        stability: 0.4,
        similarity_boost: 0.6
      }
    })
  })

  const buffer = await ttsResponse.arrayBuffer()
  const audioBase64 = Buffer.from(buffer).toString('base64')
  const audioUrl = `data:audio/mpeg;base64,${audioBase64}`

  res.status(200).json({ audioUrl })
}
