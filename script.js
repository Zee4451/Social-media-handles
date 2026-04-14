/**
 * S. Factor Dance Crew - Main Application Script
 * 
 * This is the main entry point for the S. Factor Dance Crew social media handles page.
 * It coordinates all visual effects including:
 * - Three.js particle background system with dance-themed animations
 * - Interactive UI animations (3D tilt, parallax, hover effects)
 * - Custom cursor with trail effects
 * - Audio visualization and beat synchronization
 * - Keyboard-controlled dance moves
 * - Performance optimization for low-end devices
 * 
 * @main
 * @version 2.0.0
 * @author S. Factor Dance Crew
 * @license MIT
 * 
 * @requires config.js - Configuration constants and social links
 * @requires utils.js - Utility functions and cleanup
 * 
 * @example
 * // The script auto-initializes on DOMContentLoaded
 * // No manual initialization required
 * 
 * @note
 * This script must be served via HTTP server (not file:// protocol)
 * due to ES6 module requirements and Three.js WebGL restrictions.
 */

/**
 * @module MainApplication
 * @description Main application module for S. Factor Dance Crew website
 */

// Import Firebase configuration (if available)
let firebaseApp = null;
let firebaseDatabase = null;
let isFirebaseLoaded = false;

// Try to load Firebase dynamically
import('./firebase-config.js')
    .then(async (firebaseModule) => {
        if (firebaseModule.isFirebaseConfigured) {
            try {
                const { initializeFirebase, GalleryCRUD, SocialLinksCRUD, ContactCRUD } = firebaseModule;
                const firebase = await initializeFirebase();
                firebaseApp = firebase.app;
                firebaseDatabase = firebase.database;
                isFirebaseLoaded = true;
                
                console.log('✅ Firebase connected - Dynamic content enabled');
                
                // Load dynamic content from Firebase
                await loadDynamicContent();
            } catch (error) {
                console.warn('⚠️ Firebase initialization failed, using static content:', error.message);
            }
        }
    })
    .catch((error) => {
        console.log('ℹ️ Firebase config not found, using static content');
    });

/**
 * Load dynamic content from Firebase
 */
async function loadDynamicContent() {
    if (!isFirebaseLoaded || !firebaseDatabase) return;
    
    try {
        const { GalleryCRUD, SocialLinksCRUD, ContactCRUD } = await import('./firebase-config.js');
        
        // Load gallery items
        const galleryItems = await GalleryCRUD.getAllItems(firebaseDatabase);
        if (galleryItems.length > 0) {
            updateGalleryFromFirebase(galleryItems);
        }
        
        // Load social links
        const socialLinks = await SocialLinksCRUD.getAllLinks(firebaseDatabase);
        if (Object.keys(socialLinks).length > 0) {
            updateSocialLinksFromFirebase(socialLinks);
        }
        
        // Load contact info
        const contactInfo = await ContactCRUD.getContact(firebaseDatabase);
        if (Object.keys(contactInfo).length > 0) {
            updateContactFromFirebase(contactInfo);
        }
        
        console.log('✅ Dynamic content loaded successfully');
    } catch (error) {
        console.error('Error loading dynamic content:', error);
    }
}

/**
 * Update gallery section with Firebase data
 */
function updateGalleryFromFirebase(items) {
    const galleryTrack = document.querySelector('.gallery-track');
    const indicators = document.querySelector('.gallery-indicators');
    
    if (!galleryTrack) return;
    
    // Clear existing content
    galleryTrack.innerHTML = '';
    if (indicators) indicators.innerHTML = '';
    
    // Add items from Firebase
    items.forEach((item, index) => {
        const isVideo = item.type === 'video';
        
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${isVideo ? 'video-item' : ''}`;
        
        if (isVideo) {
            galleryItem.innerHTML = `
                <video class="gallery-video" preload="metadata" poster="${item.poster || ''}">
                    <source src="${item.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="video-overlay">
                    <button class="video-play-btn" aria-label="Play video">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>${item.title}</h3>
                        <p>${item.description || ''}</p>
                        <span class="video-badge"><i class="fas fa-video"></i> Video</span>
                    </div>
                    <button class="gallery-zoom" aria-label="View fullscreen">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
            `;
        } else {
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>${item.title}</h3>
                        <p>${item.description || ''}</p>
                    </div>
                    <button class="gallery-zoom" aria-label="View full size">
                        <i class="fas fa-search-plus"></i>
                    </button>
                </div>
            `;
        }
        
        galleryTrack.appendChild(galleryItem);
        
        // Add indicator
        if (indicators) {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('role', 'tab');
            indicator.setAttribute('aria-selected', index === 0);
            indicator.setAttribute('aria-label', `Photo ${index + 1}`);
            indicators.appendChild(indicator);
        }
    });
    
    // Update counter
    const counterTotal = document.querySelector('.gallery-counter .total');
    if (counterTotal) {
        counterTotal.textContent = items.length;
    }
    
    // Re-initialize gallery carousel
    if (typeof GalleryCarousel !== 'undefined') {
        GalleryCarousel.init();
    }
    if (typeof Lightbox !== 'undefined') {
        Lightbox.init();
    }
}

/**
 * Update social links from Firebase
 */
function updateSocialLinksFromFirebase(links) {
    // Update SocialLinks object
    if (links.facebook?.url) SocialLinks.facebook = links.facebook.url;
    if (links.instagram?.url) SocialLinks.instagram = links.instagram.url;
    if (links.whatsapp?.url) SocialLinks.whatsapp = links.whatsapp.url;
    if (links.telegram?.url) SocialLinks.telegram = links.telegram.url;
    if (links.contact?.url) SocialLinks.contact = links.contact.url;
    if (links.gmail?.url) SocialLinks.gmail = links.gmail.url;
}

/**
 * Update contact information from Firebase
 */
function updateContactFromFirebase(contact) {
    const phoneElement = document.querySelector('.contact-item span');
    const emailElement = document.querySelectorAll('.contact-item span')[1];
    const directorElement = document.querySelector('.proprietor .name');
    
    if (contact.phone && phoneElement) {
        phoneElement.textContent = contact.phone;
    }
    if (contact.email && emailElement) {
        emailElement.textContent = contact.email;
    }
    if (contact.director && directorElement) {
        directorElement.textContent = contact.director;
    }
}

// Configuration constants
const CONFIG = {
    AUDIO_VISUALIZATION_DELAY: 1500,
    GSAP_LOAD_DELAY: 2000,
    CURSOR_INIT_DELAY: 1000,
    DEVICE_MOTION_DELAY: 2000,
    BEAT_SYNC_DELAY: 2000,
    PERFORMANCE_CHECK_DELAY: 3000,
    MAX_CURSOR_PARTICLES: 300,
    DEFAULT_PARTICLE_COUNT: 500, // Reduced from 1000 for better performance
    LOW_END_PARTICLE_COUNT: 300,
    PARTICLE_SPAWN_RATE: 0.7 // 70% spawn rate on low-end devices
};

// Social links configuration
const SocialLinks = {
    facebook: 'https://www.facebook.com/rex.khan3',
    instagram: 'https://www.instagram.com/s.factordancecrew/',
    whatsapp: 'https://wa.link/ntso2j',
    telegram: 'https://t.me/SfactorDanceCrew',
    contact: 'tel:9340073167',
    gmail: 'mailto:sfactorperformingart@gmail.com',
    
    open(platform) {
        const url = this[platform];
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            console.warn(`Social link for '${platform}' not found`);
        }
    }
};

// Add these variables at the top with the other Three.js variables
let cursorParticles = [];
let cursorParticleSystem;
let lastCursorPosition = { x: 0, y: 0 };
let clock;

// Event handlers for cleanup
let eventHandlers = {
    mouseMove: [],
    resize: [],
    scroll: [],
    keydown: [],
    deviceorientation: []
};

// Cleanup function to prevent memory leaks
function cleanup() {
    // Cancel animation frame
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Remove all tracked event listeners
    Object.keys(eventHandlers).forEach(eventType => {
        eventHandlers[eventType].forEach(handler => {
            if (eventType === 'mouseMove') {
                document.removeEventListener('mousemove', handler);
            } else if (eventType === 'scroll') {
                window.removeEventListener('scroll', handler);
            } else {
                window.removeEventListener(eventType, handler);
            }
        });
    });
    
    // Clear particle arrays
    cursorParticles = [];
    
    // Dispose Three.js objects
    if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
    }
    if (scene) {
        scene.clear();
    }
    
    console.log('Cleanup complete - resources released');
}

// Track event listener for cleanup
function addTrackedEventListener(target, eventType, handler, trackArray) {
    target.addEventListener(eventType, handler);
    eventHandlers[trackArray].push(handler);
}

// Call cleanup on page unload
window.addEventListener('beforeunload', cleanup);

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

// Add ripple effect to buttons - REMOVED (now handled in DOMContentLoaded above)

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

// Social media functions - replaced with event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listeners to social buttons
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
            
            // Open the social link
            const linkType = this.dataset.link;
            if (linkType) {
                SocialLinks.open(linkType);
            }
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
});

// Legacy functions removed - now using SocialLinks object

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
setTimeout(simulateAudioVisualization, CONFIG.AUDIO_VISUALIZATION_DELAY);

// THREE.JS IMPLEMENTATION
let scene, camera, renderer, particles, animationId;
let mouseX = 0, mouseY = 0;

// Modify the initThreeJsBackground function to include cursor tracking
function initThreeJsBackground() {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
        console.warn('WebGL not supported - Three.js background disabled');
        return; // Gracefully exit if WebGL not supported
    }
    
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
    
    // Load Three.js library dynamically with SRI integrity check
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.integrity = 'sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YjDUCjT0HDOHKXnVYdf3hU4JjM8uEhxf9nD1/ey98U3t2vZ0qQ==';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
        setupThreeJsScene(threeJsContainer);
    };
    script.onerror = () => {
        console.warn('Three.js CDN failed to load. Background particles disabled.');
        // Gracefully degrade - site still works without Three.js
    };
    document.head.appendChild(script);
    
    // Track mouse movement for interactive effects
    const mouseMoveHandler = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update cursor position for particles
        if (camera && THREE) {
            const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            lastCursorPosition = camera.position.clone().add(dir.multiplyScalar(distance));
            
            // Create cursor particles
            createCursorParticles();
        }
    };
    
    document.addEventListener('mousemove', mouseMoveHandler);
    eventHandlers.mouseMove.push(mouseMoveHandler);
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
    if (cursorParticles.length > CONFIG.MAX_CURSOR_PARTICLES) {
        cursorParticles = cursorParticles.slice(-CONFIG.MAX_CURSOR_PARTICLES);
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
    const resizeHandler = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', resizeHandler);
    eventHandlers.resize.push(resizeHandler);
    
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
    const particleCount = CONFIG.DEFAULT_PARTICLE_COUNT;
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
    try {
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
    } catch (error) {
        console.warn('Audio beat synchronization failed:', error.message);
        // Audio feature is optional - site still works without it
    }
}

// Call this function after initializing Three.js
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Add beat synchronization after a delay
    setTimeout(addBeatSynchronization, CONFIG.BEAT_SYNC_DELAY);
});

// Add keyboard-triggered dance animations
/**
 * Add interactive keyboard dance moves
 * 
 * Creates a floating guide and enables keyboard controls for particle animations.
 * Users can trigger spin, bounce, pop, and wave effects on the particle system.
 * The guide can be toggled via the dance-toggle button or by pressing '?'
 * 
 * @function addKeyboardDanceMoves
 * @requires GSAP library must be loaded
 * @global {THREE.Points} particles - Three.js particle system
 * @global {Object} gsap - GSAP animation library
 */
function addKeyboardDanceMoves() {
    const danceContainer = document.createElement('div');
    danceContainer.className = 'dance-moves-guide';
    danceContainer.style.cssText = `
        position: fixed;
        bottom: 130px;
        left: 20px;
        background: var(--surface);
        border: 2px solid var(--primary);
        border-radius: 10px;
        padding: 15px;
        color: var(--text-primary);
        font-size: 14px;
        z-index: 100;
        transform: translateY(150%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    `;
    danceContainer.innerHTML = `
        <div style="margin-bottom: 8px; font-weight: bold; color: var(--accent);">🎭 Keyboard Dance Moves:</div>
        <div style="margin: 5px 0;"><kbd style="background: var(--dark); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--primary);">S</kbd> - Spin move</div>
        <div style="margin: 5px 0;"><kbd style="background: var(--dark); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--primary);">B</kbd> - Bounce</div>
        <div style="margin: 5px 0;"><kbd style="background: var(--dark); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--primary);">P</kbd> - Pop</div>
        <div style="margin: 5px 0;"><kbd style="background: var(--dark); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--primary);">W</kbd> - Wave</div>
        <div style="margin-top: 10px; font-size: 12px; color: var(--text-secondary);">Press any key to activate!</div>
    `;
    document.body.appendChild(danceContainer);
    
    // Add toggle button functionality
    const danceToggle = document.querySelector('.dance-toggle');
    let isGuideVisible = false;
    
    if (danceToggle) {
        danceToggle.addEventListener('click', () => {
            isGuideVisible = !isGuideVisible;
            danceContainer.style.transform = isGuideVisible ? 'translateY(0%)' : 'translateY(150%)';
            danceToggle.style.transform = isGuideVisible ? 'rotate(360deg)' : 'rotate(0deg)';
        });
    }
    
    // Auto-show guide briefly on first visit
    const hasVisited = localStorage.getItem('sfactor_visited');
    if (!hasVisited) {
        setTimeout(() => {
            danceContainer.style.transform = 'translateY(0%)';
            isGuideVisible = true;
            setTimeout(() => {
                danceContainer.style.transform = 'translateY(150%)';
                isGuideVisible = false;
            }, 4000);
            localStorage.setItem('sfactor_visited', 'true');
        }, 3000);
    }
    
    // Toggle guide visibility with keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === '?') {
            isGuideVisible = !isGuideVisible;
            danceContainer.style.transform = isGuideVisible ? 'translateY(0%)' : 'translateY(150%)';
        }
        
        // Dance move: Spin
        if (e.key.toLowerCase() === 's') {
            if (particles && typeof gsap !== 'undefined') {
                gsap.to(particles.rotation, {
                    y: particles.rotation.y + Math.PI * 2,
                    duration: 1,
                    ease: "power2.inOut"
                });
            }
        }
        
        // Dance move: Bounce
        if (e.key.toLowerCase() === 'b') {
            if (particles && typeof gsap !== 'undefined') {
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
            if (particles && typeof gsap !== 'undefined') {
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
            if (particles && typeof gsap !== 'undefined') {
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
    script.integrity = 'sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ==';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
        console.log('GSAP loaded successfully');
        addKeyboardDanceMoves();
    };
    script.onerror = () => {
        console.warn('GSAP failed to load, using fallback animations');
        // Keyboard dance moves won't work, but site is still functional
    };
    document.head.appendChild(script);
}

// Call this after Three.js is loaded
setTimeout(loadGSAP, CONFIG.GSAP_LOAD_DELAY);

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
    
    // Check if GSAP is loaded before using it
    const useGSAP = typeof gsap !== 'undefined';
    
    document.addEventListener('mousemove', (e) => {
        if (useGSAP) {
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
        } else {
            // Fallback to direct style updates if GSAP not loaded
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        }
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
    
    // Hide default cursor - ONLY if custom cursor is working
    // Respect user preferences for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        document.body.style.cursor = 'none';
    } else {
        // Don't add custom cursor if user prefers reduced motion
        cursor.remove();
        cursorDot.remove();
        document.body.style.cursor = 'auto';
    }
}

// Call after page load
setTimeout(addCustomCursor, CONFIG.CURSOR_INIT_DELAY);

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
setTimeout(addDeviceMotionSupport, CONFIG.DEVICE_MOTION_DELAY);

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
        console.log('Low-end device detected - optimizing performance');
        
        // Reduce particle count
        if (particles) {
            const reducedCount = CONFIG.LOW_END_PARTICLE_COUNT; // Reduced from 1000
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
            if (Math.random() > CONFIG.PARTICLE_SPAWN_RATE) {
                originalCreateCursorParticles();
            }
        };
    }
}

// Call after Three.js is initialized
setTimeout(optimizePerformance, CONFIG.PERFORMANCE_CHECK_DELAY);

/**
 * Gallery Carousel & Lightbox Module
 * 
 * Provides interactive photo gallery with auto-sliding carousel,
 * touch/swipe support, and fullscreen lightbox preview.
 * 
 * @module gallery
 */

// Gallery Carousel Configuration
const GalleryCarousel = {
    track: null,
    items: [],
    indicators: [],
    currentIndex: 0,
    totalSlides: 6,
    autoPlayInterval: null,
    autoPlayDelay: 4000, // 4 seconds
    isTransitioning: false,
    
    init() {
        this.track = document.querySelector('.gallery-track');
        this.items = document.querySelectorAll('.gallery-item');
        this.indicators = document.querySelectorAll('.indicator');
        
        if (!this.track || this.items.length === 0) return;
        
        this.totalSlides = this.items.length;
        this.bindEvents();
        this.startAutoPlay();
        this.updateCounter();
    },
    
    bindEvents() {
        // Navigation buttons
        document.querySelector('.gallery-nav.prev')?.addEventListener('click', () => this.prev());
        document.querySelector('.gallery-nav.next')?.addEventListener('click', () => this.next());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });
        
        // Zoom buttons (different for photos vs videos)
        document.querySelectorAll('.gallery-zoom').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                Lightbox.open(index);
            });
        });
        
        // Click on image to open lightbox
        document.querySelectorAll('.gallery-item:not(.video-item)').forEach((item, index) => {
            item.addEventListener('click', () => Lightbox.open(index));
        });
        
        // Video play buttons
        document.querySelectorAll('.video-play-btn').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const videoItem = btn.closest('.video-item');
                const video = videoItem.querySelector('.gallery-video');
                this.toggleVideoPlay(video, btn);
            });
        });
        
        // Click on video to toggle play
        document.querySelectorAll('.gallery-video').forEach((video) => {
            video.addEventListener('click', (e) => {
                e.stopPropagation();
                const videoItem = video.closest('.video-item');
                const playBtn = videoItem.querySelector('.video-play-btn');
                this.toggleVideoPlay(video, playBtn);
            });
        });
        
        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.pauseAutoPlay();
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
            this.startAutoPlay();
        }, { passive: true });
        
        // Pause on hover (but not if video is playing)
        this.track.addEventListener('mouseenter', () => {
            if (!this.isVideoPlaying()) {
                this.pauseAutoPlay();
            }
        });
        this.track.addEventListener('mouseleave', () => {
            if (!this.isVideoPlaying()) {
                this.startAutoPlay();
            }
        });
    },
    
    next() {
        if (this.isTransitioning) return;
        this.goTo((this.currentIndex + 1) % this.totalSlides);
    },
    
    prev() {
        if (this.isTransitioning) return;
        this.goTo((this.currentIndex - 1 + this.totalSlides) % this.totalSlides);
    },
    
    goTo(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.isTransitioning = true;
        this.currentIndex = index;
        
        const offset = -index * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        this.indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
            ind.setAttribute('aria-selected', i === index);
        });
        
        this.updateCounter();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    },
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) this.next();
            else this.prev();
        }
    },
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    },
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    },
    
    updateCounter() {
        const currentEl = document.querySelector('.gallery-counter .current');
        if (currentEl) {
            currentEl.textContent = this.currentIndex + 1;
        }
    },
    
    toggleVideoPlay(video, playBtn) {
        if (video.paused) {
            // Pause all other videos first
            this.pauseAllVideos();
            
            // Play this video
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.style.opacity = '0.8';
            
            // Pause carousel auto-play while video is playing
            this.pauseAutoPlay();
        } else {
            // Pause this video
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.style.opacity = '1';
            
            // Resume carousel auto-play
            this.startAutoPlay();
        }
    },
    
    pauseAllVideos() {
        document.querySelectorAll('.gallery-video').forEach(video => {
            if (!video.paused) {
                video.pause();
                const videoItem = video.closest('.video-item');
                const playBtn = videoItem.querySelector('.video-play-btn');
                if (playBtn) {
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    playBtn.style.opacity = '1';
                }
            }
        });
    },
    
    isVideoPlaying() {
        let playing = false;
        document.querySelectorAll('.gallery-video').forEach(video => {
            if (!video.paused) {
                playing = true;
            }
        });
        return playing;
    }
};

// Lightbox Preview Module
const Lightbox = {
    modal: null,
    image: null,
    video: null,
    caption: null,
    currentIndex: 0,
    images: [],
    
    init() {
        this.modal = document.getElementById('lightbox');
        this.image = this.modal?.querySelector('.lightbox-image');
        this.video = this.modal?.querySelector('.lightbox-video');
        this.caption = this.modal?.querySelector('.lightbox-caption');
        
        if (!this.modal) return;
        
        // Collect all gallery items (photos and videos)
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            const isVideo = item.classList.contains('video-item');
            
            if (isVideo) {
                const video = item.querySelector('.gallery-video');
                const source = video.querySelector('source');
                this.images.push({
                    type: 'video',
                    src: source.src,
                    poster: video.poster,
                    alt: video.alt || '',
                    title: item.querySelector('h3')?.textContent || ''
                });
            } else {
                const img = item.querySelector('img');
                this.images.push({
                    type: 'image',
                    src: img.src,
                    alt: img.alt,
                    title: item.querySelector('h3')?.textContent || ''
                });
            }
        });
        
        this.bindEvents();
    },
    
    bindEvents() {
        // Close button
        this.modal.querySelector('.lightbox-close')?.addEventListener('click', () => this.close());
        
        // Navigation
        this.modal.querySelector('.lightbox-nav.prev')?.addEventListener('click', () => this.prev());
        this.modal.querySelector('.lightbox-nav.next')?.addEventListener('click', () => this.next());
        
        // Click outside image to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    },
    
    open(index) {
        this.currentIndex = index;
        this.updateMedia();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Pause video if playing
        if (this.video) {
            this.video.pause();
            this.video.currentTime = 0;
        }
    },
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateMedia();
    },
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateMedia();
    },
    
    updateMedia() {
        const media = this.images[this.currentIndex];
        
        // Pause any playing video first
        if (this.video) {
            this.video.pause();
        }
        
        if (media.type === 'video') {
            // Show video, hide image
            this.image.style.display = 'none';
            this.video.style.display = 'block';
            
            // Update video source
            const source = this.video.querySelector('source');
            source.src = media.src;
            this.video.poster = media.poster;
            this.video.load();
            
            // Update caption
            this.caption.textContent = media.title;
        } else {
            // Show image, hide video
            this.video.style.display = 'none';
            this.image.style.display = 'block';
            
            // Update image source
            this.image.src = media.src;
            this.image.alt = media.alt;
            
            // Update caption
            this.caption.textContent = media.title;
        }
    }
};

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    GalleryCarousel.init();
    Lightbox.init();
});
