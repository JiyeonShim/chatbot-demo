// pages/api/gpt.js
export default function handler(req, res) {
  // 요청 메서드 로깅
  console.log('Request method:', req.method);
  
  // 모든 메서드 허용 (테스트용)
  if (req.method === 'POST') {
    try {
      // POST 요청 처리
      const { input } = req.body;
      
      // 테스트 응답 (OpenAI API 호출 없이)
      return res.status(200).json({ message: `Echo: ${input || 'No input provided'}` });
      
      // 실제 API 호출은 잠시 주석 처리
      /*
      const prompt = `You are Haniel, a celestial clerk with a dry tone. Speak briefly.\nUser: ${input}\nHaniel:`;
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await response.json();
      res.status(200).json({ message: data.choices[0].message.content.trim() });
      */
    } catch (error) {
      console.error('API handler error:', error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    // GET 요청 처리 (테스트용)
    res.status(200).json({ status: 'API is running' });
  } else {
    // 다른 메서드 처리
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
