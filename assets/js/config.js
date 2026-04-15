/**
 * Application Configuration Module
 * 
 * Contains all configuration constants and social media link management.
 * Centralizes magic numbers and URLs for easy maintenance.
 * 
 * @module config
 */

/**
 * Application configuration constants
 * 
 * All timing values are in milliseconds unless otherwise noted.
 * Particle counts affect performance - adjust based on target devices.
 * 
 * @namespace CONFIG
 * @type {Object}
 * @property {number} AUDIO_VISUALIZATION_DELAY - Delay before audio visualization starts (1500ms)
 * @property {number} GSAP_LOAD_DELAY - Delay before loading GSAP animation library (2000ms)
 * @property {number} CURSOR_INIT_DELAY - Delay before initializing custom cursor (1000ms)
 * @property {number} DEVICE_MOTION_DELAY - Delay before enabling device motion tracking (2000ms)
 * @property {number} BEAT_SYNC_DELAY - Delay before starting audio beat synchronization (2000ms)
 * @property {number} PERFORMANCE_CHECK_DELAY - Delay before running performance optimization (3000ms)
 * @property {number} MAX_CURSOR_PARTICLES - Maximum cursor trail particles allowed (300)
 * @property {number} DEFAULT_PARTICLE_COUNT - Default Three.js particle count (500)
 * @property {number} LOW_END_PARTICLE_COUNT - Reduced particle count for low-end devices (300)
 * @property {number} PARTICLE_SPAWN_RATE - Probability of spawning cursor particles (0.7 = 70%)
 */
export const CONFIG = {
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

/**
 * Social media link management
 * 
 * Centralized storage for all social media URLs and contact information.
 * Provides a safe method to open links with security best practices.
 * 
 * @namespace SocialLinks
 * @type {Object}
 * @property {string} facebook - Facebook page URL
 * @property {string} instagram - Instagram profile URL
 * @property {string} whatsapp - WhatsApp direct link
 * @property {string} telegram - Telegram channel/group link
 * @property {string} contact - Telephone link for adding contact
 * @property {string} gmail - Mailto link for email
 * 
 * @example
 * // Open Instagram in new tab
 * SocialLinks.open('instagram');
 * 
 * @example
 * // Access URL directly
 * const fbUrl = SocialLinks.facebook;
 */
export const SocialLinks = {
    facebook: 'https://www.facebook.com/rex.khan3',
    instagram: 'https://www.instagram.com/s.factordancecrew/',
    whatsapp: 'https://wa.link/ntso2j',
    telegram: 'https://t.me/SfactorDanceCrew',
    contact: 'tel:9340073167',
    gmail: 'mailto:sfactorperformingart@gmail.com',
    
    /**
     * Open a social media link in a new secure tab
     * 
     * Opens the specified platform's URL in a new browser tab
     * with security attributes (noopener, noreferrer) to prevent
     * tabnapping attacks and referrer leakage.
     * 
     * @function open
     * @memberof SocialLinks
     * @param {string} platform - The social media platform to open
     * @param {string} platform.facebook - Open Facebook page
     * @param {string} platform.instagram - Open Instagram profile
     * @param {string} platform.whatsapp - Open WhatsApp chat
     * @param {string} platform.telegram - Open Telegram channel
     * @param {string} platform.contact - Open phone dialer
     * @param {string} platform.gmail - Open email client
     * 
     * @returns {void}
     * 
     * @throws {Error} Logs warning to console if platform not found
     * 
     * @example
     * SocialLinks.open('instagram');
     * 
     * @example
     * SocialLinks.open('whatsapp');
     */
    open(platform) {
        const url = this[platform];
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            console.warn(`Social link for '${platform}' not found`);
        }
    }
};
