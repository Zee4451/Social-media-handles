/**
 * UI Effects Module
 * 
 * Handles 3D tilt, parallax effects, scroll animations,
 * keyboard dance moves, and GSAP-dependent animations.
 * 
 * @module UIEffects
 * @version 1.0.0
 */

/**
 * Load GSAP library for smoother animations
 */
function loadGSAP(addKeyboardDanceMoves) {
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
    };
    document.head.appendChild(script);
}

/**
 * Add interactive keyboard dance moves
 */
function addKeyboardDanceMoves() {
    const danceContainer = document.createElement('div');
    danceContainer.className = 'dance-moves-guide';
    danceContainer.style.cssText = `
        position: fixed;
        bottom: 130px;
        left: 20px;
        background: var(--bg-card);
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
        <div style="margin-bottom: 8px; font-weight: bold; color: var(--primary);">🎭 Keyboard Dance Moves:</div>
        <div style="margin: 5px 0;"><kbd style="background: var(--bg-alt); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--primary);">S</kbd> - Spin move</div>
        <div style="margin: 5px 0;"><kbd style="background: var(--bg-alt); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--primary);">B</kbd> - Bounce</div>
        <div style="margin: 5px 0;"><kbd style="background: var(--bg-alt); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--primary);">P</kbd> - Pop</div>
        <div style="margin: 5px 0;"><kbd style="background: var(--bg-alt); padding: 2px 6px; border-radius: 3px; border: 1px solid var(--primary);">W</kbd> - Wave</div>
        <div style="margin-top: 10px; font-size: 12px; color: var(--text-secondary);">Press any key to activate!</div>
    `;
    document.body.appendChild(danceContainer);
    
    const danceToggle = document.querySelector('.dance-toggle');
    let isGuideVisible = false;
    
    if (danceToggle) {
        danceToggle.addEventListener('click', () => {
            isGuideVisible = !isGuideVisible;
            danceContainer.style.transform = isGuideVisible ? 'translateY(0%)' : 'translateY(150%)';
            danceToggle.style.transform = isGuideVisible ? 'rotate(360deg)' : 'rotate(0deg)';
        });
    }
    
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
    
    document.addEventListener('keydown', (e) => {
        if (e.key === '?') {
            isGuideVisible = !isGuideVisible;
            danceContainer.style.transform = isGuideVisible ? 'translateY(0%)' : 'translateY(150%)';
        }
        
        const particles = window.particles;
        
        if (e.key.toLowerCase() === 's' && particles && typeof gsap !== 'undefined') {
            gsap.to(particles.rotation, {
                y: particles.rotation.y + Math.PI * 2,
                duration: 1,
                ease: "power2.inOut"
            });
        }
        
        if (e.key.toLowerCase() === 'b' && particles && typeof gsap !== 'undefined') {
            gsap.to(particles.position, {
                y: 5,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: "bounce.out"
            });
        }
        
        if (e.key.toLowerCase() === 'p' && particles && typeof gsap !== 'undefined') {
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
        
        if (e.key.toLowerCase() === 'w' && particles && typeof gsap !== 'undefined') {
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
    });
}

/**
 * Initialize all UI effects
 */
function initUIEffects() {
    // Animate elements on page load with staggered timing
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
                icon.style.color = 'var(--primary)';
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.color = 'var(--text-secondary)';
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

    // Add enhanced parallax effect to image
    const image = document.querySelector('.image-container img');
    const imageContainer = document.querySelector('.image-container');

    if (image && imageContainer) {
        document.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = imageContainer.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            image.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.05, 1.05, 1.05)`;
            
            imageContainer.style.boxShadow = `
                ${-x * 20}px ${-y * 20}px 35px rgba(0, 0, 0, 0.3),
                0 0 0 2px var(--primary),
                0 0 20px rgba(184, 23, 43, 0.3)
            `;
        });
        
        document.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
            imageContainer.style.boxShadow = '0 15px 35px var(--shadow), 0 0 0 2px var(--primary), 0 0 20px rgba(184, 23, 43, 0.3)';
        });
    }

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
                i.style.color = 'var(--primary)';
                setTimeout(() => {
                    i.style.color = 'var(--primary)';
                }, 300);
            }
        });
    });

    // Add ripple effect to social buttons
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function(e) {
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
            
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
                setTimeout(() => {
                    ripple.remove();
                }, 300);
            }, 300);
        });
        
        button.addEventListener('mouseenter', function() {
            const iconWrapper = this.querySelector('.icon-wrapper');
            if (iconWrapper) {
                iconWrapper.style.boxShadow = '0 0 15px rgba(184, 23, 43, 0.5)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const iconWrapper = this.querySelector('.icon-wrapper');
            if (iconWrapper) {
                iconWrapper.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.2)';
            }
        });
    });

    // Load GSAP and initialize keyboard dance moves
    setTimeout(() => loadGSAP(addKeyboardDanceMoves), 2000);
}

export { initUIEffects, addKeyboardDanceMoves };
