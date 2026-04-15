/**
 * Firebase Configuration Module
 * 
 * Contains Firebase SDK initialization and database configuration.
 * This module handles all Firebase connections for CRUD operations.
 * 
 * @module firebase-config
 * @requires Firebase SDK v9+ (loaded via CDN)
 */

// Firebase configuration - YOUR PROJECT CONFIG
// ⚠️ This file MUST exist on GitHub for the site to work
export const firebaseConfig = {
    apiKey: "AIzaSyBONodpaChaV7StStdfPXqXHvkgUQMIhXY",
    authDomain: "carvoyage-2led3.firebaseapp.com",
    databaseURL: "https://carvoyage-2led3-default-rtdb.firebaseio.com",
    projectId: "carvoyage-2led3",
    storageBucket: "carvoyage-2led3.firebasestorage.app",
    messagingSenderId: "790960970254",
    appId: "1:790960970254:web:b9f92f60ae4e744b40ba5f"
};

// Flag to indicate if this is the real config or template
export const isFirebaseConfigured = true;

/**
 * Upload file to Firebase Storage
 * 
 * @async
 * @function uploadFile
 * @param {Object} storage - Firebase storage instance
 * @param {File} file - File to upload
 * @param {string} folder - Folder name (gallery, videos, posters)
 * @returns {Promise<string>} Download URL of uploaded file
 */
export async function uploadFile(file, folder = 'gallery') {
    try {
        const { ref, uploadBytes, getDownloadURL } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js');
        const { getStorage } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js');
        
        const storage = getStorage();
        
        // Create unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const extension = file.name.split('.').pop();
        const filename = `${folder}/${timestamp}_${randomId}.${extension}`;
        
        // Create storage reference
        const storageRef = ref(storage, filename);
        
        // Upload file
        const snapshot = await uploadBytes(storageRef, file);
        
        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        console.log('File uploaded successfully:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

/**
 * Initialize Firebase and return database instance
 * 
 * @async
 * @function initializeFirebase
 * @returns {Promise<Object>} Firebase app instance
 * 
 * @example
 * const app = await initializeFirebase();
 */
export async function initializeFirebase() {
    try {
        // Import Firebase modules dynamically
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
        const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
        const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
        
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const auth = getAuth(app);
        
        console.log('Firebase initialized successfully');
        return { app, database, auth };
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        throw error;
    }
}

/**
 * Firebase CRUD Operations for Gallery Items
 * 
 * @namespace GalleryCRUD
 */
export const GalleryCRUD = {
    /**
     * Add a new gallery item to Firebase
     * 
     * @async
     * @function addItem
     * @param {Object} database - Firebase database instance
     * @param {Object} item - Gallery item data
     * @param {string} item.type - 'image' or 'video'
     * @param {string} item.src - Media URL
     * @param {string} item.title - Media title
     * @param {string} item.description - Media description
     * @param {string} [item.poster] - Video poster image (for videos only)
     * @returns {Promise<string>} The pushed item's key
     * 
     * @example
     * const key = await GalleryCRUD.addItem(db, {
     *     type: 'image',
     *     src: './gallery/new-photo.jpg',
     *     title: 'New Performance',
     *     description: 'Live Show 2024'
     * });
     */
    async addItem(database, item) {
        try {
            const { ref, push, set } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
            const galleryRef = ref(database, 'gallery');
            const newItemRef = push(galleryRef);
            
            await set(newItemRef, {
                ...item,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
            
            console.log('Gallery item added:', newItemRef.key);
            return newItemRef.key;
        } catch (error) {
            console.error('Error adding gallery item:', error);
            throw error;
        }
    },
    
    /**
     * Get all gallery items from Firebase
     * 
     * @async
     * @function getAllItems
     * @param {Object} database - Firebase database instance
     * @returns {Promise<Array>} Array of gallery items with their keys
     * 
     * @example
     * const items = await GalleryCRUD.getAllItems(db);
     */
    async getAllItems(database) {
        try {
            const { ref, get } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
            const galleryRef = ref(database, 'gallery');
            const snapshot = await get(galleryRef);
            
            if (snapshot.exists()) {
                const items = [];
                snapshot.forEach((childSnapshot) => {
                    items.push({
                        key: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                return items;
            }
            return [];
        } catch (error) {
            console.error('Error getting gallery items:', error);
            throw error;
        }
    },
    
    /**
     * Update an existing gallery item
     * 
     * @async
     * @function updateItem
     * @param {Object} database - Firebase database instance
     * @param {string} key - Item key to update
     * @param {Object} updates - Fields to update
     * @returns {Promise<void>}
     * 
     * @example
     * await GalleryCRUD.updateItem(db, 'item-key-123', {
     *     title: 'Updated Title',
     *     description: 'New description'
     * });
     */
    async updateItem(database, key, updates) {
        try {
            const { ref, update } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
            const itemRef = ref(database, `gallery/${key}`);
            
            await update(itemRef, {
                ...updates,
                updatedAt: Date.now()
            });
            
            console.log('Gallery item updated:', key);
        } catch (error) {
            console.error('Error updating gallery item:', error);
            throw error;
        }
    },
    
    /**
     * Delete a gallery item
     * 
     * @async
     * @function deleteItem
     * @param {Object} database - Firebase database instance
     * @param {string} key - Item key to delete
     * @returns {Promise<void>}
     * 
     * @example
     * await GalleryCRUD.deleteItem(db, 'item-key-123');
     */
    async deleteItem(database, key) {
        try {
            const { ref, remove } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
            const itemRef = ref(database, `gallery/${key}`);
            
            await remove(itemRef);
            console.log('Gallery item deleted:', key);
        } catch (error) {
            console.error('Error deleting gallery item:', error);
            throw error;
        }
    }
};

/**
 * Firebase CRUD Operations for Social Links
 * 
 * @namespace SocialLinksCRUD
 */
export const SocialLinksCRUD = {
    /**
     * Update a social link
     * 
     * @async
     * @function updateLink
     * @param {Object} database - Firebase database instance
     * @param {string} platform - Platform name (facebook, instagram, etc.)
     * @param {string} url - New URL
     * @returns {Promise<void>}
     * 
     * @example
     * await SocialLinksCRUD.updateLink(db, 'instagram', 'https://instagram.com/newprofile');
     */
    async updateLink(database, platform, url) {
        try {
            const { ref, update } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
            const linkRef = ref(database, `socialLinks/${platform}`);
            
            await update(linkRef, {
                url: url,
                updatedAt: Date.now()
            });
            
            console.log(`Social link updated: ${platform}`);
        } catch (error) {
            console.error('Error updating social link:', error);
            throw error;
        }
    },
    
    /**
     * Get all social links
     * 
     * @async
     * @function getAllLinks
     * @param {Object} database - Firebase database instance
     * @returns {Promise<Object>} Object with platform URLs
     * 
     * @example
     * const links = await SocialLinksCRUD.getAllLinks(db);
     */
    async getAllLinks(database) {
        try {
            const { ref, get } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
            const linksRef = ref(database, 'socialLinks');
            const snapshot = await get(linksRef);
            
            if (snapshot.exists()) {
                return snapshot.val();
            }
            return {};
        } catch (error) {
            console.error('Error getting social links:', error);
            throw error;
        }
    }
};

/**
 * Firebase CRUD Operations for Contact Information
 * 
 * @namespace ContactCRUD
 */
export const ContactCRUD = {
    /**
     * Update contact information
     * 
     * @async
     * @function updateContact
     * @param {Object} database - Firebase database instance
     * @param {Object} contactData - Contact information
     * @param {string} contactData.phone - Phone number
     * @param {string} contactData.email - Email address
     * @param {string} [contactData.director] - Director name
     * @returns {Promise<void>}
     * 
     * @example
     * await ContactCRUD.updateContact(db, {
     *     phone: '9340073167',
     *     email: 'sfactorperformingart@gmail.com',
     *     director: 'MAK-E'
     * });
     */
    async updateContact(database, contactData) {
        try {
            const { ref, update } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
            const contactRef = ref(database, 'contact');
            
            await update(contactRef, {
                ...contactData,
                updatedAt: Date.now()
            });
            
            console.log('Contact information updated');
        } catch (error) {
            console.error('Error updating contact info:', error);
            throw error;
        }
    },
    
    /**
     * Get contact information
     * 
     * @async
     * @function getContact
     * @param {Object} database - Firebase database instance
     * @returns {Promise<Object>} Contact information
     * 
     * @example
     * const contact = await ContactCRUD.getContact(db);
     */
    async getContact(database) {
        try {
            const { ref, get } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');
            const contactRef = ref(database, 'contact');
            const snapshot = await get(contactRef);
            
            if (snapshot.exists()) {
                return snapshot.val();
            }
            return {};
        } catch (error) {
            console.error('Error getting contact info:', error);
            throw error;
        }
    }
};
