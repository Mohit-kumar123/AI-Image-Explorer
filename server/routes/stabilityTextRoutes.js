import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
        'Cohere-Version': '2022-12-06'
      },
      body: JSON.stringify({
        model: "command-r-plus", // or "command" for free tier
        message: prompt,
        max_tokens: 256,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!data.text) {
      console.error('No text returned from Cohere:', data);
      return res.status(500).json({ error: 'No text returned from Cohere', details: data });
    }

    res.status(200).json({ response: data.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Text generation failed' });
  }
});

export default router;