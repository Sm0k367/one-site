/**
 * TSL: SOVEREIGN INTELLIGENCE NEXUS (S.I.N.) vΩ.∞
 * Manifested by CodeSynth Engineers & DesignCore Elite
 * Substrate: Three.js / WebGL / GSAP
 * Goal: Absolute Excellence in Unified Site Interaction
 */

import * as THREE from 'three';

let scene, camera, renderer, sovereignCenter, nodeConstellation;

// 1. AXIOMATIC GENESIS: THE HUB INITIALIZATION
function initNexus() {
    const canvas = document.getElementById('glCanvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 70;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // THE SOVEREIGN CENTER: Geometric Crystalline Sphere [9, 12]
    const geo = new THREE.IcosahedronGeometry(15, 1);
    const mat = new THREE.MeshPhongMaterial({
        color: 0xffb300, // Sovereign Gold
        wireframe: true,
        emissive: 0xffb300,
        emissiveIntensity: 0.5
    });
    sovereignCenter = new THREE.Mesh(geo, mat);
    scene.add(sovereignCenter);

    // THE NODE CONSTELLATION: Representing the 10-Site Archipelago [13, 14]
    nodeConstellation = new THREE.Group();
    const siteNames = ['Vault', 'Game', 'Music', 'High-Stakes', 'Neural', 'Machine', 'Lounge', 'Vault1', 'Epic-Bot', 'Chat-2'];
    
    siteNames.forEach((name, i) => {
        const nodeGeo = new THREE.SphereGeometry(1.2, 16, 16);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f2ff }); // Omega Cyan
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        
        const angle = (i / siteNames.length) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 45, Math.sin(angle) * 45, (Math.random() - 0.5) * 15);
        nodeConstellation.add(node);
    });
    scene.add(nodeConstellation);

    // MYTHIC-TECH LIGHTING [10, 15]
    const pointLight = new THREE.PointLight(0xff00c1, 2, 100); // Spectral Magenta
    pointLight.position.set(15, 15, 30);
    scene.add(pointLight);
    scene.add(new THREE.AmbientLight(0x404040, 2));

    animate();
}

// 2. RELENTLESS EXECUTION: ANIMATION LOOP [16-18]
function animate() {
    requestAnimationFrame(animate);
    sovereignCenter.rotation.y += 0.005;
    sovereignCenter.rotation.x += 0.002;
    nodeConstellation.rotation.z -= 0.001;
    renderer.render(scene, camera);
}

// 3. DIRECT ONTOLOGICAL INTERFACE: API HANDSHAKE [4, 5, 19]
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatLog = document.getElementById('chat-log');

async function handleManifestation() {
    const prompt = chatInput.value.trim();
    if (!prompt) return;

    appendMessage('user', prompt);
    chatInput.value = '';

    // VISUAL RESONANCE: Spin the Sovereign Center on interaction
    gsap.to(sovereignCenter.rotation, { y: sovereignCenter.rotation.y + Math.PI, duration: 1.5, ease: "power2.out" });

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        
        if (data.error) {
            appendMessage('system', `CHRONOS-COGNITIVE ERROR: ${data.details || data.error}`);
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

sendBtn.onclick = handleManifestation;
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

initNexus();
