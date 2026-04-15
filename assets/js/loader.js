/**
 * Frame-by-Frame SVG Loader Animation
 * 
 * Displays an 81-frame SVG animation during page load.
 * Animation completes at least one full cycle before fading out.
 * 
 * @module FrameLoader
 * @version 1.0.0
 */

const FrameLoader = {
    totalFrames: 81,
    currentFrame: 1,
    fps: 20,
    frameDuration: 50, // 50ms = 20 FPS
    loaderElement: null,
    frameElement: null,
    animationTimer: null,
    isComplete: false,

    /**
     * Initialize the loader and start animation
     */
    init() {
        this.loaderElement = document.getElementById('page-loader');
        this.frameElement = document.getElementById('loader-frame');
        
        if (!this.loaderElement || !this.frameElement) {
            console.warn('Loader elements not found');
            return;
        }

        // Prevent scrolling while loader is active
        document.body.classList.add('loader-active');
        
        // Start animation immediately
        this.startAnimation();
        
        // Listen for page load completion
        window.addEventListener('load', () => {
            this.onPageLoaded();
        });

        // Fallback: hide loader after 8 seconds maximum
        setTimeout(() => {
            if (!this.isComplete) {
                this.hide();
            }
        }, 8000);
    },

    /**
     * Start the frame-by-frame animation loop
     */
    startAnimation() {
        this.showFrame(this.currentFrame);
        
        this.animationTimer = setInterval(() => {
            this.currentFrame++;
            
            if (this.currentFrame > this.totalFrames) {
                // Loop back to frame 1 if page hasn't loaded yet
                this.currentFrame = 1;
            }
            
            this.showFrame(this.currentFrame);
        }, this.frameDuration);
    },

    /**
     * Load and display a specific SVG frame
     * @param {number} frameNumber - Frame number (1-81)
     */
    showFrame(frameNumber) {
        // Pad number to 3 digits (001, 002, ..., 081)
        const paddedNumber = String(frameNumber).padStart(3, '0');
        const svgPath = `loader/Create_a_stylish,_202604160038_${paddedNumber}.svg`;
        
        // Load SVG using fetch for better performance
        fetch(svgPath)
            .then(response => {
                if (!response.ok) throw new Error(`Frame ${frameNumber} not found`);
                return response.text();
            })
            .then(svgContent => {
                this.frameElement.innerHTML = svgContent;
            })
            .catch(error => {
                console.warn(`Failed to load frame ${frameNumber}:`, error);
                // Skip to next frame on error
            });
    },

    /**
     * Handle page load completion - wait for animation cycle to finish
     */
    onPageLoaded() {
        // Calculate time to complete current animation cycle
        // 81 frames × 50ms = 4050ms for full cycle
        const framesRemaining = this.totalFrames - this.currentFrame;
        const timeToCompleteCycle = framesRemaining * this.frameDuration;
        
        // Wait for current cycle to complete, then add 500ms buffer
        setTimeout(() => {
            this.hide();
        }, timeToCompleteCycle + 500);
    },

    /**
     * Fade out and remove loader from DOM
     */
    hide() {
        if (this.isComplete) return;
        this.isComplete = true;

        // Stop animation
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
        }

        // Hide loader with fade-out
        if (this.loaderElement) {
            this.loaderElement.classList.add('hidden');
            
            // Remove from DOM after transition completes
            setTimeout(() => {
                if (this.loaderElement && this.loaderElement.parentNode) {
                    this.loaderElement.parentNode.removeChild(this.loaderElement);
                }
                document.body.classList.remove('loader-active');
            }, 500);
        }
    }
};

export { FrameLoader };
