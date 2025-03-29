// Add these variables at the top with the other Three.js variables
let cursorParticles = [];
let cursorParticleSystem;
let lastCursorPosition = { x: 0, y: 0 };
let clock;

// Enhanced animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on page load with staggered timing and enhanced effects
    const elements = [
        document.querySelector('.head'),
        document.querySelector('.image-container'),
        document.querySelector('.contact-info'),
        ...document.querySelectorAll('.social-btn'),
        document.querySelector('.end')
    ];

    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px) scale(0.9)';
            setTimeout(() => {
                element.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }, 150 * index);
        }
    });

    // Add enhanced hover effects to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.03)';
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.color = 'var(--light)';
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.color = 'var(--secondary)';
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Add music beat pulse to title
    const title = document.querySelector('.head h1');
    if (title) {
        setInterval(() => {
            title.style.transform = 'scale(1.05)';
            title.style.filter = 'brightness(1.2)';
            
            setTimeout(() => {
                title.style.transform = 'scale(1)';
                title.style.filter = 'brightness(1)';
            }, 300);
        }, 3000);
    }
    
    // Initialize Three.js background
    initThreeJsBackground();
});

// Add enhanced parallax effect to image
const image = document.querySelector('.image-container img');
const imageContainer = document.querySelector('.image-container');

if (image && imageContainer) {
    document.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = imageContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        image.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Add dynamic shadow based on mouse position
        imageContainer.style.boxShadow = `
            ${-x * 20}px ${-y * 20}px 35px rgba(0, 0, 0, 0.3),
            0 0 0 2px var(--primary),
            0 0 20px rgba(255, 42, 109, 0.3)
        `;
    });
    
    document.addEventListener('mouseleave', () => {
        image.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        imageContainer.style.boxShadow = '0 15px 35px var(--shadow), 0 0 0 2px var(--primary), 0 0 20px rgba(255, 42, 109, 0.3)';
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = '';
            setTimeout(() => {
                ripple.remove();
            }, 300);
        }, 300);
    });
    
    // Add hover glow effect
    button.addEventListener('mouseenter', function() {
        const iconWrapper = this.querySelector('.icon-wrapper');
        if (iconWrapper) {
            iconWrapper.style.boxShadow = '0 0 15px rgba(255, 42, 109, 0.5)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        const iconWrapper = this.querySelector('.icon-wrapper');
        if (iconWrapper) {
            iconWrapper.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.2)';
        }
    });
});

// Add 3D tilt effect to cards
const cards = document.querySelectorAll('.head, .contact-info, .end');
cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const { left, top, width, height } = this.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        this.style.transform = `perspective(1000px) rotateX(${y * 5}deg) rotateY(${-x * 5}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Add scroll reveal animation
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.social-btn, .contact-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});

// Add dynamic color effect to icons on hover
document.querySelectorAll('.icon-wrapper').forEach(icon => {
    icon.addEventListener('mouseover', function() {
        const i = this.querySelector('i');
        if (i) {
            i.style.color = 'var(--accent)';
            setTimeout(() => {
                i.style.color = 'var(--primary)';
            }, 300);
        }
    });
});

// Social media functions
function openfb() {
    window.open("https://www.facebook.com/rex.khan3", '_blank');
}

function openIn() {
    window.open("https://www.instagram.com/s.factordancecrew/", '_blank');
}

function openWa() {
    window.open("https://wa.link/ntso2j", '_blank');
}

function openTg() {
    window.open("https://t.me/SfactorDanceCrew", '_blank');
}

function openCt() {
    window.open("tel:9340073167", '_blank');
}

function openGm() {
    window.open("mailto:sfactorperformingart@gmail.com", '_blank');
}

// Add audio visualization effect (simulated)
const simulateAudioVisualization = () => {
    const bars = [];
    const container = document.createElement('div');
    container.className = 'audio-visualization';
    container.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 3px;
        padding: 0 20px;
        pointer-events: none;
        z-index: 1;
        opacity: 0.7;
    `;
    
    document.querySelector('.head').appendChild(container);
    
    for (let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `
            width: 3px;
            height: 5px;
            background: var(--primary);
            border-radius: 1px;
            transition: height 0.2s ease;
        `;
        container.appendChild(bar);
        bars.push(bar);
    }
    
    setInterval(() => {
        bars.forEach(bar => {
            const height = Math.floor(Math.random() * 30) + 5;
            bar.style.height = `${height}px`;
        });
    }, 100);
};

// Initialize audio visualization
setTimeout(simulateAudioVisualization, 1500);

// THREE.JS IMPLEMENTATION
let scene, camera, renderer, particles, animationId;
let mouseX = 0, mouseY = 0;

// Modify the initThreeJsBackground function to include cursor tracking
function initThreeJsBackground() {
    // Create Three.js canvas and add it to the page
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
    
    // Load Three.js library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
        setupThreeJsScene(threeJsContainer);
    };
    document.head.appendChild(script);
    
    // Track mouse movement for interactive effects
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update cursor position for particles
        const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        lastCursorPosition = camera.position.clone().add(dir.multiplyScalar(distance));
        
        // Create cursor particles
        createCursorParticles();
    });
}

// Add this function to create particles at cursor position
function createCursorParticles() {
    // Create 3-5 particles at cursor position
    const particleCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < particleCount; i++) {
        // Create a particle with random offset from cursor
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
            color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.9, 0.6), // Dance-themed colors
            life: 1.0, // Full life
            decay: Math.random() * 0.03 + 0.02 // Random decay rate
        };
        
        cursorParticles.push(particle);
    }
    
    // Limit the number of particles for performance
    if (cursorParticles.length > 300) {
        cursorParticles = cursorParticles.slice(-300);
    }
    
    // Update the particle system
    updateCursorParticleSystem();
}
// Add this function to update the cursor particle system
function updateCursorParticleSystem() {
    const positions = new Float32Array(cursorParticles.length * 3);
    const colors = new Float32Array(cursorParticles.length * 3);
    const sizes = new Float32Array(cursorParticles.length);
    
    for (let i = 0; i < cursorParticles.length; i++) {
        const particle = cursorParticles[i];
        
        // Position
        positions[i * 3] = particle.position.x;
        positions[i * 3 + 1] = particle.position.y;
        positions[i * 3 + 2] = particle.position.z;
        
        // Color
        colors[i * 3] = particle.color.r;
        colors[i * 3 + 1] = particle.color.g;
        colors[i * 3 + 2] = particle.color.b;
        
        // Size (scaled by life)
        sizes[i] = particle.size * particle.life;
    }
    
    // Update geometry attributes
    cursorParticleSystem.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    cursorParticleSystem.geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    cursorParticleSystem.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Mark attributes as needing update
    cursorParticleSystem.geometry.attributes.position.needsUpdate = true;
    cursorParticleSystem.geometry.attributes.customColor.needsUpdate = true;
    cursorParticleSystem.geometry.attributes.size.needsUpdate = true;
}

// Modify the setupThreeJsScene function to initialize cursor particles
function setupThreeJsScene(container) {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);
    
    // Initialize clock for animations
    clock = new THREE.Clock();
    
    // Create dance-themed particle system
    createDanceParticles();
    
    // Initialize cursor particle system
    initCursorParticleSystem();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Start animation loop
    animate();
}
// Add this function to initialize the cursor particle system
function initCursorParticleSystem() {
    // Create geometry for cursor particles
    const geometry = new THREE.BufferGeometry();
    
    // Create material for cursor particles
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
    
    // Create particle system
    cursorParticleSystem = new THREE.Points(geometry, material);
    scene.add(cursorParticleSystem);
}

function createDanceParticles() {
    // Create particles geometry
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Define colors based on dance crew theme
    const primaryColor = new THREE.Color(0xff2a6d); // Pink
    const secondaryColor = new THREE.Color(0x05d9e8); // Cyan
    const accentColor = new THREE.Color(0xffdc3c); // Yellow
    
    // Create particles in a dance formation (circular waves)
    for (let i = 0; i < particleCount; i++) {
        // Position particles in waves/circles
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 25;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 20;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        // Assign colors based on position
        let color;
        if (i % 3 === 0) color = primaryColor;
        else if (i % 3 === 1) color = secondaryColor;
        else color = accentColor;
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Random sizes for particles
        sizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create particle material
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
    
    // Create particle system
    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
}

// Modify the animate function to update cursor particles
function animate() {
    animationId = requestAnimationFrame(animate);
    
    const delta = clock ? clock.getDelta() : 0.016;
    
    // Update cursor particles
    for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const particle = cursorParticles[i];
        
        // Update position based on velocity
        particle.position.add(particle.velocity);
        
        // Add some dance-like movement
        particle.position.y += Math.sin(Date.now() * 0.003 + i) * 0.02;
        
        // Reduce life
        particle.life -= particle.decay;
        
        // Remove dead particles
        if (particle.life <= 0) {
            cursorParticles.splice(i, 1);
        }
    }
    
    // Only update particle system if there are particles
    if (cursorParticles.length > 0) {
        updateCursorParticleSystem();
    }
    
    // Rotate particles based on audio visualization
    if (particles) {
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;
        
        // Make particles respond to mouse movement
        particles.rotation.x += mouseY * 0.0005;
        particles.rotation.y += mouseX * 0.0005;
        
        // Make particles move like they're dancing
        const positions = particles.geometry.attributes.position.array;
        const time = Date.now() * 0.0005;
        
        for (let i = 0; i < positions.length; i += 3) {
            // Create wave-like motion
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            
            // Apply sine wave motion to simulate dancing
            positions[i + 1] = y + Math.sin(time + x * 0.5) * 0.3;
            positions[i] = x + Math.cos(time + y * 0.5) * 0.3;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
    }
    
    renderer.render(scene, camera);
}

// Add this function to synchronize animations with music beats
function addBeatSynchronization() {
    // Create an audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    // Add a subtle background music track
    const audioElement = document.createElement('audio');
    audioElement.src = 'makee.mp3'; // Replace with your music
    audioElement.loop = true;
    audioElement.volume = 0.3;
    document.body.appendChild(audioElement);
    
    // Add play button
    const playButton = document.createElement('button');
    playButton.innerHTML = '<i class="fas fa-music"></i>';
    playButton.className = 'music-toggle';
    playButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--surface);
        border: 2px solid var(--primary);
        color: var(--primary);
        font-size: 20px;
        cursor: pointer;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(playButton);
    
    // Connect audio to analyzer
    const source = audioContext.createMediaElementSource(audioElement);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    
    // Create data array for frequency data
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    // Toggle play/pause
    let isPlaying = false;
    playButton.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        if (isPlaying) {
            audioElement.pause();
            playButton.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audioElement.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        
        isPlaying = !isPlaying;
    });
    
    // Update animations based on beat
    function updateWithBeat() {
        analyzer.getByteFrequencyData(dataArray);
        
        // Calculate average frequency
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const average = sum / bufferLength;
        
        // Use average to modify particle behavior
        if (particles) {
            const scale = 1 + average / 512;
            particles.scale.set(scale, scale, scale);
            
            // Increase particle movement on beats
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += (Math.random() - 0.5) * (average / 100);
            }
            particles.geometry.attributes.position.needsUpdate = true;
        }
        
        requestAnimationFrame(updateWithBeat);
    }
    
    updateWithBeat();
}

// Call this function after initializing Three.js
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Add beat synchronization after a delay
    setTimeout(addBeatSynchronization, 2000);
});

// Add keyboard-triggered dance animations
function addKeyboardDanceMoves() {
    const danceContainer = document.createElement('div');
    danceContainer.className = 'dance-moves-guide';
    danceContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--surface);
        border: 2px solid var(--primary);
        border-radius: 10px;
        padding: 10px;
        color: var(--text-primary);
        font-size: 14px;
        z-index: 100;
        transform: translateY(120%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    danceContainer.innerHTML = `
        <div style="margin-bottom: 5px; font-weight: bold;">Press keys to dance:</div>
        <div><kbd>S</kbd> - Spin move</div>
        <div><kbd>B</kbd> - Bounce</div>
        <div><kbd>P</kbd> - Pop</div>
        <div><kbd>W</kbd> - Wave</div>
        <div><kbd>?</kbd> - Show/hide guide</div>
    `;
    document.body.appendChild(danceContainer);
    
    // Toggle guide visibility
    document.addEventListener('keydown', (e) => {
        if (e.key === '?') {
            danceContainer.style.transform = 
                danceContainer.style.transform === 'translateY(0%)' ? 
                'translateY(120%)' : 'translateY(0%)';
        }
        
        // Dance move: Spin
        if (e.key.toLowerCase() === 's') {
            if (particles) {
                gsap.to(particles.rotation, {
                    y: particles.rotation.y + Math.PI * 2,
                    duration: 1,
                    ease: "power2.inOut"
                });
            }
        }
        
        // Dance move: Bounce
        if (e.key.toLowerCase() === 'b') {
            if (particles) {
                gsap.to(particles.position, {
                    y: 5,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: "bounce.out"
                });
            }
        }
        
        // Dance move: Pop
        if (e.key.toLowerCase() === 'p') {
            if (particles) {
                gsap.to(particles.scale, {
                    x: 1.5,
                    y: 1.5,
                    z: 1.5,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out"
                });
            }
        }
        
        // Dance move: Wave
        if (e.key.toLowerCase() === 'w') {
            if (particles) {
                const positions = particles.geometry.attributes.position.array;
                const originalPositions = [...positions];
                
                gsap.to({}, {
                    duration: 1.5,
                    onUpdate: function() {
                        const progress = this.progress();
                        for (let i = 0; i < positions.length; i += 3) {
                            positions[i] = originalPositions[i] + 
                                Math.sin(progress * Math.PI * 2 + i * 0.01) * 2;
                        }
                        particles.geometry.attributes.position.needsUpdate = true;
                    }
                });
            }
        }
    });
}

// Add GSAP library for smoother animations
function loadGSAP() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';
    script.onload = () => {
        addKeyboardDanceMoves();
    };
    document.head.appendChild(script);
}

// Call this after Three.js is loaded
setTimeout(loadGSAP, 2000);

// Add custom cursor
function addCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: transparent;
        border: 2px solid var(--primary);
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: width 0.3s, height 0.3s, border-color 0.3s;
        mix-blend-mode: difference;
    `;
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: var(--secondary);
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: transform 0.1s;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
        
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('button, .social-btn, a, .contact-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'var(--secondary)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'var(--primary)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
}

// Call after page load
setTimeout(addCustomCursor, 1000);

// Add device motion support for mobile
function addDeviceMotionSupport() {
    // Check if device motion is supported
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
            // Convert device orientation to mouse-like coordinates
            const tiltX = event.beta ? event.beta / 180 : 0;  // -1 to 1
            const tiltY = event.gamma ? event.gamma / 90 : 0; // -1 to 1
            
            // Update particles based on device tilt
            if (particles) {
                particles.rotation.x = tiltX * 0.5;
                particles.rotation.y = tiltY * 0.5;
            }
            
            // Create particles based on device motion
            if (Math.abs(tiltX) > 0.1 || Math.abs(tiltY) > 0.1) {
                // Simulate mouse position from tilt
                mouseX = tiltY;
                mouseY = -tiltX;
                
                // Update cursor position for particles
                if (camera) {
                    const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
                    vector.unproject(camera);
                    const dir = vector.sub(camera.position).normalize();
                    const distance = -camera.position.z / dir.z;
                    lastCursorPosition = camera.position.clone().add(dir.multiplyScalar(distance));
                    
                    // Create cursor particles
                    createCursorParticles();
                }
            }
        });
    }
}

// Call after Three.js is initialized
setTimeout(addDeviceMotionSupport, 2000);

// Add performance optimizations
function optimizePerformance() {
    // Detect low-end devices
    const isLowEndDevice = () => {
        return (
            navigator.hardwareConcurrency <= 4 || 
            navigator.deviceMemory <= 4 || 
            window.innerWidth < 600
        );
    };
    
    // Adjust settings based on device capability
    if (isLowEndDevice()) {
        // Reduce particle count
        if (particles) {
            const reducedCount = 300; // Reduced from 1000
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(reducedCount * 3);
            const colors = new Float32Array(reducedCount * 3);
            const sizes = new Float32Array(reducedCount);
            
            // Define colors based on dance crew theme
            const primaryColor = new THREE.Color(0xff2a6d);
            const secondaryColor = new THREE.Color(0x05d9e8);
            const accentColor = new THREE.Color(0xffdc3c);
            
            for (let i = 0; i < reducedCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 5 + Math.random() * 25;
                positions[i * 3] = Math.cos(angle) * radius;
                positions[i * 3 + 1] = Math.sin(angle) * radius;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
                
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
            
            // Replace existing particles
            scene.remove(particles);
            particles = new THREE.Points(geometry, particles.material);
            scene.add(particles);
        }
        
        // Reduce cursor particle count
        const originalCreateCursorParticles = createCursorParticles;
        createCursorParticles = () => {
            // Only create particles every few movements
            if (Math.random() > 0.3) {
                originalCreateCursorParticles();
            }
        };
    }
}

// Call after Three.js is initialized
setTimeout(optimizePerformance, 3000);

