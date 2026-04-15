/**
 * Admin Panel JavaScript
 * 
 * Handles Firebase authentication, CRUD operations, and UI interactions
 * for the S. Factor Dance Crew admin panel.
 * 
 * @module admin
 */

import { initializeFirebase, GalleryCRUD, SocialLinksCRUD, ContactCRUD } from './firebase-config.js';
import { uploadToCloudinary, validateFile, getFileType } from './cloudinary-config.js';

// Global state
let firebaseApp = null;
let database = null;
let auth = null;
let currentUser = null;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const adminDashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const navBtns = document.querySelectorAll('.nav-btn[data-section]');
const contentSections = document.querySelectorAll('.content-section');

// Gallery elements
const galleryList = document.getElementById('gallery-list');
const addGalleryBtn = document.getElementById('add-gallery-btn');
const galleryModal = document.getElementById('gallery-modal');
const galleryForm = document.getElementById('gallery-form');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.querySelector('.modal-close');
const modalCancel = document.querySelector('.modal-cancel');
const mediaTypeSelect = document.getElementById('media-type');
const posterGroup = document.getElementById('poster-group');
const posterUploadGroup = document.getElementById('poster-upload-group');

// Toast
const toast = document.getElementById('toast');

/**
 * Initialize Admin Panel
 */
async function init() {
    try {
        // Initialize Firebase
        const firebase = await initializeFirebase();
        database = firebase.database;
        auth = firebase.auth;
        
        console.log('Firebase connected');
        updateDbStatus('connected');
        
        // Check authentication state
        auth.onAuthStateChanged((user) => {
            if (user) {
                currentUser = user;
                showDashboard();
                loadAllData();
            } else {
                showLogin();
            }
        });
        
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        updateDbStatus('error');
        showToast('Failed to connect to database', 'error');
    }
}

/**
 * Show login screen
 */
function showLogin() {
    loginScreen.style.display = 'flex';
    adminDashboard.style.display = 'none';
}

/**
 * Show admin dashboard
 */
function showDashboard() {
    loginScreen.style.display = 'none';
    adminDashboard.style.display = 'flex';
}

/**
 * Update database status indicator
 */
function updateDbStatus(status) {
    const statusDot = document.getElementById('db-status');
    const statusText = document.getElementById('db-status-text');
    
    if (statusDot && statusText) {
        statusDot.className = `status-dot ${status}`;
        statusText.textContent = status === 'connected' ? 'Connected' : 
                                 status === 'error' ? 'Connection Error' : 'Connecting...';
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Authentication
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        loginError.textContent = 'Logging in...';
        
        const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
        await signInWithEmailAndPassword(auth, email, password);
        
        loginError.textContent = '';
        showToast('Login successful!', 'success');
    } catch (error) {
        console.error('Login error:', error);
        loginError.textContent = getAuthErrorMessage(error.code);
    }
});

/**
 * Get user-friendly auth error messages
 */
function getAuthErrorMessage(code) {
    const messages = {
        'auth/invalid-email': 'Invalid email address',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-credential': 'Invalid email or password',
        'auth/too-many-requests': 'Too many failed attempts. Try again later'
    };
    return messages[code] || 'Login failed. Please try again.';
}

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        const { signOut } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
        await signOut(auth);
        showToast('Logged out successfully', 'success');
    } catch (error) {
        console.error('Logout error:', error);
    }
});

// Navigation
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        
        // Update active nav
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active section
        contentSections.forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');
    });
});

// Load all data
async function loadAllData() {
    await Promise.all([
        loadGalleryItems(),
        loadSocialLinks(),
        loadContactInfo()
    ]);
}

// Gallery Management
async function loadGalleryItems() {
    try {
        const items = await GalleryCRUD.getAllItems(database);
        renderGalleryItems(items);
    } catch (error) {
        console.error('Error loading gallery:', error);
        showToast('Failed to load gallery items', 'error');
    }
}

function renderGalleryItems(items) {
    if (items.length === 0) {
        galleryList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">No gallery items yet. Click "Add New Item" to get started.</p>';
        return;
    }
    
    galleryList.innerHTML = items.map(item => `
        <div class="gallery-item-card" data-key="${item.key}">
            <img src="${item.src}" alt="${item.title}" class="item-preview" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22><rect fill=%22%231f1f1f%22 width=%22400%22 height=%22200%22/><text fill=%22%23b3b3b3%22 x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22>Preview not available</text></svg>'">
            <div class="item-info">
                <span class="item-type-badge">${item.type}</span>
                <h3>${item.title}</h3>
                <p>${item.description || 'No description'}</p>
                <div class="item-actions">
                    <button class="btn btn-secondary btn-small btn-edit" data-key="${item.key}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-small btn-delete" data-key="${item.key}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Bind edit/delete buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => editGalleryItem(btn.dataset.key));
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => deleteGalleryItem(btn.dataset.key));
    });
}

// Add/Edit Gallery Modal
addGalleryBtn.addEventListener('click', () => {
    openGalleryModal();
});

modalClose.addEventListener('click', closeGalleryModal);
modalCancel.addEventListener('click', closeGalleryModal);

galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeGalleryModal();
    }
});

mediaTypeSelect.addEventListener('change', () => {
    const isVideo = mediaTypeSelect.value === 'video';
    posterGroup.style.display = isVideo ? 'flex' : 'none';
    posterUploadGroup.style.display = isVideo ? 'flex' : 'none';
});

// File upload handling
const mediaFileInput = document.getElementById('media-file');
const uploadProgress = document.getElementById('upload-progress');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
let uploadedFileURL = null;

if (mediaFileInput) {
    mediaFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file size (50MB max)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            showToast('File too large. Maximum size is 50MB', 'error');
            mediaFileInput.value = '';
            return;
        }
        
        // Show progress bar
        uploadProgress.style.display = 'block';
        progressFill.style.width = '0%';
        progressText.textContent = 'Uploading... 0%';
        
        try {
            // Upload file to Cloudinary
            const folder = file.type.startsWith('video/') ? 'videos' : 'gallery';
            uploadedFileURL = await uploadToCloudinary(file, folder, (progress) => {
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `Uploading... ${progress}%`;
            });
            
            // Update progress to 100%
            progressFill.style.width = '100%';
            progressText.textContent = 'Upload complete!';
            
            // Auto-fill the URL field
            document.getElementById('media-src').value = uploadedFileURL;
            
            showToast('File uploaded successfully!', 'success');
            
            // Hide progress after 2 seconds
            setTimeout(() => {
                uploadProgress.style.display = 'none';
            }, 2000);
        } catch (error) {
            console.error('Upload error:', error);
            showToast('Failed to upload file: ' + error.message, 'error');
            uploadProgress.style.display = 'none';
        }
    });
}

// Poster file upload handling
const posterFileInput = document.getElementById('poster-file');
const posterUploadProgress = document.getElementById('poster-upload-progress');
const posterProgressFill = document.getElementById('poster-progress-fill');
const posterProgressText = document.getElementById('poster-progress-text');
let uploadedPosterURL = null;

if (posterFileInput) {
    posterFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file
        const validation = validateFile(file, { maxSize: 10 * 1024 * 1024 }); // 10MB max for posters
        if (!validation.valid) {
            showToast(validation.error, 'error');
            posterFileInput.value = '';
            return;
        }
        
        const fileType = getFileType(file);
        if (fileType !== 'image') {
            showToast('Poster must be an image file', 'error');
            posterFileInput.value = '';
            return;
        }
        
        // Show progress bar
        posterUploadProgress.style.display = 'block';
        posterProgressFill.style.width = '0%';
        posterProgressText.textContent = 'Uploading poster... 0%';
        
        try {
            // Upload poster to Cloudinary
            uploadedPosterURL = await uploadToCloudinary(file, 'posters', (progress) => {
                posterProgressFill.style.width = `${progress}%`;
                posterProgressText.textContent = `Uploading poster... ${progress}%`;
            });
            
            // Update progress to 100%
            posterProgressFill.style.width = '100%';
            posterProgressText.textContent = 'Poster upload complete!';
            
            // Auto-fill the poster URL field
            document.getElementById('media-poster').value = uploadedPosterURL;
            
            showToast('Poster uploaded successfully!', 'success');
            
            // Hide progress after 2 seconds
            setTimeout(() => {
                posterUploadProgress.style.display = 'none';
            }, 2000);
        } catch (error) {
            console.error('Poster upload error:', error);
            showToast('Failed to upload poster: ' + error.message, 'error');
            posterUploadProgress.style.display = 'none';
        }
    });
}

function openGalleryModal(item = null) {
    galleryForm.reset();
    document.getElementById('gallery-item-key').value = '';
    uploadedFileURL = null;
    uploadedPosterURL = null;
    
    // Clear file input
    if (mediaFileInput) {
        mediaFileInput.value = '';
    }
    
    if (posterFileInput) {
        posterFileInput.value = '';
    }
    
    // Hide upload progress
    if (uploadProgress) {
        uploadProgress.style.display = 'none';
    }
    
    if (posterUploadProgress) {
        posterUploadProgress.style.display = 'none';
    }
    
    if (item) {
        modalTitle.textContent = 'Edit Gallery Item';
        document.getElementById('gallery-item-key').value = item.key;
        document.getElementById('media-type').value = item.type;
        document.getElementById('media-src').value = item.src;
        document.getElementById('media-title').value = item.title;
        document.getElementById('media-description').value = item.description || '';
        
        if (item.type === 'video') {
            posterGroup.style.display = 'flex';
            posterUploadGroup.style.display = 'flex';
            document.getElementById('media-poster').value = item.poster || '';
        } else {
            posterGroup.style.display = 'none';
            posterUploadGroup.style.display = 'none';
        }
    } else {
        modalTitle.textContent = 'Add Gallery Item';
        posterGroup.style.display = 'none';
        posterUploadGroup.style.display = 'none';
    }
    
    galleryModal.classList.add('active');
}

function closeGalleryModal() {
    galleryModal.classList.remove('active');
    galleryForm.reset();
    uploadedFileURL = null;
    uploadedPosterURL = null;
    
    // Clear file input
    if (mediaFileInput) {
        mediaFileInput.value = '';
    }
    
    if (posterFileInput) {
        posterFileInput.value = '';
    }
    
    // Hide upload progress
    if (uploadProgress) {
        uploadProgress.style.display = 'none';
    }
    
    if (posterUploadProgress) {
        posterUploadProgress.style.display = 'none';
    }
}

galleryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const key = document.getElementById('gallery-item-key').value;
    const type = document.getElementById('media-type').value;
    const src = document.getElementById('media-src').value;
    const title = document.getElementById('media-title').value;
    const description = document.getElementById('media-description').value;
    const poster = document.getElementById('media-poster').value;
    
    // Validate that either URL or file upload is provided
    if (!src && !uploadedFileURL) {
        showToast('Please provide a media URL or upload a file', 'error');
        return;
    }
    
    // Use uploaded file URL if available, otherwise use manual URL
    const finalSrc = uploadedFileURL || src;
    
    // Use uploaded poster URL if available, otherwise use manual poster URL
    const finalPoster = uploadedPosterURL || poster;
    
    const itemData = {
        type,
        src: finalSrc,
        title,
        description
    };
    
    if (type === 'video' && finalPoster) {
        itemData.poster = finalPoster;
    }
    
    try {
        if (key) {
            // Update existing item
            await GalleryCRUD.updateItem(database, key, itemData);
            showToast('Gallery item updated successfully!', 'success');
        } else {
            // Add new item
            await GalleryCRUD.addItem(database, itemData);
            showToast('Gallery item added successfully!', 'success');
        }
        
        // Reset uploaded file URLs
        uploadedFileURL = null;
        uploadedPosterURL = null;
        
        closeGalleryModal();
        await loadGalleryItems();
    } catch (error) {
        console.error('Error saving gallery item:', error);
        showToast('Failed to save gallery item', 'error');
    }
});

async function editGalleryItem(key) {
    try {
        const items = await GalleryCRUD.getAllItems(database);
        const item = items.find(i => i.key === key);
        
        if (item) {
            openGalleryModal(item);
        }
    } catch (error) {
        console.error('Error loading item for edit:', error);
        showToast('Failed to load item', 'error');
    }
}

async function deleteGalleryItem(key) {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
        return;
    }
    
    try {
        await GalleryCRUD.deleteItem(database, key);
        showToast('Gallery item deleted successfully!', 'success');
        await loadGalleryItems();
    } catch (error) {
        console.error('Error deleting item:', error);
        showToast('Failed to delete item', 'error');
    }
}

// Social Links Management
async function loadSocialLinks() {
    try {
        const links = await SocialLinksCRUD.getAllLinks(database);
        
        if (Object.keys(links).length > 0) {
            document.getElementById('facebook-url').value = links.facebook?.url || '';
            document.getElementById('instagram-url').value = links.instagram?.url || '';
            document.getElementById('whatsapp-url').value = links.whatsapp?.url || '';
            document.getElementById('telegram-url').value = links.telegram?.url || '';
            document.getElementById('contact-tel').value = links.contact?.url || '';
            document.getElementById('gmail-mailto').value = links.gmail?.url || '';
        }
    } catch (error) {
        console.error('Error loading social links:', error);
    }
}

document.getElementById('social-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const links = {
        facebook: document.getElementById('facebook-url').value,
        instagram: document.getElementById('instagram-url').value,
        whatsapp: document.getElementById('whatsapp-url').value,
        telegram: document.getElementById('telegram-url').value,
        contact: document.getElementById('contact-tel').value,
        gmail: document.getElementById('gmail-mailto').value
    };
    
    try {
        const promises = Object.entries(links)
            .filter(([_, url]) => url)
            .map(([platform, url]) => SocialLinksCRUD.updateLink(database, platform, url));
        
        await Promise.all(promises);
        showToast('Social links updated successfully!', 'success');
    } catch (error) {
        console.error('Error saving social links:', error);
        showToast('Failed to save social links', 'error');
    }
});

// Contact Information Management
async function loadContactInfo() {
    try {
        const contact = await ContactCRUD.getContact(database);
        
        if (Object.keys(contact).length > 0) {
            document.getElementById('contact-phone').value = contact.phone || '';
            document.getElementById('contact-email').value = contact.email || '';
            document.getElementById('contact-director').value = contact.director || '';
        }
    } catch (error) {
        console.error('Error loading contact info:', error);
    }
}

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const contactData = {
        phone: document.getElementById('contact-phone').value,
        email: document.getElementById('contact-email').value,
        director: document.getElementById('contact-director').value
    };
    
    try {
        await ContactCRUD.updateContact(database, contactData);
        showToast('Contact information updated successfully!', 'success');
    } catch (error) {
        console.error('Error saving contact info:', error);
        showToast('Failed to save contact information', 'error');
    }
});

// Initialize on load
init();
