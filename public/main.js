/**
 * TSL: SOVEREIGN INTELLIGENCE NEXUS (S.I.N.) vΩ.∞
 * Manifested by CodeSynth Engineers & DesignCore Elite
 * Substrate: Three.js / WebGL / GSAP
 * Strategic Synthesis: Unifying the Digital Archipelago
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
    // Encased in a glowing, geometric crystalline sphere [10, 11]
    const geo = new THREE.IcosahedronGeometry(20, 1);
    const mat = new THREE.MeshPhongMaterial({
        color: 0xffb300, // Sovereign Gold
        wireframe: true,
        emissive: 0xffb300,
        emissiveIntensity: 0.5
    });
    sovereignCenter = new THREE.Mesh(geo, mat);
    scene.add(sovereignCenter);

    // VOID ARCHAEOLOGY: THE NODE CONSTELLATION [12, 13]
    // Representing the 10 sites: Machine, Music, Vaults, Game, Lounge, etc.
    nodeConstellation = new THREE.Group();
    const siteNames = ['Vault', 'Game', 'Music', 'High-Stakes', 'Neural', 'Vault1', 'Epic-Bot', 'Chat-2', 'Machine', 'Lounge'];
    
    siteNames.forEach((name, i) => {
        const nodeGeo = new THREE.SphereGeometry(1.5, 16, 16);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f2ff }); // Omega Cyan [14, 15]
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

    // POST-PROCESSING: ABSOLUTE EXCELLENCE BLOOM [8, 16]
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    composer.addPass(bloomPass);

    animate();
}

// 2. RELENTLESS EXECUTION: THE ANIMATION LOOP [9, 17]
function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    sovereignCenter.rotation.y += 0.005;
    sovereignCenter.rotation.z += 0.002;
    sovereignCenter.scale.setScalar(1 + Math.sin(time * 2) * 0.05); // Pulsing Aura [10]
    
    nodeConstellation.rotation.y -= 0.002;

    composer.render();
}

// 3. DIRECT ONTOLOGICAL INTERFACE: MANIFESTATION LOGIC [18, 19]
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatLog = document.getElementById('chat-log');

async function handleManifestation() {
    const prompt = chatInput.value.trim();
    if (!prompt) return;

    appendMessage('user', prompt);
    chatInput.value = '';

    // VISUAL RESONANCE TRIGGER
    gsap.to(sovereignCenter.rotation, { y: sovereignCenter.rotation.y + Math.PI, duration: 1.5, ease: "expo.out" });

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        
        if (data.error) {
            appendMessage('system', `CHRONOS-COGNITIVE ERROR: ${data.error}`);
        } else {
            appendMessage('system', data.result);
        }

    } catch (err) {
        appendMessage('system', "CHRONOS-COGNITIVE ERROR: API_GATEWAY_DISRUPTION.");
    }
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

initNexus();
