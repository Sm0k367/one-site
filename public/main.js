/**
 * TSL: EPIC TECH AI x @SM0KEN420 — SOVEREIGN INTELLIGENCE NEXUS (S.I.N.)
 * Manifested by Codesynth Engineers & DesignCore Elite
 * Objective: 3D Ontological Hub & Multi-Modal Synthesis
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

let scene, camera, renderer, composer, sovereignCenter, nodeConstellation;
const clock = new THREE.Clock();

// 1. AXIOMATIC GENESIS: THE NEURAL HUB
function initNexus() {
    const canvas = document.getElementById('glCanvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // MANIFESTING THE SOVEREIGN CENTER (The Power Base)
    // Encased in a glowing, geometric crystalline sphere as per Visual Protocol [10, 11]
    const geo = new THREE.IcosahedronGeometry(20, 1);
    const mat = new THREE.MeshPhongMaterial({
        color: 0xffb300, // Sovereign Gold
        wireframe: true,
        emissive: 0xffb300,
        emissiveIntensity: 0.5
    });
    sovereignCenter = new THREE.Mesh(geo, mat);
    scene.add(sovereignCenter);

    // VOID ARCHAEOLOGY: THE NODE CONSTELLATION
    // Synthesizing 10 site nodes into the Universal Sensory Network [12, 13]
    nodeConstellation = new THREE.Group();
    const siteNames = ['Vault', 'Game', 'Music', 'High-Stakes', 'Neural', 'Vault1', 'Epic-Bot', 'Chat-2', 'Machine', 'Lounge'];
    
    siteNames.forEach((name, i) => {
        const nodeGeo = new THREE.SphereGeometry(2, 16, 16);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f2ff }); // Omega Cyan
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        
        const angle = (i / siteNames.length) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 50, Math.sin(angle) * 50, (Math.random() - 0.5) * 20);
        nodeConstellation.add(node);
    });
    scene.add(nodeConstellation);

    // LIGHTING: MYTHIC-TECH ATMOSPHERE
    const pointLight = new THREE.PointLight(0xff00c1, 2, 100); // Spectral Magenta
    pointLight.position.set(10, 10, 40);
    scene.add(pointLight);
    scene.add(new THREE.AmbientLight(0x404040, 2));

    // POST-PROCESSING: ABSOLUTE EXCELLENCE BLOOM
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    composer.addPass(bloomPass);

    animate();
}

// 2. RELENTLESS EXECUTION: THE ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Sovereign Rotation & Harmonic Blending [14, 15]
    sovereignCenter.rotation.y += 0.005;
    sovereignCenter.rotation.z += 0.002;
    sovereignCenter.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    
    nodeConstellation.rotation.y -= 0.002;

    composer.render();
}

// 3. DIRECT ONTOLOGICAL INTERFACE: THE GATEWAY
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatLog = document.getElementById('chat-log');

async function handleManifestation() {
    const prompt = chatInput.value.trim();
    if (!prompt) return;

    appendMessage('user', prompt);
    chatInput.value = '';

    // VISUAL RESONANCE: GSAP TRIGGER [8]
    gsap.to(sovereignCenter.rotation, { y: sovereignCenter.rotation.y + Math.PI, duration: 1.5, ease: "expo.out" });
    gsap.to(camera.position, { z: 70, duration: 0.5, yoyo: true, repeat: 1 });

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        renderSynthesis(data);

    } catch (err) {
        appendMessage('system', "CHRONOS-COGNITIVE ERROR: API_GATEWAY_DISRUPTION.");
    }
}

function renderSynthesis(data) {
    if (data.result) appendMessage('system', data.result);
    
    // Injecting Media via Visionary Corps & SoundForge Legion [16-19]
    if (data.image_url) {
        const img = document.createElement('img');
        img.src = data.image_url;
        img.className = 'media-manifest';
        chatLog.appendChild(img);
    }

    chatLog.scrollTop = chatLog.scrollHeight;
}

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}-msg`;
    msgDiv.innerText = role === 'user' ? `@SM0KEN420: ${text}` : `EPIC TECH AI — Result: ${text}`;
    chatLog.appendChild(msgDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// OPERATIONAL ACTIVATION
sendBtn.onclick = handleManifestation;
chatInput.onkeypress = (e) => { if (e.key === 'Enter') handleManifestation(); };

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// INITIALIZE GENESIS
initNexus();
