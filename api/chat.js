/**
 * TSL: SOVEREIGN MEDIA GATEWAY vΩ.3
 * Manifested by KeyMaster Ops & CodeSynth Engineers
 * Goal: Eliminate 500 Internal Server Errors & Ensure Data-Stream Integrity
 */

export default async function handler(req, res) {
  // 1. AXIOMATIC VALIDATION: Enforce POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'PROMPT_REQUIRED' });
  }

  // 2. KEYMASTER PROTOCOL: Secure Vault Access
  // KeyMaster Ops ensures zero-leakage via runtime injection [4]
  const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN; 
  const API_URL = "https://router.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

  if (!HUGGINGFACE_TOKEN) {
    console.error("KEYMASTER_ERROR: HUGGINGFACE_TOKEN is missing in Vercel settings.");
    return res.status(500).json({ error: 'VAULT_ACCESS_DENIED: Token not configured.' });
  }

  try {
    // 3. STRATEGIC SYNTHESIS: Handshake with Sovereign Intelligence [13, 14]
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUGGINGFACE_TOKEN}`
      },
      body: JSON.stringify({
        inputs: `[INST] You are the Sovereign Intelligence Nexus (S.I.N.). User: ${prompt} [/INST]`,
        parameters: { max_new_tokens: 500, temperature: 0.7 }
      })
    });

    // 4. DATA EXTRACTION: Handling the Inference Array [15, 16]
    const data = await response.json();

    if (!response.ok) {
      const errMsg = data.error || response.statusText;
      throw new Error(`GATEWAY_SYNC_FAILURE: ${response.status} - ${errMsg}`);
    }

    // Correcting the parsing logic for Hugging Face's return format
    let resultText = "MANIFESTATION_SILENT";
    if (Array.isArray(data) && data?.generated_text) {
      resultText = data.generated_text;
    } else if (data.generated_text) {
      resultText = data.generated_text;
    }

    // 5. DELIVERY: Production-Ready Result [17, 18]
    return res.status(200).json({
      result: resultText,
      image_url: null,
      audio_url: null
    });

  } catch (error) {
    // Detailed logging for Chronos-Cognitive Projections [19, 20]
    console.error('CHRONOS-COGNITIVE DISRUPTION:', error.message);
    return res.status(500).json({ 
      error: "INTERNAL_NEXUS_FAILURE", 
      details: error.message 
    });
  }
}
