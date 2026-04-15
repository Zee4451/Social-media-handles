/**
 * Audio System Module
 * 
 * Handles audio visualization, beat synchronization, music controls,
 * and device motion support.
 * 
 * @module AudioSystem
 * @version 1.0.0
 */

import { CONFIG } from './particles.js';

/**
 * Simulate audio visualization with animated bars
 */
function simulateAudioVisualization() {
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
}

/**
 * Add beat synchronization with actual audio
 */
function addBeatSynchronization() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
    
        const audioElement = document.createElement('audio');
        audioElement.src = 'assets/audio/makee.mp3';
        audioElement.loop = true;
        audioElement.volume = 0.3;
        document.body.appendChild(audioElement);
        
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
            background: var(--bg-card);
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
        
        const source = audioContext.createMediaElementSource(audioElement);
        const analyzer = audioContext.createAnalyser();
        analyzer.fftSize = 256;
        source.connect(analyzer);
        analyzer.connect(audioContext.destination);
        
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
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
        
        function updateWithBeat() {
            analyzer.getByteFrequencyData(dataArray);
            
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const average = sum / bufferLength;
            
            // Access particles from window object (set by main script)
            const particles = window.particles;
            if (particles) {
                const scale = 1 + average / 512;
                particles.scale.set(scale, scale, scale);
                
                const positions = particles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += (Math.random() - 0.5) * (average / 100);
                }
                particles.geometry.attributes.position.needsUpdate = true;
            }
            
            requestAnimationFrame(updateWithBeat);
        }
        
        updateWithBeat();
    } catch (error) {
        console.warn('Audio beat synchronization failed:', error.message);
    }
}

/**
 * Add device motion support for mobile
 */
function addDeviceMotionSupport() {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
            const tiltX = event.beta ? event.beta / 180 : 0;
            const tiltY = event.gamma ? event.gamma / 90 : 0;
            
            const particles = window.particles;
            if (particles) {
                particles.rotation.x = tiltX * 0.5;
                particles.rotation.y = tiltY * 0.5;
            }
            
            if (Math.abs(tiltX) > 0.1 || Math.abs(tiltY) > 0.1) {
                window.mouseX = tiltY;
                window.mouseY = -tiltX;
                
                if (window.camera) {
                    const THREE = window.THREE;
                    if (THREE) {
                        const vector = new THREE.Vector3(window.mouseX, window.mouseY, 0.5);
                        vector.unproject(window.camera);
                        const dir = vector.sub(window.camera.position).normalize();
                        const distance = -window.camera.position.z / dir.z;
                        window.lastCursorPosition = window.camera.position.clone().add(dir.multiplyScalar(distance));
                        
                        if (typeof window.createCursorParticles === 'function') {
                            window.createCursorParticles();
                        }
                    }
                }
            }
        });
    }
}

/**
 * Optimize performance for low-end devices
 */
function optimizePerformance() {
    const isLowEndDevice = () => {
        return (
            navigator.hardwareConcurrency <= 4 || 
            navigator.deviceMemory <= 4 || 
            window.innerWidth < 600
        );
    };
    
    if (isLowEndDevice()) {
        console.log('Low-end device detected - optimizing performance');
        
        const THREE = window.THREE;
        const particles = window.particles;
        const scene = window.scene;
        
        if (particles && THREE) {
            const reducedCount = CONFIG.LOW_END_PARTICLE_COUNT;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(reducedCount * 3);
            const colors = new Float32Array(reducedCount * 3);
            const sizes = new Float32Array(reducedCount);
            
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
            
            scene.remove(particles);
            window.particles = new THREE.Points(geometry, particles.material);
            scene.add(window.particles);
        }
    }
}

/**
 * Initialize all audio systems
 */
function initAudioSystem() {
    simulateAudioVisualization();
    setTimeout(addBeatSynchronization, CONFIG.BEAT_SYNC_DELAY);
    setTimeout(addDeviceMotionSupport, CONFIG.DEVICE_MOTION_DELAY);
    setTimeout(optimizePerformance, CONFIG.PERFORMANCE_CHECK_DELAY);
}

export { initAudioSystem };
