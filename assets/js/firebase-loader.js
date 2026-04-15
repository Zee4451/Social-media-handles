/**
 * Firebase Dynamic Content Loader
 * 
 * Loads and synchronizes gallery items, social links, and contact information
 * from Firebase Realtime Database.
 * 
 * @module FirebaseLoader
 * @version 1.0.0
 */

/**
 * Update gallery section with Firebase data
 * @param {Array} items - Gallery items from Firebase
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
    // Access SocialLinks from global scope
    const SocialLinks = window.SocialLinks;
    if (!SocialLinks) return;
    
    if (links.facebook?.url) SocialLinks.facebook = links.facebook.url;
    if (links.instagram?.url) SocialLinks.instagram = links.instagram.url;
    if (links.whatsapp?.url) SocialLinks.whatsapp = links.whatsapp.url;
    if (links.telegram?.url) SocialLinks.telegram = links.telegram.url;
    if (links.contact?.url) SocialLinks.contact = links.contact.url;
    if (links.gmail?.url) SocialLinks.gmail = links.gmail.url;
}

/**
 * Update contact information from Firebase
 * @param {Object} contact - Contact info from Firebase
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

/**
 * Load dynamic content from Firebase
 * @param {Object} firebaseDatabase - Firebase database instance
 */
async function loadDynamicContent(firebaseDatabase) {
    if (!firebaseDatabase) return;
    
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
 * Initialize Firebase and load dynamic content
 * @returns {Promise<Object|null>} Firebase database instance or null
 */
async function initializeFirebaseLoader() {
    try {
        const firebaseModule = await import('./firebase-config.js');
        
        if (firebaseModule.isFirebaseConfigured) {
            const { initializeFirebase } = firebaseModule;
            const firebase = await initializeFirebase();
            
            console.log('✅ Firebase connected - Dynamic content enabled');
            
            // Load dynamic content
            await loadDynamicContent(firebase.database);
            
            return firebase.database;
        }
    } catch (error) {
        console.warn('⚠️ Firebase initialization failed, using static content:', error.message);
    }
    
    return null;
}

export { 
    loadDynamicContent, 
    initializeFirebaseLoader,
    updateGalleryFromFirebase,
    updateSocialLinksFromFirebase,
    updateContactFromFirebase
};
