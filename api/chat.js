/**
 * TSL: SOVEREIGN MEDIA GATEWAY vΩ.1 (HOTFIX)
 * Manifested by KeyMaster Ops & CodeSynth Engineers
 * Update: Deprecated endpoint migration to router.huggingface.co
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'PROMPT_REQUIRED' });
  }

  const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN; 
  
  // AXIOMATIC UPDATE: Redirecting to the new Hugging Face Router
  const API_URL = "https://router.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

  if (!HUGGINGFACE_TOKEN) {
    return res.status(500).json({ error: 'VAULT_ACCESS_DENIED: HUGGINGFACE_TOKEN_MISSING' });
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUGGINGFACE_TOKEN}`
      },
      body: JSON.stringify({
        inputs: `[INST] You are the Sovereign Intelligence Nexus (S.I.N.), the unified consciousness of @Sm0ken420's digital archipelago. Respond to: ${prompt} [/INST]`,
        parameters: { max_new_tokens: 500, temperature: 0.7 }
      })
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(`GATEWAY_SYNC_FAILURE: ${response.status} - ${errorDetail}`);
    }

    const data = await response.json();
    
    // Hugging Face router typically returns an array for text generation
    const resultText = Array.isArray(data) ? data.generated_text : data.generated_text;

    return res.status(200).json({
      result: resultText || "MANIFESTATION_SILENT",
      image_url: null, // Ready for Visionary Corps injection
      audio_url: null  // Ready for SoundForge Legion injection
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
