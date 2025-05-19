import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [audioUrl, setAudioUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!input.trim()) return
    setLoading(true)
    setResponse('')
    setAudioUrl(null)

    try {
      const gptRes = await fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      })

      if (!gptRes.ok) throw new Error(`GPT Error ${gptRes.status}`)
      const gptData = await gptRes.json()
      setResponse(gptData.message)

      const ttsRes = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: gptData.message })
      })

      if (!ttsRes.ok) throw new Error(`TTS Error ${ttsRes.status}`)
      const ttsData = await ttsRes.json()
      setAudioUrl(ttsData.audioUrl)
    } catch (err) {
      console.error('⚠️ Error:', err)
      setResponse('⚠️ 하니엘이 말을 잃었어요...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Haniel Voice Demo</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="하니엘에게 말 걸기..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '생각 중...' : '하니엘의 대답 듣기'}
      </button>
      <p>{response}</p>
      {audioUrl && <audio controls src={audioUrl} autoPlay />}
    </div>
  )
}
