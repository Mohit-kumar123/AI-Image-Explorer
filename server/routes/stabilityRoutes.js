import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    text_prompts: [{ text: prompt }],
    cfg_scale: 7,
    height: 1024,
    width: 1024,
    samples: 1,
    steps: 30,
  }),
});

    const data = await response.json();

    // Check if the API returned an image
    if (!data.artifacts || !data.artifacts[0]?.base64) {
      console.error('No image returned from Stability AI:', data);
      return res.status(500).json({ error: 'No image returned from Stability AI', details: data });
    }

    res.status(200).json({ photo: data.artifacts[0].base64 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

export default router;