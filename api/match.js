export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { skills } = req.body;
  if (!skills || !skills.trim()) {
    return res.status(400).json({ error: '입력값이 없습니다.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
  }

  const roles = [
    "Device Driver Software Engineer",
    "Firmware Software Engineer",
    "Vector Library Engineer",
    "Design Verification Engineer",
    "SoC / RTL Design Engineer",
    "SoC Firmware Engineer",
    "Vector Database Engineer",
    "Storage System Software Engineer",
    "Quality Assurance Engineer",
    "Optimization Engineer",
    "DevOps Engineer",
    "System Architect"
  ];

  const prompt = `당신은 채용 전문가입니다. 아래 직무 리스트 중 지원자의 경험에 가장 적합한 직무 하나를 JSON 형식으로만 답하세요. 다른 텍스트나 마크다운 없이 JSON만 출력하세요.

직무 리스트: ${roles.join(', ')}

지원자 경험: ${skills}

응답 형식 (JSON만):
{"recommendedRole": "직무명", "reason": "이유(한글 2문장)"}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiText) {
      return res.status(500).json({ error: '분석 결과를 받지 못했습니다.' });
    }

    const cleanJson = aiText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Gemini API error:', err);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
