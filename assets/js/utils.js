/**
 * Utility Functions Module
 * 
 * Provides shared utility functions including event listener tracking,
 * resource cleanup, and helper methods used across the application.
 * 
 * @module utils
 */

/**
 * Event handler registry for cleanup
 * 
 * Tracks all event listeners added throughout the application
 * to enable proper cleanup and prevent memory leaks.
 * 
 * @type {Object}
 * @property {Array<Function>} mouseMove - Mouse move event handlers
 * @property {Array<Function>} resize - Window resize event handlers
 * @property {Array<Function>} scroll - Scroll event handlers
 * @property {Array<Function>} keydown - Keyboard event handlers
 * @property {Array<Function>} deviceorientation - Device orientation handlers
 */
export const eventHandlers = {
    mouseMove: [],
    resize: [],
    scroll: [],
    keydown: [],
    deviceorientation: []
};

/**
 * Three.js resources registry
 * 
 * Stores references to Three.js objects for proper disposal
 * during cleanup to prevent WebGL memory leaks.
 * 
 * @type {Object}
 * @property {THREE.Scene|null} scene - Three.js scene object
 * @property {THREE.WebGLRenderer|null} renderer - Three.js renderer
 * @property {THREE.PerspectiveCamera|null} camera - Three.js camera
 * @property {number|null} animationId - requestAnimationFrame ID
 */
export const threeResources = {
    scene: null,
    renderer: null,
    camera: null,
    animationId: null
};

/**
 * Add a tracked event listener
 * 
 * Adds an event listener and registers it in the eventHandlers
 * registry for later cleanup. This ensures all event listeners
 * can be properly removed when the application is destroyed.
 * 
 * @function addTrackedEventListener
 * @param {EventTarget} target - The event target (window, document, element)
 * @param {string} eventType - The event type (e.g., 'click', 'mousemove')
 * @param {Function} handler - The event handler function
 * @param {string} trackArray - The registry array name in eventHandlers
 * 
 * @example
 * const handler = (e) => console.log(e);
 * addTrackedEventListener(window, 'resize', handler, 'resize');
 * 
 * @example
 * addTrackedEventListener(document, 'mousemove', mouseHandler, 'mouseMove');
 */
export function addTrackedEventListener(target, eventType, handler, trackArray) {
    target.addEventListener(eventType, handler);
    if (eventHandlers[trackArray]) {
        eventHandlers[trackArray].push(handler);
    } else {
        console.warn(`Track array '${trackArray}' not found in eventHandlers`);
    }
}

/**
 * Clean up all resources and prevent memory leaks
 * 
 * Performs comprehensive cleanup of all application resources including:
 * - Cancels animation frames
 * - Removes all tracked event listeners
 * - Disposes Three.js renderer and clears scene
 * - Clears particle arrays
 * 
 * This function should be called when the application is destroyed
 * or when the user navigates away from the page.
 * 
 * @function cleanup
 * @returns {void}
 * 
 * @example
 * // Clean up on page unload
 * window.addEventListener('beforeunload', cleanup);
 * 
 * @example
 * // Manual cleanup
 * cleanup();
 */
export function cleanup() {
    console.log('Starting cleanup process...');
    
    // Cancel animation frame
    if (threeResources.animationId) {
        cancelAnimationFrame(threeResources.animationId);
        console.log('Animation frame cancelled');
    }
    
    // Remove all tracked event listeners
    Object.keys(eventHandlers).forEach(eventType => {
        eventHandlers[eventType].forEach(handler => {
            try {
                if (eventType === 'mouseMove') {
                    document.removeEventListener('mousemove', handler);
                } else if (eventType === 'scroll') {
                    window.removeEventListener('scroll', handler);
                } else {
                    window.removeEventListener(eventType, handler);
                }
            } catch (error) {
                console.warn(`Failed to remove ${eventType} listener:`, error);
            }
        });
        eventHandlers[eventType] = [];
    });
    console.log('Event listeners removed');
    
    // Dispose Three.js objects
    if (threeResources.renderer) {
        try {
            threeResources.renderer.dispose();
            if (threeResources.renderer.domElement && threeResources.renderer.domElement.parentNode) {
                threeResources.renderer.domElement.parentNode.removeChild(threeResources.renderer.domElement);
            }
            console.log('Three.js renderer disposed');
        } catch (error) {
            console.warn('Failed to dispose renderer:', error);
        }
    }
    
    if (threeResources.scene) {
        try {
            threeResources.scene.clear();
            console.log('Three.js scene cleared');
        } catch (error) {
            console.warn('Failed to clear scene:', error);
        }
    }
    
    console.log('Cleanup complete - resources released');
}

/**
 * Detect if the device is low-end
 * 
 * Checks hardware capabilities to determine if performance
 * optimizations should be applied. Considers CPU cores,
 * device memory, and screen size.
 * 
 * @function isLowEndDevice
 * @returns {boolean} True if device has limited resources
 * 
 * @example
 * if (isLowEndDevice()) {
 *     reduceParticleCount();
 * }
 */
export function isLowEndDevice() {
    return (
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || 
        (navigator.deviceMemory && navigator.deviceMemory <= 4) || 
        window.innerWidth < 600
    );
}

/**
 * Check if WebGL is supported
 * 
 * Tests if the browser supports WebGL by attempting to create
 * a WebGL context on a temporary canvas element.
 * 
 * @function isWebGLSupported
 * @returns {boolean} True if WebGL is supported
 * 
 * @example
 * if (!isWebGLSupported()) {
 *     console.warn('WebGL not supported, falling back to CSS animations');
 * }
 */
export function isWebGLSupported() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
    } catch (e) {
        return false;
    }
}

/**
 * Load an external script with error handling
 * 
 * Dynamically loads a JavaScript file from a URL with optional
 * integrity checking (SRI) and error handling.
 * 
 * @function loadScript
 * @param {string} url - The script URL to load
 * @param {string} [integrity] - Optional SRI hash for security
 * @param {Function} [onLoad] - Callback when script loads successfully
 * @param {Function} [onError] - Callback when script fails to load
 * @returns {HTMLScriptElement} The script element
 * 
 * @example
 * loadScript(
 *     'https://cdn.example.com/library.js',
 *     'sha384-abc123...',
 *     () => console.log('Loaded'),
 *     () => console.error('Failed')
 * );
 */
export function loadScript(url, integrity, onLoad, onError) {
    const script = document.createElement('script');
    script.src = url;
    
    if (integrity) {
        script.integrity = integrity;
        script.crossOrigin = 'anonymous';
    }
    
    if (onLoad) {
        script.onload = onLoad;
    }
    
    if (onError) {
        script.onerror = onError;
    }
    
    document.head.appendChild(script);
    return script;
}
