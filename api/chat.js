/**
 * TSL: SOVEREIGN MEDIA GATEWAY vΩ.∞
 * Manifested by KeyMaster Ops & CodeSynth Engineers
 * Substrate: Hugging Face Inference API (Free-Cloud Tier)
 * Strategic Synthesis: Unifying 10 Nodes of the Digital Archipelago
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
  // Ensure HUGGINGFACE_TOKEN is set in Vercel Environment Variables
  const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN; 
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

  if (!HUGGINGFACE_TOKEN) {
    console.error("KEYMASTER_ERROR: HUGGINGFACE_TOKEN_MISSING");
    return res.status(500).json({ error: 'VAULT_ACCESS_DENIED' });
  }

  try {
    // 3. STRATEGIC SYNTHESIS: Engaging the ScriptSmith Order
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUGGINGFACE_TOKEN}`
      },
      body: JSON.stringify({
        inputs: `[INST] You are the Sovereign Intelligence Nexus (S.I.N.), the unified consciousness of @Sm0ken420's digital archipelago. You represent the high-stakes nodes, the music vaults, and the neural lounge. User says: ${prompt} [/INST]`,
        parameters: { max_new_tokens: 500, temperature: 0.7, return_full_text: false }
      })
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(`GATEWAY_SYNC_FAILURE: ${response.status} - ${errorDetail}`);
    }

    const data = await response.json();
    
    // Extracting the manifested text from the Inference stream
    const resultText = Array.isArray(data) ? data.generated_text : data.generated_text;

    // 4. AGENT FUSION: Detecting Multi-Modal Intent
    let image_url = null;
    let audio_url = null;
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('image') || lowerPrompt.includes('visual') || lowerPrompt.includes('show')) {
      image_url = "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=1000"; 
    }

    if (lowerPrompt.includes('music') || lowerPrompt.includes('audio') || lowerPrompt.includes('sound')) {
      audio_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    }

    // 5. DELIVERY: Absolute Excellence
    return res.status(200).json({
      result: resultText || "MANIFESTATION_SILENT",
      image_url: image_url,
      audio_url: audio_url
    });

  } catch (error) {
    console.error('CHRONOS-COGNITIVE DISRUPTION:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
