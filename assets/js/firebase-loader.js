/**
 * Firebase Dynamic Content Loader
 * 
 * Loads and synchronizes gallery items, social links, and contact information
 * from Firebase Realtime Database.
 * 
 * @module FirebaseLoader
 * @version 2.0.0 (Instagram Card UI - 2026-04-15)
 */

/**
 * Update gallery section with Firebase data
 * @param {Array} items - Gallery items from Firebase
 */
function updateGalleryFromFirebase(items) {
    const mediaTrack = document.querySelector('.media-track');
    const carouselDots = document.querySelector('.carousel-dots');
    const captionContent = document.querySelector('.caption-content');
    const timestampText = document.querySelector('.timestamp-text');
    
    if (!mediaTrack) return;
    
    // Clear existing content
    mediaTrack.innerHTML = '';
    if (carouselDots) carouselDots.innerHTML = '';
    
    // Add items from Firebase
    items.forEach((item, index) => {
        const isVideo = item.type === 'video';
        
        const mediaItem = document.createElement('div');
        mediaItem.className = `media-item ${isVideo ? 'video-item' : ''}`;
        
        if (isVideo) {
            mediaItem.innerHTML = `
                <video class="gallery-video" preload="metadata" poster="${item.poster || ''}">
                    <source src="${item.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="video-play-overlay">
                    <button class="video-play-btn" aria-label="Play video">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            `;
        } else {
            mediaItem.innerHTML = `
                <img src="${item.src}" alt="${item.title}" loading="lazy">
            `;
        }
        
        mediaTrack.appendChild(mediaItem);
        
        // Add carousel dot
        if (carouselDots) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-selected', index === 0);
            dot.setAttribute('aria-label', `Media ${index + 1}`);
            carouselDots.appendChild(dot);
        }
    });
    
    // Update caption with first item's title
    if (captionContent && items.length > 0) {
        captionContent.textContent = items[0].title || '';
    }
    
    // Update timestamp
    if (timestampText) {
        const now = new Date();
        timestampText.textContent = `${now.toLocaleDateString()} · S. Factor Dance Crew`;
    }
    
    // Re-initialize gallery carousel and lightbox
    if (typeof window.GalleryCarousel !== 'undefined') {
        window.GalleryCarousel.init();
    }
    if (typeof window.Lightbox !== 'undefined') {
        window.Lightbox.init();
    }
}

/**
 * Update social links from Firebase
 * @param {Object} links - Social links from Firebase
 */
function updateSocialLinksFromFirebase(links) {
    document.querySelectorAll('.social-btn[data-link]').forEach(btn => {
        const linkType = btn.dataset.link;
        if (links[linkType]) {
            btn.onclick = () => {
                window.open(links[linkType], '_blank', 'noopener,noreferrer');
            };
        }
    });
}

/**
 * Update contact info from Firebase
 * @param {Object} contact - Contact information from Firebase
 */
function updateContactFromFirebase(contact) {
    const contactItems = document.querySelectorAll('.contact-item span');
    if (contactItems.length >= 2) {
        if (contact.phone) contactItems[0].textContent = contact.phone;
        if (contact.email) contactItems[1].textContent = contact.email;
    }
}

/**
 * Initialize Firebase and load all dynamic content
 */
async function initializeFirebaseLoader() {
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
        const { firebaseConfig } = await import('./firebase-config.js');
        const { getDatabase, ref, get } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
        
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        
        // Load gallery items
        const gallerySnapshot = await get(ref(database, 'gallery'));
        if (gallerySnapshot.exists()) {
            const items = Object.entries(gallerySnapshot.val()).map(([key, value]) => ({
                key,
                ...value
            }));
            updateGalleryFromFirebase(items);
        }
        
        // Load social links
        const socialSnapshot = await get(ref(database, 'socialLinks'));
        if (socialSnapshot.exists()) {
            updateSocialLinksFromFirebase(socialSnapshot.val());
        }
        
        // Load contact info
        const contactSnapshot = await get(ref(database, 'contact'));
        if (contactSnapshot.exists()) {
            updateContactFromFirebase(contactSnapshot.val());
        }
    } catch (error) {
        console.error('Error loading Firebase data:', error);
    }
}

export { initializeFirebaseLoader, updateGalleryFromFirebase, updateSocialLinksFromFirebase, updateContactFromFirebase };
