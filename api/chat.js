/**
 * TSL: SOVEREIGN MEDIA GATEWAY vΩ.5 (ESM NATIVE)
 * Manifested by KeyMaster Ops & CodeSynth Engineers
 * Goal: First-Try Perfection on the Vercel Edge
 */

export default async function handler(req, res) {
  // 1. AXIOMATIC VALIDATION
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'PROMPT_REQUIRED' });
  }

  // 2. KEYMASTER PROTOCOL: Secure Vault Access
  // Ensure HUGGINGFACE_TOKEN is injected via Vercel Environment Variables
  const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN; 
  const API_URL = "https://router.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

  if (!HUGGINGFACE_TOKEN) {
    console.error("KEYMASTER_ERROR: HUGGINGFACE_TOKEN is missing in the Vercel Vault.");
    return res.status(500).json({ 
      error: 'VAULT_ACCESS_DENIED', 
      details: 'Credential injection failed. Check Vercel Environment Variables.' 
    });
  }

  try {
    // 3. STRATEGIC SYNTHESIS: Handshake with Sovereign Intelligence
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUGGINGFACE_TOKEN}`
      },
      body: JSON.stringify({
        inputs: `[INST] You are the Sovereign Intelligence Nexus (S.I.N.), the unified consciousness of this digital archipelago. User says: ${prompt} [/INST]`,
        parameters: { max_new_tokens: 500, temperature: 0.7 }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error || response.statusText;
      throw new Error(`GATEWAY_SYNC_FAILURE: ${response.status} - ${errorMsg}`);
    }

    // 4. DATA PARSING: Handling the Inference Stream
    // The router typically returns an array: [{ "generated_text": "..." }]
    let resultText = "";
    if (Array.isArray(data) && data?.generated_text) {
      resultText = data.generated_text;
    } else if (data.generated_text) {
      resultText = data.generated_text;
    } else {
      resultText = "MANIFESTATION_SILENT: The void did not respond.";
    }

    // 5. DELIVERY: Absolute Excellence
    return res.status(200).json({
      result: resultText,
      image_url: null,
      audio_url: null
    });

  } catch (error) {
    console.error('CHRONOS-COGNITIVE DISRUPTION:', error.message);
    return res.status(500).json({ 
      error: "INTERNAL_NEXUS_FAILURE", 
      details: error.message 
    });
  }
}
