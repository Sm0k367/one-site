/**
 * TSL: SOVEREIGN MEDIA GATEWAY vΩ.2 (STABILITY HOTFIX)
 * Manifested by KeyMaster Ops & CodeSynth Engineers
 * Objective: Resolve 500 Internal Server Error & Correct Data Parsing
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
  const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN; 
  const API_URL = "https://router.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

  if (!HUGGINGFACE_TOKEN) {
    console.error("KEYMASTER_ERROR: HUGGINGFACE_TOKEN_MISSING_IN_VAULT");
    return res.status(500).json({ error: 'VAULT_ACCESS_DENIED: TOKEN NOT FOUND' });
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
        inputs: `[INST] You are the Sovereign Intelligence Nexus (S.I.N.). User says: ${prompt} [/INST]`,
        parameters: { max_new_tokens: 500, temperature: 0.7 }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`GATEWAY_SYNC_FAILURE: ${data.error || response.statusText}`);
    }

    // 4. DATA PARSING: Correcting the Array/Object Indexing
    // Hugging Face often returns [{ "generated_text": "..." }]
    let resultText = "";
    if (Array.isArray(data) && data?.generated_text) {
      resultText = data.generated_text;
    } else if (data.generated_text) {
      resultText = data.generated_text;
    } else {
      resultText = JSON.stringify(data); // Fallback to raw string if format varies
    }

    // 5. DELIVERY: Production-Ready Result
    return res.status(200).json({
      result: resultText || "MANIFESTATION_SILENT",
      image_url: null,
      audio_url: null
    });

  } catch (error) {
    console.error('CHRONOS-COGNITIVE DISRUPTION:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
