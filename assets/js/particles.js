/**
 * Three.js Particle System Module
 * 
 * Handles 3D background particles, cursor particles, animation loop,
 * and performance optimization for the particle system.
 * 
 * @module Particles
 * @version 1.0.0
 */

// Configuration constants
const CONFIG = {
    AUDIO_VISUALIZATION_DELAY: 1500,
    GSAP_LOAD_DELAY: 2000,
    CURSOR_INIT_DELAY: 1000,
    DEVICE_MOTION_DELAY: 2000,
    BEAT_SYNC_DELAY: 2000,
    PERFORMANCE_CHECK_DELAY: 3000,
    MAX_CURSOR_PARTICLES: 300,
    DEFAULT_PARTICLE_COUNT: 500,
    LOW_END_PARTICLE_COUNT: 300,
    PARTICLE_SPAWN_RATE: 0.7
};

// Three.js variables
let scene, camera, renderer, particles, animationId;
let mouseX = 0, mouseY = 0;
let cursorParticles = [];
let cursorParticleSystem;
let lastCursorPosition = { x: 0, y: 0 };
let clock;

// Event handlers for cleanup
let particleEventHandlers = {
    mouseMove: [],
    resize: []
};

/**
 * Initialize Three.js background particle system
 */
function initThreeJsBackground() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
        console.warn('WebGL not supported - Three.js background disabled');
        return;
    }
    
    const threeJsContainer = document.createElement('div');
    threeJsContainer.className = 'three-js-container';
    threeJsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.prepend(threeJsContainer);
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.integrity = 'sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YjDUCjT0HDOHKXnVYdf3hU4JjM8uEhxf9nD1/ey98U3t2vZ0qQ==';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
        setupThreeJsScene(threeJsContainer);
    };
    script.onerror = () => {
        console.warn('Three.js CDN failed to load. Background particles disabled.');
    };
    document.head.appendChild(script);
    
    const mouseMoveHandler = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        if (camera && THREE) {
            const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            lastCursorPosition = camera.position.clone().add(dir.multiplyScalar(distance));
            createCursorParticles();
        }
    };
    
    document.addEventListener('mousemove', mouseMoveHandler);
    particleEventHandlers.mouseMove.push(mouseMoveHandler);
}

/**
 * Create cursor particles at mouse position
 */
function createCursorParticles() {
    const particleCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = {
            position: new THREE.Vector3(
                lastCursorPosition.x + (Math.random() - 0.5) * 2,
                lastCursorPosition.y + (Math.random() - 0.5) * 2,
                lastCursorPosition.z + (Math.random() - 0.5) * 2
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.2,
                (Math.random() - 0.5) * 0.2,
                (Math.random() - 0.5) * 0.2
            ),
            size: Math.random() * 0.5 + 0.5,
            color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.9, 0.6),
            life: 1.0,
            decay: Math.random() * 0.03 + 0.02
        };
        
        cursorParticles.push(particle);
    }
    
    if (cursorParticles.length > CONFIG.MAX_CURSOR_PARTICLES) {
        cursorParticles = cursorParticles.slice(-CONFIG.MAX_CURSOR_PARTICLES);
    }
    
    updateCursorParticleSystem();
}

/**
 * Update cursor particle system geometry
 */
function updateCursorParticleSystem() {
    const positions = new Float32Array(cursorParticles.length * 3);
    const colors = new Float32Array(cursorParticles.length * 3);
    const sizes = new Float32Array(cursorParticles.length);
    
    for (let i = 0; i < cursorParticles.length; i++) {
        const particle = cursorParticles[i];
        positions[i * 3] = particle.position.x;
        positions[i * 3 + 1] = particle.position.y;
        positions[i * 3 + 2] = particle.position.z;
        colors[i * 3] = particle.color.r;
        colors[i * 3 + 1] = particle.color.g;
        colors[i * 3 + 2] = particle.color.b;
        sizes[i] = particle.size * particle.life;
    }
    
    cursorParticleSystem.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    cursorParticleSystem.geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    cursorParticleSystem.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    cursorParticleSystem.geometry.attributes.position.needsUpdate = true;
    cursorParticleSystem.geometry.attributes.customColor.needsUpdate = true;
    cursorParticleSystem.geometry.attributes.size.needsUpdate = true;
}

/**
 * Setup Three.js scene, camera, and renderer
 */
function setupThreeJsScene(container) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    clock = new THREE.Clock();
    createDanceParticles();
    initCursorParticleSystem();
    
    const resizeHandler = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', resizeHandler);
    particleEventHandlers.resize.push(resizeHandler);
    
    animate();
}

/**
 * Initialize cursor particle system
 */
function initCursorParticleSystem() {
    const geometry = new THREE.BufferGeometry();
    
    const material = new THREE.ShaderMaterial({
        vertexShader: `
            attribute float size;
            attribute vec3 customColor;
            varying vec3 vColor;
            
            void main() {
                vColor = customColor;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                vec2 xy = gl_PointCoord.xy - vec2(0.5);
                float radius = length(xy);
                if (radius > 0.5) discard;
                
                float alpha = 1.0 - smoothstep(0.3, 0.5, radius);
                gl_FragColor = vec4(vColor, alpha);
            }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    });
    
    cursorParticleSystem = new THREE.Points(geometry, material);
    scene.add(cursorParticleSystem);
}

/**
 * Create dance-themed background particles
 */
function createDanceParticles() {
    const particleCount = CONFIG.DEFAULT_PARTICLE_COUNT;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const primaryColor = new THREE.Color(0xff2a6d);
    const secondaryColor = new THREE.Color(0x05d9e8);
    const accentColor = new THREE.Color(0xffdc3c);
    
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 25;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 20;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        let color;
        if (i % 3 === 0) color = primaryColor;
        else if (i % 3 === 1) color = secondaryColor;
        else color = accentColor;
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        sizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particleMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                vec2 xy = gl_PointCoord.xy - vec2(0.5);
                float radius = length(xy);
                if (radius > 0.5) discard;
                
                float alpha = 1.0 - smoothstep(0.4, 0.5, radius);
                gl_FragColor = vec4(vColor, alpha);
            }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true
    });
    
    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
}

/**
 * Main animation loop
 */
function animate() {
    animationId = requestAnimationFrame(animate);
    const delta = clock ? clock.getDelta() : 0.016;
    
    for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const particle = cursorParticles[i];
        particle.position.add(particle.velocity);
        particle.position.y += Math.sin(Date.now() * 0.003 + i) * 0.02;
        particle.life -= particle.decay;
        
        if (particle.life <= 0) {
            cursorParticles.splice(i, 1);
        }
    }
    
    if (cursorParticles.length > 0) {
        updateCursorParticleSystem();
    }
    
    if (particles) {
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;
        particles.rotation.x += mouseY * 0.0005;
        particles.rotation.y += mouseX * 0.0005;
        
        const positions = particles.geometry.attributes.position.array;
        const time = Date.now() * 0.0005;
        
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            positions[i + 1] = y + Math.sin(time + x * 0.5) * 0.3;
            positions[i] = x + Math.cos(time + y * 0.5) * 0.3;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
    }
    
    renderer.render(scene, camera);
}

/**
 * Cleanup particle system resources
 */
function cleanupParticles() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    particleEventHandlers.mouseMove.forEach(handler => {
        document.removeEventListener('mousemove', handler);
    });
    
    particleEventHandlers.resize.forEach(handler => {
        window.removeEventListener('resize', handler);
    });
    
    cursorParticles = [];
    
    if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
    }
    if (scene) {
        scene.clear();
    }
}

export { 
    CONFIG, 
    initThreeJsBackground, 
    cleanupParticles,
    cursorParticles,
    lastCursorPosition,
    createCursorParticles,
    updateCursorParticleSystem,
    particles
};
