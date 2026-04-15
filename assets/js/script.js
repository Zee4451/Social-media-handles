/**
 * S. Factor Dance Crew - Main Application Script
 * 
 * Main entry point that coordinates all modules:
 * - Frame-by-frame SVG loader
 * - Firebase dynamic content loading
 * - Three.js particle background system
 * - Audio visualization and beat synchronization
 * - UI effects and keyboard dance moves
 * - Gallery carousel and lightbox
 * 
 * @main
 * @version 3.0.0 (Modular)
 * @author S. Factor Dance Crew
 * @license MIT
 * 
 * @requires loader.js - SVG loader animation
 * @requires firebase-loader.js - Firebase content sync
 * @requires particles.js - Three.js particles
 * @requires audio-system.js - Audio visualization
 * @requires gallery.js - Carousel & lightbox
 * @requires ui-effects.js - UI animations & dance moves
 * 
 * @note
 * This script must be served via HTTP server (not file:// protocol)
 * due to ES6 module requirements and Three.js WebGL restrictions.
 */

// ========================================
// IMPORT ALL MODULES
// ========================================

import { FrameLoader } from './loader.js';
import { initializeFirebaseLoader } from './firebase-loader.js';
import { initThreeJsBackground, cleanupParticles } from './particles.js';
import { initAudioSystem } from './audio-system.js';
import { GalleryCarousel, Lightbox } from './gallery.js';
import { initUIEffects } from './ui-effects.js';

// ========================================
// GLOBAL CONFIGURATION
// ========================================

/**
 * Social links configuration
 */
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

// Make SocialLinks globally accessible for firebase-loader
window.SocialLinks = SocialLinks;

// ========================================
// EVENT HANDLER TRACKING & CLEANUP
// ========================================

let eventHandlers = {
    scroll: [],
    keydown: [],
    deviceorientation: []
};

/**
 * Cleanup function to prevent memory leaks
 */
function cleanup() {
    // Cancel animation frame
    if (window.animationId) {
        cancelAnimationFrame(window.animationId);
    }
    
    // Remove all tracked event listeners
    Object.keys(eventHandlers).forEach(eventType => {
        eventHandlers[eventType].forEach(handler => {
            if (eventType === 'scroll') {
                window.removeEventListener('scroll', handler);
            } else {
                window.removeEventListener(eventType, handler);
            }
        });
    });
    
    // Cleanup particles
    cleanupParticles();
    
    console.log('Cleanup complete - resources released');
}

// Track event listener for cleanup
function addTrackedEventListener(target, eventType, handler, trackArray) {
    target.addEventListener(eventType, handler);
    eventHandlers[trackArray].push(handler);
}

// Call cleanup on page unload
window.addEventListener('beforeunload', cleanup);

// ========================================
// MAIN APPLICATION INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 S. Factor Dance Crew - Initializing...');
    
    // 1. Initialize SVG loader (already started by loader.js)
    FrameLoader.init();
    
    // 2. Initialize Firebase and load dynamic content
    const firebaseDb = await initializeFirebaseLoader();
    
    // 3. Initialize Three.js particle background
    initThreeJsBackground();
    
    // 4. Initialize UI effects (animations, tilt, parallax, ripple)
    initUIEffects();
    
    // 5. Initialize gallery carousel and lightbox
    GalleryCarousel.init();
    Lightbox.init();
    
    // 6. Setup social link buttons
    document.querySelectorAll('.social-btn[data-link]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const linkType = this.dataset.link;
            if (linkType) {
                SocialLinks.open(linkType);
            }
        });
    });
    
    // 7. Initialize audio system (with delay for better performance)
    setTimeout(() => {
        initAudioSystem();
    }, 1500);
    
    console.log('✅ All modules initialized successfully');
});

// ========================================
// EXPORT FOR TESTING (optional)
// ========================================

export { SocialLinks, cleanup };
