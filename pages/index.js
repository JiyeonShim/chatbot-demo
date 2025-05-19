
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

    const gpt = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    })
    const gptData = await gpt.json()
    setResponse(gptData.message)

    const tts = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: gptData.message })
    })
    const ttsData = await tts.json()
    setAudioUrl(ttsData.audioUrl)
    setLoading(false)
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
