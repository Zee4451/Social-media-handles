# AI MEMORY FILE - S. Factor Dance Crew Project
# Last Updated: 2026-04-15 (Professional Structure Reorganization - assets/, docs/ folders)
# PURPOSE: This file contains ALL project knowledge. Read this file at session start to understand the complete project context.
# INSTRUCTION: Update this file whenever changes are made to the project.

================================================================================
## TABLE OF CONTENTS
================================================================================
1. Project Overview
2. Project Structure (UPDATED - Professional Organization 2026-04-15)
3. Technical Stack & Dependencies
4. Firebase Integration
5. Netlify Deployment Configuration
6. File Details & Responsibilities (UPDATED - New Module Paths)
7. Configuration Constants
8. Social Media Links
9. SRI Hashes (CRITICAL - Do Not Change Without Validation)
10. Color Scheme & Design Tokens
11. Performance Optimizations
12. Security Implementations
13. Accessibility Features
14. SEO Implementation
15. Keyboard Controls
16. Photo Gallery & Carousel
17. Page Loader Animation
18. Known Issues & Solutions
19. Development Guidelines
20. Deployment Instructions
21. Code Patterns & Best Practices
22. Memory of Past Issues & Fixes
23. Customization Guide
24. Testing Checklist
25. Module Architecture (NEW - 2026-04-15)

================================================================================
## 1. PROJECT OVERVIEW
================================================================================

Project Name: S. Factor Dance Crew - Social Media Handles
Type: Static single-page website (link tree style)
Purpose: Social media presence and contact hub for S. Factor Dance Crew
Target Audience: Mobile-first, but responsive for all devices

Business Info:
- Name: S. Factor Dance Crew
- Tagline: "Your one stop performing art solution"
- Directors: MAK-E
- Founder (In Memoriam): Sunny Thakur
- Contact: sfactorperformingart@gmail.com, +91-9340073167

Key Features:
- Three.js particle background with dance-themed animations
- Interactive 3D tilt and parallax effects
- Keyboard-controlled dance moves (S, B, P, W keys)
- Audio visualization and beat synchronization
- Social media link buttons with ripple effects
- Contact information display
- Memorial section for founder

================================================================================
## 2. PROJECT STRUCTURE
================================================================================

Social-media-handles/
├── 📄 index.html (15.7KB)             # Main HTML file with SEO & JSON-LD (Netlify root)
├── 📄 admin.html (13.6KB)             # Admin panel for content management (Netlify root)
├── 📄 netlify.toml (2.1KB)            # Netlify configuration file
├── 📄 _redirects (0.1KB)              # Netlify redirect rules
├── 📄 README.md (8.4KB)               # User-facing documentation
├── 📄 .gitignore (0.7KB)              # Git ignore rules
├── 📁 assets/                         # Organized asset files
│   ├── 📁 css/
│   │   ├── style.css (19.5KB)         # Complete styling with animations
│   │   └── admin-style.css (11.2KB)   # Admin panel styling
│   ├── 📁 js/
│   │   ├── script.js (4.8KB, 144 lines)    # Main entry point - module coordinator
│   │   ├── loader.js (4.2KB, 126 lines)    # Frame-by-frame SVG loader animation
│   │   ├── firebase-loader.js (6.4KB, 194 lines) # Firebase content synchronization
│   │   ├── particles.js (12.1KB, 369 lines) # Three.js particle system & animations
│   │   ├── audio-system.js (8.3KB, 253 lines) # Audio visualization & beat sync
│   │   ├── gallery.js (10.6KB, 324 lines)  # Carousel & lightbox preview
│   │   ├── ui-effects.js (10.2KB, 301 lines) # UI animations & keyboard dance moves
│   │   ├── config.js (4.0KB)               # Configuration constants & social links
│   │   ├── utils.js (7.4KB)                # Utility functions & cleanup helpers
│   │   ├── firebase-config.js (10.2KB)     # Firebase configuration & CRUD operations
│   │   ├── admin.js (14.8KB)               # Admin panel JavaScript
│   │   └── cloudinary-config.js (6.8KB)    # Cloudinary media upload configuration
│   ├── 📁 images/
│   │   └── sfactor.png (96.2KB)       # Dance crew logo/image
│   ├── 📁 audio/
│   │   └── makee.mp3 (3609.0KB)       # Audio file for beat synchronization
│   ├── 📁 gallery/                    # Performance photo gallery (placeholder)
│   └── 📁 videos/                     # Performance video gallery
│       └── README.md                  # Video placeholder documentation
├── 📁 loader/ (81 SVG files)          # Frame-by-frame loader animation frames
├── 📁 login/
│   └── index.html                     # Admin login redirect
└── 📁 docs/                           # Project documentation
    ├── PROJECT_MEMORY.md              # THIS FILE - Complete project knowledge
    ├── FIREBASE_SETUP.md (8.5KB)      # Firebase setup guide
    └── NETLIFY_DEPLOY.md (9.2KB)      # Netlify deployment guide

Total Size: ~185KB (excluding media files, including new modules)
Media Files: ~3.7MB (sfactor.png + makee.mp3)

**Structure Reorganization Benefits (2026-04-15):**
- Professional separation of concerns (assets/, docs/, code)
- Clean root directory for Netlify deployment
- Organized asset types (css/, js/, images/, audio/, gallery/, videos/)
- Centralized documentation in docs/ folder
- Removed unused files (generate-placeholders.html, cors.json)
- Restored cloudinary-config.js (required for admin panel media uploads)
- All functionality preserved with updated paths

================================================================================
## 3. TECHNICAL STACK & DEPENDENCIES
================================================================================

Core Technologies:
- HTML5 (semantic markup)
- CSS3 (custom properties, animations, grid, flexbox)
- JavaScript ES6+ (modules, arrow functions, template literals)

External Libraries (CDN):
1. Three.js r128 - 3D particle system
   URL: https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
   Purpose: Background particle animations
   
2. GSAP 3.9.1 - Animation library
   URL: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js
   Purpose: Smooth animations for cursor and dance moves
   
3. Font Awesome 6.5.1 - Icon library
   URL: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css
   Purpose: Social media and UI icons
   
4. Google Fonts - Poppins
   URL: https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800
   Purpose: Typography

Browser Requirements:
- Chrome 80+ (recommended)
- Firefox 75+
- Safari 13+
- Edge 80+
- WebGL support required for particles (graceful degradation without it)

Server Requirements:
- MUST be served via HTTP server (NOT file:// protocol)
- Reason: ES6 modules, WebGL restrictions, CORS for SRI
- Compatible servers: Python http.server, npx serve, PHP built-in, Apache, Nginx

================================================================================
## 4. FIREBASE INTEGRATION (ADDED: 2025-04-15)
================================================================================

### Overview:
Firebase Realtime Database added for CRUD (Create, Read, Update, Delete) operations.
Completely FREE tier - sufficient for project needs.
Admin panel for managing gallery, social links, and contact information.

### Firebase Services Used:
1. **Realtime Database** - Store gallery items, social links, contact info
2. **Authentication** - Email/password admin login
3. **Storage** - File uploads for images and videos (NEW - 2025-04-15)
4. **Hosting** - Not used (on GitHub Pages)

### Firebase Configuration:
Location: firebase-config.js

```javascript
export const firebaseConfig = {
    apiKey: "AIzaSyBONodpaChaV7StStdfPXqXHvkgUQMIhXY",
    authDomain: "carvoyage-2led3.firebaseapp.com",
    databaseURL: "https://carvoyage-2led3-default-rtdb.firebaseio.com",
    projectId: "carvoyage-2led3",
    storageBucket: "carvoyage-2led3.firebasestorage.app",
    messagingSenderId: "790960970254",
    appId: "1:790960970254:web:b9f92f60ae4e744b40ba5f"
};

export const isFirebaseConfigured = true;
```

⚠️ IMPORTANT: This file MUST be uploaded to GitHub for the live site to work. Firebase configs are designed to be public - security comes from database rules and authentication.

### Database Structure:
```
firebase-database/
├── gallery/
│   ├── -Nxyz123abc/
│   │   ├── type: "image" | "video"
│   │   ├── src: "./gallery/photo.jpg"
│   │   ├── title: "Stage Performance"
│   │   ├── description: "Live Show 2024"
│   │   ├── poster: "./videos/poster.jpg" (videos only)
│   │   ├── createdAt: timestamp
│   │   └── updatedAt: timestamp
├── socialLinks/
│   ├── facebook/
│   │   ├── url: "https://facebook.com/..."
│   │   └── updatedAt: timestamp
│   ├── instagram/ {...}
│   ├── whatsapp/ {...}
│   ├── telegram/ {...}
│   ├── contact/ {...}
│   └── gmail/ {...}
└── contact/
    ├── phone: "9340073167"
    ├── email: "sfactorperformingart@gmail.com"
    ├── director: "MAK-E"
    └── updatedAt: timestamp
```

### Security Rules:
```json
{
  "rules": {
    "gallery": {
      ".read": true,
      ".write": "auth != null"
    },
    "socialLinks": {
      ".read": true,
      ".write": "auth != null"
    },
    "contact": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

Rules Explanation:
- Anyone can READ data (public website)
- Only authenticated admins can WRITE data (admin panel)

### Admin Panel:
URL: yourdomain.com/admin.html
Access: Email/password authentication required

Features:
1. **Gallery Management**
   - Add/Edit/Delete gallery items
   - Support for images and videos
   - Preview thumbnails
   - Modal form for adding/editing
   - **Direct file upload from device** (NEW)
   - Upload progress bar
   - 50MB file size limit
   - Auto-fill URL after upload

2. **Social Links Management**
   - Update all social media URLs
   - Real-time sync with main site
   - Form validation

3. **Contact Information**
   - Update phone, email, director name
   - Instant updates across site

### CRUD Operations:

**GalleryCRUD Object (firebase-config.js):**
- `addItem(database, item)` - Add new gallery item
- `getAllItems(database)` - Get all gallery items
- `updateItem(database, key, updates)` - Update existing item
- `deleteItem(database, key)` - Delete item

**SocialLinksCRUD Object:**
- `updateLink(database, platform, url)` - Update social link
- `getAllLinks(database)` - Get all social links

**ContactCRUD Object:**
- `updateContact(database, contactData)` - Update contact info
- `getContact(database)` - Get contact information

### Free Tier Limits:
- Realtime Database:
  - 1 GB storage
  - 10 GB/month download
  - 100 simultaneous connections
  - Unlimited operations
- Firebase Storage:
  - 5 GB storage
  - 1 GB/day download
  - 50,000 operations/day

**Expected Usage:** < 1% of free tier (very lightweight)

### Setup Instructions:
See FIREBASE_SETUP.md for complete step-by-step guide.

Quick Steps:
1. Create Firebase project at console.firebase.google.com
2. Enable Realtime Database (test mode)
3. Enable Authentication (Email/Password)
4. Create admin user
5. Copy config to firebase-config.js
6. Set database security rules
7. Test admin panel login

### Files Added:
- `firebase-config.js` - Firebase initialization & CRUD operations & file upload
- `admin.html` - Admin panel UI with file upload support
- `admin.js` - Admin panel logic & authentication & file handling
- `admin-style.css` - Admin panel styling with upload progress UI
- `FIREBASE_SETUP.md` - Complete setup guide
- `login/index.html` - Clean URL redirect for /login access

### Integration with Main Site:
To load dynamic content from Firebase, import firebase-config.js in script.js:

```javascript
import { initializeFirebase, GalleryCRUD } from './firebase-config.js';

// Load gallery items from Firebase
const firebase = await initializeFirebase();
const items = await GalleryCRUD.getAllItems(firebase.database);
```

### File Upload Feature (NEW - 2025-04-15):
Admin panel now supports direct file uploads from any device (mobile/laptop).

**How It Works:**
1. User clicks "Choose File" in admin panel
2. File uploads to Firebase Storage
3. Progress bar shows upload status
4. Download URL auto-fills in form
5. User saves item - content appears live on website

**Upload Function (firebase-config.js):**
```javascript
export async function uploadFile(file, folder = 'gallery') {
    const { ref, uploadBytes, getDownloadURL } = await import(
        'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js'
    );
    const { getStorage } = await import(
        'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js'
    );
    
    const storage = getStorage();
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const filename = `${folder}/${timestamp}_${randomId}.${extension}`;
    
    const storageRef = ref(storage, filename);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
}
```

**File Limits:**
- Maximum file size: 50MB
- Supported formats: JPG, PNG, GIF, WebP, MP4, WebM, MOV
- Storage folders: `gallery/` for images, `videos/` for videos

**Admin Panel Upload UI:**
- File input with accept="image/*,video/*"
- Progress bar with percentage display
- Auto-fill URL field after upload
- Toast notifications for success/error
- File size validation (50MB max)

================================================================================
## 5. NETLIFY DEPLOYMENT CONFIGURATION (ADDED: 2025-04-15)
================================================================================

### Overview:
Project is now fully optimized for Netlify deployment with automatic builds,
custom domains, SSL, CDN, and advanced features.

### Netlify Configuration Files:

**1. netlify.toml** (Root directory)
- Build configuration (no build needed for static site)
- Publish directory: `.` (root)
- Redirect rules (/login → /admin.html)
- Security headers (XSS, clickjacking protection)
- Cache headers (1 year for static assets)
- CORS headers for Firebase/CDN

**2. _redirects** (Root directory)
- Clean URL redirect: `/login` → `/admin.html`
- 200 status code (SPA rewrite)

### Netlify Features Enabled:

1. **Automatic HTTPS**
   - Free SSL certificate
   - Automatic renewal
   - Forced HTTPS redirect

2. **Global CDN**
   - Assets served from edge locations worldwide
   - Automatic optimization
   - Fast load times globally

3. **Continuous Deployment**
   - Git integration (GitHub, GitLab, Bitbucket)
   - Auto-deploy on push to main branch
   - Preview deployments for PRs
   - Instant rollbacks

4. **Custom Domains**
   - Free custom domain support
   - Automatic DNS configuration
   - Multiple domains per site

5. **Performance Optimization**
   - Asset caching (1 year for CSS, JS, images)
   - Brotli compression (automatic)
   - HTTP/2 support
   - Asset optimization

6. **Security Headers**
   ```
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   Referrer-Policy: strict-origin-when-cross-origin
   Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```

### Deployment Methods:

**Method 1: Drag & Drop (Easiest)**
1. Go to app.netlify.com/drop
2. Drag project folder
3. Site is live in 30-60 seconds

**Method 2: Git Integration (Recommended)**
1. Push code to GitHub
2. Connect repo in Netlify dashboard
3. Auto-deploys on every push
4. Preview deployments for PRs

**Method 3: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Cache Configuration:

Static assets cached for 31,536,000 seconds (1 year):
- *.css
- *.js
- *.png, *.jpg, *.jpeg, *.gif, *.webp
- *.mp4, *.webm
- *.mp3

HTML files NOT cached (always fresh)

### Expected Usage (Free Tier):

- Bandwidth: ~1-2GB/month (Limit: 100GB)
- Build minutes: 0 (no build process)
- Sites: 1 (Limit: Unlimited)
- Cost: $0/month

### Admin Panel Access:

After deployment:
- Main site: yourdomain.netlify.app
- Admin panel: yourdomain.netlify.app/login
- Admin panel: yourdomain.netlify.app/admin.html

Both /login and /admin.html work (redirect configured)

### Files Added:
- `netlify.toml` - Netlify configuration
- `NETLIFY_DEPLOY.md` - Complete deployment guide

### Integration with Firebase:

Firebase works seamlessly with Netlify:
- Firebase config in firebase-config.js (public)
- Firebase SDK loaded from CDN
- Database operations work client-side
- No server-side code needed

### Troubleshooting:

**Issue:** /login shows 404
**Solution:** Verify _redirects file or netlify.toml redirects

**Issue:** Firebase not connecting
**Solution:** Check firebase-config.js and browser console

**Issue:** Assets not caching
**Solution:** Check netlify.toml headers section

### Deployment Checklist:

- [ ] Test site on Netlify URL
- [ ] Verify /login redirect works
- [ ] Test Firebase authentication
- [ ] Test admin panel CRUD operations
- [ ] Test file upload feature
- [ ] Verify all social links work
- [ ] Check mobile responsiveness
- [ ] Test gallery carousel
- [ ] Verify video playback
- [ ] Check browser console for errors
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (automatic)
- [ ] Add to Google Search Console

================================================================================
## 6. FILE DETAILS & RESPONSIBILITIES
================================================================================

### index.html
Purpose: Main entry point, SEO, structured data
Contains:
- Meta tags (charset, viewport, description, keywords, author, robots)
- Open Graph meta tags (Facebook/LinkedIn sharing)
- Twitter Card meta tags
- Canonical URL: https://sfactordancecrew.com (UPDATE WHEN DEPLOYING)
- JSON-LD structured data (PerformingGroup schema)
- Semantic HTML structure (header, main, footer implied)
- Social media buttons with data-link attributes
- Dance toggle button
- Script imports

Key Sections:
1. Head (lines 1-60): Meta tags, stylesheets, JSON-LD
2. Header (lines 61-75): Title, subtitle, director info
3. Image (lines 77-80): Crew photo with lazy loading
4. Contact (lines 82-91): Phone number and email
5. Social Links (lines 99-143): 6 social media buttons
6. Memorial (lines 145-149): In memoriam section
7. Dance Toggle (lines 151-154): Keyboard icon button
8. Script (line 156): Main JavaScript import

### style.css
Purpose: Complete visual styling and animations
Contains:
- CSS custom properties (design tokens)
- Responsive layout (mobile-first)
- Animations (pulse, float, glow, shine, ripple, beat)
- Hover effects (3D transforms, transitions)
- Media queries (768px, 480px breakpoints)
- Custom scrollbar styling
- Dance toggle button styles
- Touch target optimizations (44px minimum)

Key Sections:
1. Root variables (lines 1-20): Color scheme
2. Base styles (lines 22-78): Reset, body, container
3. Image container (lines 80-150): 3D effects, shine animation
4. Contact info (lines 152-276): Card styling, hover effects
5. Header (lines 277-359): Title gradient, subtitle glow
6. Social buttons (lines 360-481): Grid layout, icon wrappers
7. Footer/Memorial (lines 482-523): Special styling
8. Media queries (lines 524-585): Responsive adjustments
9. Animations (lines 586-767): Keyframe definitions
10. Dance toggle (lines 768-809): Button styles

### script.js (UPDATED - 2026-04-15 - MODULAR COORDINATOR)
Purpose: Main entry point and module coordinator (REDUCED from 1760 to 144 lines)
Contains:
- Import statements for all 6 modules
- SocialLinks object configuration
- Event handler tracking system
- Cleanup function for memory management
- DOMContentLoaded initialization coordinator
- Module initialization sequence

**New Role:** Script.js no longer contains implementation details. It now:
1. Imports all modules
2. Coordinates initialization order
3. Manages global state (SocialLinks, event handlers)
4. Provides cleanup on page unload

**Module Initialization Order:**
1. FrameLoader.init() - SVG loader animation
2. initializeFirebaseLoader() - Firebase content sync
3. initThreeJsBackground() - Particle system
4. initUIEffects() - UI animations & effects
5. GalleryCarousel.init() & Lightbox.init() - Gallery
6. Social link button event listeners
7. initAudioSystem() - Audio visualization (delayed 1.5s)

### loader.js (NEW MODULE - 2026-04-15)
Purpose: Frame-by-frame SVG loader animation
Contains:
- FrameLoader object with 81 SVG frames
- 20 FPS animation (50ms per frame)
- Automatic cycle completion logic
- 8-second fallback timeout
- Smooth 0.5s fade-out transition
- Responsive sizing (280px/220px/180px)

**Export:** FrameLoader object
**Import:** None needed

### firebase-loader.js (NEW MODULE - 2026-04-15)
Purpose: Firebase Realtime Database content synchronization
Contains:
- updateGalleryFromFirebase() - Dynamic gallery updates
- updateSocialLinksFromFirebase() - Social link updates
- updateContactFromFirebase() - Contact info updates
- loadDynamicContent() - Main Firebase loader
- initializeFirebaseLoader() - Firebase initialization

**Export:** All five functions
**Import:** firebase-config.js (GalleryCRUD, SocialLinksCRUD, ContactCRUD)

### particles.js (NEW MODULE - 2026-04-15)
Purpose: Three.js particle system and 3D animations
Contains:
- CONFIG object (all timing & particle settings)
- initThreeJsBackground() - WebGL detection & scene setup
- createDanceParticles() - 500 background particles
- createCursorParticles() - Mouse trail particles
- updateCursorParticleSystem() - Particle geometry updates
- animate() - Main animation loop
- cleanupParticles() - Resource cleanup

**Export:** CONFIG, initThreeJsBackground, cleanupParticles, particle variables
**Import:** None needed
**Global Variables:** window.particles, window.camera, window.scene (for other modules)

### audio-system.js (NEW MODULE - 2026-04-15)
Purpose: Audio visualization, beat synchronization, and device motion
Contains:
- simulateAudioVisualization() - Animated audio bars
- addBeatSynchronization() - Real audio analysis
- addDeviceMotionSupport() - Mobile tilt controls
- optimizePerformance() - Low-end device optimization
- initAudioSystem() - Main audio initializer

**Export:** initAudioSystem
**Import:** CONFIG from particles.js

### gallery.js (NEW MODULE - 2026-04-15)
Purpose: Photo/video carousel and fullscreen lightbox
Contains:
- GalleryCarousel object - Auto-sliding carousel
- Lightbox object - Fullscreen media preview
- Touch/swipe gesture support
- Video play/pause controls
- Carousel auto-play management
- Keyboard navigation (Escape, Arrow keys)

**Export:** GalleryCarousel, Lightbox
**Import:** None needed

### ui-effects.js (NEW MODULE - 2026-04-15)
Purpose: UI animations, 3D effects, and keyboard dance moves
Contains:
- loadGSAP() - Dynamic GSAP library loading
- addKeyboardDanceMoves() - S, B, P, W key controls
- initUIEffects() - All UI effect initialization
- Page load animations (staggered fade-in)
- 3D tilt effects on cards
- Parallax mouse tracking on image
- Scroll reveal animations
- Ripple effects on buttons
- Icon hover color transitions

**Export:** initUIEffects, addKeyboardDanceMoves
**Import:** None needed (loads GSAP dynamically)

### config.js
Purpose: Centralized configuration
Contains:
- CONFIG constants (all timing and particle settings)
- SocialLinks object (all social media URLs)
- JSDoc documentation for all exports

### utils.js
Purpose: Shared utility functions
Contains:
- eventHandlers registry (tracks all listeners)
- threeResources registry (tracks WebGL objects)
- addTrackedEventListener(): Safe listener addition
- cleanup(): Comprehensive resource cleanup
- isLowEndDevice(): Performance detection
- isWebGLSupported(): Feature detection
- loadScript(): Dynamic script loading with SRI

### firebase-config.js (UPDATED - 2025-04-15)
Purpose: Firebase initialization, CRUD operations, and file upload
Contains:
- Firebase configuration object
- initializeFirebase(): Initialize Firebase app
- uploadFile(): Upload files to Firebase Storage (NEW)
  - File validation (50MB max)
  - Automatic folder selection (gallery/videos)
  - Progress tracking
  - Download URL generation
- GalleryCRUD: Gallery item CRUD operations
  - addItem(), getAllItems(), updateItem(), deleteItem()
- SocialLinksCRUD: Social links CRUD operations
  - updateLink(), getAllLinks()
- ContactCRUD: Contact info CRUD operations
  - updateContact(), getContact()
- Dynamic ES6 module imports for Firebase SDK

### admin.html (UPDATED - 2025-04-15)
Purpose: Admin panel for content management
Contains:
- Login screen with email/password authentication
- Dashboard with sidebar navigation
- Gallery management section (add/edit/delete items)
- **File upload interface** (NEW)
  - File input for images/videos
  - Upload progress bar
  - Progress percentage display
- Social links management form
- Contact information form
- Settings and database status display
- Modal for adding/editing gallery items
- Toast notifications

### admin.js (UPDATED - 2025-04-15)
Purpose: Admin panel JavaScript logic
Contains:
- Firebase authentication handling
- CRUD operations for all content types
- **File upload handling** (NEW)
  - File size validation (50MB)
  - Upload progress tracking
  - Auto-fill URL after upload
  - Error handling
- UI event handlers
- Form validation
- Toast notification system
- Navigation between sections
- Gallery item rendering

### admin-style.css (UPDATED - 2025-04-15)
Purpose: Admin panel styling
Contains:
- Login screen styles
- Dashboard layout (sidebar + main content)
- Form styles and validation
- Modal styles
- Gallery grid layout
- **File upload styles** (NEW)
  - File input with dashed border
  - Progress bar styling
  - Upload button hover effects
- Responsive design (mobile-friendly)
- Toast notification animations
- Color scheme matching main site

================================================================================
## 5. CONFIGURATION CONSTANTS
================================================================================

Located in: script.js and config.js

```javascript
const CONFIG = {
    // Timing (milliseconds)
    AUDIO_VISUALIZATION_DELAY: 1500,      // Before audio viz starts
    GSAP_LOAD_DELAY: 2000,                // Before loading GSAP
    DEVICE_MOTION_DELAY: 2000,            // Before motion tracking
    BEAT_SYNC_DELAY: 2000,                // Before beat sync
    PERFORMANCE_CHECK_DELAY: 3000,        // Before perf optimization
    
    // Particle Settings
    MAX_CURSOR_PARTICLES: 300,            // Max trail particles
    DEFAULT_PARTICLE_COUNT: 500,          // Background particles (reduced from 1000)
    LOW_END_PARTICLE_COUNT: 300,          // Particles for low-end devices
    PARTICLE_SPAWN_RATE: 0.7              // 70% spawn probability
};
```

IMPORTANT: Never use magic numbers. Always reference CONFIG constants.

================================================================================
## 6. SOCIAL MEDIA LINKS
================================================================================

Located in: script.js and config.js (SocialLinks object)

```javascript
const SocialLinks = {
    facebook: 'https://www.facebook.com/rex.khan3',
    instagram: 'https://www.instagram.com/s.factordancecrew/',
    whatsapp: 'https://wa.link/ntso2j',
    telegram: 'https://t.me/SfactorDanceCrew',
    contact: 'tel:9340073167',
    gmail: 'mailto:sfactorperformingart@gmail.com'
};
```

Usage: `SocialLinks.open('instagram')` opens in new secure tab.

To Add New Platform:
1. Add URL to SocialLinks object
2. Add button in index.html with `data-link="platformname"`
3. Test with `SocialLinks.open('platformname')`

================================================================================
## 7. SRI HASHES (CRITICAL - DO NOT CHANGE WITHOUT VALIDATION)
================================================================================

⚠️ WARNING: These hashes MUST be exact. Wrong hashes will block resources!

Validated SHA-512 Hashes:

1. Three.js r128:
   Hash: sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YjDUCjT0HDOHKXnVYdf3hU4JjM8uEhxf9nD1/ey98U3t2vZ0qQ==
   File: script.js (line ~362)
   
2. GSAP 3.9.1:
   Hash: sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ==
   File: script.js (line ~966)
   
3. Font Awesome 6.5.1:
   Hash: sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==
   File: index.html (line ~17)

HOW TO GET SRI HASHES:
Method 1 (Recommended):
1. Visit https://cdnjs.com/
2. Search for library
3. Click "Copy SRI hash" button

Method 2 (From Browser):
1. Use placeholder hash temporarily
2. Load page in browser
3. Check console for error with computed hash
4. Copy the EXACT hash from error message
5. Replace placeholder with correct hash

NEVER:
- Guess or make up SRI hashes
- Use hashes from different versions
- Forget crossorigin="anonymous" attribute

================================================================================
## 8. COLOR SCHEME & DESIGN TOKENS (UPDATED: 2026-04-15 - LIGHT THEME)
================================================================================

Located in: style.css (lines 2-27)

### Professional Light Theme Color Palette (Current):

```css
:root {
    /* Primary Brand - Deep Crimson Red */
    --primary: #B8172B;           /* Deep professional crimson */
    --primary-dark: #8C0F20;      /* Darker crimson for depth */
    --primary-tint: rgba(184, 23, 43, 0.08);  /* Subtle tint for backgrounds */
    
    /* Backgrounds - Clean Light Theme */
    --bg-main: #FAFAF7;           /* Warm off-white main background */
    --bg-card: #FFFFFF;           /* Pure white for cards */
    --bg-alt: #F5F3EE;            /* Light warm gray for alternates */
    --bg-dark: #1A1815;           /* Dark for special elements */
    
    /* Text - Warm Dark Tones */
    --text-primary: #1A1815;      /* Primary text - warm dark */
    --text-body: #4A4540;         /* Body text - softer dark */
    --text-secondary: #7A7570;    /* Secondary text - warm gray */
    --text-muted: #9A9285;        /* Muted text - light gray */
    
    /* Effects - Subtle & Clean */
    --border: rgba(0, 0, 0, 0.06);
    --border-hover: rgba(0, 0, 0, 0.12);
    --shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    
    /* Gradients - Elegant & Minimal */
    --gradient: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    --gradient-subtle: linear-gradient(135deg, var(--primary-tint) 0%, rgba(184, 23, 43, 0.04) 100%);
}
```

### Previous Dark Theme (Before 2026-04-15):
- Dark backgrounds (#0a0a0f, #16161e)
- Bright crimson (#e63946) with teal (#2a9d8f) and gold (#e9c46a)
- Replaced with clean light theme for better readability and professional appearance

### Design Philosophy:
- **Clean Light Theme**: Warm, inviting backgrounds with excellent readability
- **Single Primary Accent**: Deep crimson red (#B8172B) for brand identity
- **Professional Hierarchy**: Clear visual importance through warm dark tones
- **Modern Elegance**: Inspired by premium editorial and corporate design
- **Accessibility**: Excellent contrast ratios exceeding WCAG AA standards
- **Minimalist Approach**: Removed competing colors, focused on single accent

### Color Usage Guidelines:

**Primary Color (#B8172B - Deep Crimson):**
- Use for: Main CTAs, active states, important highlights, brand identity
- Avoid: Large background areas, body text

**Background Colors:**
- `--bg-main` (#FAFAF7): Main page background - warm off-white
- `--bg-card` (#FFFFFF): Card/container backgrounds - pure white
- `--bg-alt` (#F5F3EE): Layered elements, alternate sections - warm gray

**Text Colors:**
- `--text-primary` (#1A1815): Main headings, important text - warm dark
- `--text-body` (#4A4540): Body text, descriptions - softer dark
- `--text-secondary` (#7A7570): Secondary information - warm gray
- `--text-muted` (#9A9285): Timestamps, less important details - light gray

### Visual Impact:

**Before Redesign (Dark Theme):**
- Dark backgrounds with neon-bright accents
- Multiple competing colors (crimson, teal, gold)
- Playful but less professional appearance
- Good for entertainment, less corporate-friendly

**After Redesign (Light Theme):**
- Clean, warm light backgrounds with deep crimson accent
- Single focused primary color for strong brand identity
- Professional, editorial-quality appearance
- Excellent for corporate partnerships and bookings
- Superior readability and accessibility

================================================================================
## 9. PERFORMANCE OPTIMIZATIONS
================================================================================

Implemented Optimizations:

1. Particle Count Reduction:
   - Before: 1000 particles
   - After: 500 particles (50% reduction)
   - Low-end devices: 300 particles

2. CSS Transition Optimization:
   - Removed: `* { transition: all 0.3s }` (performance killer)
   - Added: Specific property transitions only
   - Example: `transition: transform 0.4s ease, box-shadow 0.4s ease`

3. Lazy Loading:
   - Images use `loading="lazy"`
   - Three.js loaded dynamically after page load
   - GSAP loaded with 2s delay

4. Device Detection:
   - `isLowEndDevice()` checks:
     * navigator.hardwareConcurrency <= 4
     * navigator.deviceMemory <= 4
     * window.innerWidth < 600
   - Auto-reduces particles on low-end devices

5. Memory Management:
   - Event listener tracking system
   - Cleanup function on page unload
   - Three.js renderer disposal
   - Particle array cleanup

6. Animation Optimization:
   - requestAnimationFrame for smooth animations
   - Delta time calculations for consistent speed
   - Particle count limits (max 300 cursor particles)

Performance Metrics:
- Initial Load: ~200KB (without Three.js)
- First Paint: < 1s on 4G
- Particle Animation: 60fps on modern devices
- Memory Usage: ~50MB (with particles)

================================================================================
## 10. SECURITY IMPLEMENTATIONS
================================================================================

1. Subresource Integrity (SRI):
   - All CDN resources have integrity hashes
   - Prevents CDN compromise attacks
   - Hashes validated and working

2. Cross-Origin Resource Sharing (CORS):
   - All external scripts have `crossorigin="anonymous"`
   - Proper CORS headers required

3. Secure External Links:
   - All `window.open()` calls use `'noopener,noreferrer'`
   - Prevents tabnapping attacks
   - Prevents referrer leakage

4. No Inline Event Handlers:
   - Removed all `onclick="function()"` attributes
   - Uses `addEventListener()` instead
   - CSP (Content Security Policy) compliant

5. Data Attributes:
   - Social buttons use `data-link="platform"`
   - Separates HTML from JavaScript
   - Cleaner, more maintainable

Security Checklist:
- [x] SRI hashes on all CDN resources
- [x] crossorigin attributes present
- [x] noopener,noreferrer on external links
- [x] No inline event handlers
- [x] No eval() usage
- [x] HTTPS-only resources

================================================================================
## 11. ACCESSIBILITY FEATURES
================================================================================

1. Reduced Motion Support:
   - Detects `prefers-reduced-motion: reduce`
   - Respects user OS-level preferences
   - Adjusts animation intensity accordingly

2. Semantic HTML:
   - Proper heading hierarchy (h1, h2)
   - ARIA labels on all buttons
   - Alt text on images
   - Logical document structure

3. Touch Targets:
   - Minimum 44px touch target size
   - Adequate spacing between interactive elements
   - Mobile-friendly button sizes

4. Keyboard Navigation:
   - All buttons focusable
   - Visible focus indicators
   - Keyboard dance moves (S, B, P, W, ?)

5. Color Contrast:
   - High contrast text (white on dark backgrounds)
   - Sufficient contrast ratios (WCAG AA compliant)
   - Text shadows for readability

6. Screen Reader Support:
   - Descriptive aria-labels
   - Meaningful button text
   - Proper heading structure

Accessibility Testing:
- Use browser DevTools Accessibility panel
- Test with screen readers (NVDA, VoiceOver)
- Keyboard-only navigation test
- Color contrast checker

================================================================================
## 12. SEO IMPLEMENTATION
================================================================================

Meta Tags (index.html):
```html
<meta name="description" content="S. Factor Dance Crew - Your one stop performing art solution. Directed by MAK-E.">
<meta name="keywords" content="dance crew, performing arts, choreography, S Factor, dance performances, entertainment">
<meta name="author" content="S. Factor Dance Crew">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://sfactordancecrew.com">
```

Open Graph (Facebook/LinkedIn):
```html
<meta property="og:title" content="S. Factor Dance Crew">
<meta property="og:description" content="Your one stop performing art solution - Directed by MAK-E">
<meta property="og:type" content="website">
```

Twitter Cards:
```html
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="S. Factor Dance Crew">
```

JSON-LD Structured Data (lines 20-60):
```json
{
  "@context": "https://schema.org",
  "@type": "PerformingGroup",
  "name": "S. Factor Dance Crew",
  "description": "Your one stop performing art solution",
  "founder": {
    "@type": "Person",
    "name": "Sunny Thakur",
    "description": "Founder of S. Factor Dance Crew (In Memoriam)"
  },
  "employee": [
    {"@type": "Person", "name": "MAK-E", "jobTitle": "Director"}
  ],
  "sameAs": [
    "https://www.facebook.com/rex.khan3",
    "https://www.instagram.com/s.factordancecrew/",
    "https://t.me/SfactorDanceCrew"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9340073167",
    "contactType": "customer service",
    "email": "sfactorperformingart@gmail.com"
  },
  "url": "https://sfactordancecrew.com",
  "image": "https://sfactordancecrew.com/sfactor.png"
}
```

IMPORTANT: Update URLs from sfactordancecrew.com to actual domain when deploying!

SEO Testing Tools:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

================================================================================
## 13. KEYBOARD CONTROLS
================================================================================

**DEVICE COMPATIBILITY: Laptop/Desktop Only**
This feature requires a physical keyboard and is hidden on mobile devices (< 768px).

**Mobile Hiding (Updated: 2026-04-15):**
- Dance toggle button: Hidden via CSS media query (display: none)
- Dance moves guide container: Hidden via CSS media query (display: none !important)
- Both elements hidden on screens < 768px width
- Implemented in style.css @media (max-width: 768px) block

Dance Moves (when GSAP is loaded):
- S: Spin move (360° particle rotation)
- B: Bounce effect (elastic Y-axis movement)
- P: Pop effect (scale pulse animation)
- W: Wave effect (sinusoidal particle motion)
- ?: Toggle dance moves guide visibility

Dance Toggle Button:
- Location: Bottom-left corner (above music button)
- Icon: Keyboard (fa-keyboard)
- Click to show/hide dance guide
- Auto-rotates 360° when activated
- **Hidden on mobile devices** (screens < 768px) via CSS media query

Auto-Demo:
- First visit: Guide shows for 4 seconds after 3s delay
- Uses localStorage to track first visit
- Key: 'sfactor_visited'

Implementation Details:
- Guide positioned at bottom: 130px, left: 20px
- Backdrop blur effect
- Styled kbd elements with borders
- Emoji header (🎭)

================================================================================
## 14. PHOTO GALLERY & CAROUSEL
================================================================================

**ADDED:** 2025-04-15
**LOCATION:** Between hero image and contact info section

### Gallery Structure:
- Section: `.gallery-section` (index.html lines ~75-210)
- Carousel: `.gallery-carousel` with navigation arrows
- Track: `.gallery-track` containing 6 gallery items
- Indicators: 6 dot buttons for direct navigation
- Counter: Shows "1 / 6" format
- Lightbox: Fullscreen modal for image preview

### Gallery Features:
1. **Auto-sliding Carousel**
   - 4-second intervals (configurable in GalleryCarousel.autoPlayDelay)
   - Pauses on hover/touch interaction
   - **Pauses when video is playing** (auto-resumes when video pauses)
   - Resumes when user stops interacting
   - Seamless infinite loop

2. **Navigation Controls**
   - Previous/Next arrow buttons (desktop)
   - Dot indicators (click to jump to specific photo/video)
   - Touch/swipe gestures (mobile)
   - Keyboard arrows (in lightbox mode)

3. **Photo Hover Effects**
   - Image zoom (scale 1.1x)
   - Darken filter for overlay visibility
   - Slide-up overlay with title and description
   - Zoom button appears (opens lightbox)

4. **Video Features** (NEW - 2025-04-15)
   - Custom-styled video player matching site theme
   - Large play button overlay (80px, pink gradient)
   - Click video or play button to toggle play/pause
   - **Auto-pauses carousel** when video plays
   - **Auto-resumes carousel** when video pauses
   - Video badge indicator (🎬 Video) in overlay
   - Poster image shows before video loads
   - Fullscreen lightbox video player with controls
   - Only one video plays at a time (auto-pauses others)
   - Play/pause icon changes dynamically

4. **Lightbox Modal**
   - Fullscreen preview with dark background
   - Previous/Next navigation
   - Close button (X) or click outside to close
   - Escape key to close
   - Image caption with title
   - Smooth scale animation on open/close

5. **Mobile Touch Support**
   - Swipe left/right to navigate (50px threshold)
   - Auto-hide navigation arrows on screens < 480px
   - Optimized image heights (300px at 768px, 250px at 480px)
   - Touch events use passive listeners for performance

### Image Specifications:
- **Location:** `./gallery/` folder
- **Files:** performance-1.jpg through performance-6.jpg
- **Recommended Size:** 1200x800px (landscape)
- **Max File Size:** 500KB per image
- **Format:** JPEG or WebP (WebP preferred)
- **Optimization:** Use TinyPNG.com for compression

### Video Specifications (NEW):
- **Location:** `./videos/` folder
- **Files:** performance-video-1.mp4, performance-video-2.mp4
- **Poster Images:** video-1-poster.jpg, video-2-poster.jpg (1200x800px)
- **Recommended Resolution:** 1920x1080 (Full HD)
- **Acceptable Resolution:** 1280x720 (HD)
- **Max File Size:** 15MB per video
- **Target File Size:** 5-10MB per video
- **Format:** MP4 (H.264 codec + AAC audio)
- **Duration:** 30 seconds - 2 minutes recommended
- **Optimization:** Use HandBrake (https://handbrake.fr/)
- **Detailed Instructions:** See `videos/README.md`

### Current Gallery Content:
1. Stage Performance - Live Show 2024 (Photo)
2. Group Choreography - Dance Competition (Photo)
3. Rehearsal Session - Behind the Scenes (Photo)
4. Award Ceremony - Competition Win (VIDEO)
5. Team Photo - S. Factor Family (Photo)
6. Special Event - Cultural Performance (VIDEO)

### JavaScript Modules:
```javascript
// GalleryCarousel object (script.js ~lines 1200-1380)
- init(): Initialize gallery and bind events
- bindEvents(): Attach all event listeners
- next()/prev(): Navigate carousel
- goTo(index): Jump to specific slide
- handleSwipe(): Process touch gestures
- startAutoPlay()/pauseAutoPlay(): Auto-slide control
- updateCounter(): Update "1 / 6" display
- toggleVideoPlay(video, playBtn): Toggle video play/pause (NEW)
- pauseAllVideos(): Pause all videos in carousel (NEW)
- isVideoPlaying(): Check if any video is playing (NEW)

// Lightbox object (script.js ~lines 1380-1510)
- init(): Collect images and videos, bind events
- open(index): Show fullscreen preview (photo or video)
- close(): Hide lightbox and pause video
- next()/prev(): Navigate media
- updateMedia(): Update src, alt, caption for photo/video (UPDATED)
```

### CSS Classes:
- `.gallery-section` - Main container
- `.gallery-title` - Section header with camera icon
- `.gallery-carousel` - Flex container with arrows
- `.gallery-container` - Overflow hidden wrapper
- `.gallery-track` - Sliding flex container
- `.gallery-item` - Individual photo/video wrapper
- `.gallery-item.video-item` - Video-specific wrapper
- `.gallery-video` - Video element styling
- `.video-overlay` - Play button overlay
- `.video-play-btn` - Large circular play button
- `.video-badge` - "Video" indicator badge
- `.gallery-overlay` - Hover overlay with info
- `.gallery-zoom` - Zoom/expand button in overlay
- `.gallery-indicators` - Dot navigation
- `.indicator` - Individual dot button
- `.gallery-counter` - Photo counter
- `.lightbox` - Fullscreen modal
- `.lightbox-image` - Preview image
- `.lightbox-video` - Preview video with controls
- `.lightbox-caption` - Media title

### Accessibility Features:
- ARIA labels on all buttons
- Role="tablist" for indicators
- Role="dialog" for lightbox
- aria-modal="true" for lightbox
- aria-selected states for indicators
- Keyboard navigation (arrows, Escape)
- Alt text on all images
- Semantic HTML structure

### Responsive Breakpoints:
- **Desktop (> 768px):** Full navigation arrows, 400px images, 80px video play button
- **Tablet (768px):** Smaller arrows (40px), 300px images, 60px video play button, reduced spacing
- **Mobile (< 480px):** Hide arrows (use swipe), 250px images, 50px video play button, optimized overlays

**Mobile Responsiveness Features (Updated: 2026-04-15):**
1. **Overflow Protection:**
   - `box-sizing: border-box` on gallery section
   - `overflow-x: hidden` to prevent horizontal scroll
   - `max-width: 100%` on mobile breakpoints

2. **Image/Video Sizing:**
   - Desktop: 400px height
   - Tablet (768px): 300px height with `width: 100%`
   - Mobile (480px): 250px height
   - All use `object-fit: cover` for proper aspect ratio

3. **Navigation Controls:**
   - Desktop/Tablet: Visible navigation arrows (50px/40px)
   - Mobile (< 480px): Arrows hidden, swipe-only navigation
   - Touch-friendly indicators (44px minimum touch targets)

4. **Video Play Button:**
   - Desktop: 80px diameter
   - Tablet (768px): 60px diameter
   - Mobile (480px): 50px diameter with 2px border

5. **Text Overlay Optimizations:**
   - Desktop: h3 (1.3rem), p (0.9rem)
   - Tablet (768px): h3 (1.1rem), p (0.85rem)
   - Mobile (480px): h3 (1rem), p (0.75rem)
   - Reduced padding on smaller screens

6. **Touch Optimizations (768px and below):**
   - Minimum 44px touch targets for gallery zoom button
   - Gallery indicators: Small visual dots (8-12px) with 44px invisible touch area via `::before` pseudo-element
   - Active state feedback on gallery items (`:active` transform)
   - Disabled text selection (`user-select: none`)
   - Removed tap highlight color for cleaner touch experience
   - Passive touch event listeners for better performance

7. **Spacing and Layout:**
   - Gallery section padding: 0 (no horizontal padding at any breakpoint)
   - Gallery section margin: 40px → 30px → 25px (desktop → tablet → mobile)
   - Carousel gap: 15px → 10px → 0px
   - Container border radius: 15px → 10px → 8px
   - Indicator dots: 12px → 10px → 8px

8. **Lightbox Navigation Fix (2026-04-15):**
   - Fixed hover state shifting issue on `.lightbox-nav` buttons
   - Preserved `transform: translateY(-50%)` in hover state to maintain vertical centering
   - Combined transforms: `transform: translateY(-50%) scale(1.1)`
   - Separated `.lightbox-close:hover` and `.lightbox-nav:hover` rules to handle different transform requirements

### Customization Options:
```javascript
// Change auto-slide speed
GalleryCarousel.autoPlayDelay = 6000; // 6 seconds

// Change swipe sensitivity
handleSwipe() { const swipeThreshold = 80; }

// Add more photos
// 1. Add gallery-item HTML
// 2. Update total count in counter
// 3. Add indicator button
// 4. System auto-detects new count
```

### Testing Checklist:
- [ ] Auto-slide works and pauses on hover
- [ ] Auto-slide pauses when video plays
- [ ] Auto-slide resumes when video pauses
- [ ] Navigation arrows navigate correctly
- [ ] Indicators jump to correct slide
- [ ] Swipe works on mobile (left and right)
- [ ] Photo lightbox opens on image click
- [ ] Video plays on click (carousel)
- [ ] Video play/pause button toggles correctly
- [ ] Only one video plays at a time
- [ ] Video lightbox opens with controls
- [ ] Lightbox video plays with sound
- [ ] Lightbox closes with X button
- [ ] Lightbox closes with Escape key
- [ ] Lightbox closes when clicking outside media
- [ ] Lightbox navigation works (arrows, buttons)
- [ ] Counter updates correctly
- [ ] Images load with lazy loading
- [ ] Video posters load correctly
- [ ] Video badge shows on video items
- [ ] Responsive layout works at all breakpoints

**Mobile Responsiveness Tests (Updated: 2026-04-15):**
- [ ] No horizontal scroll on any mobile device (overflow-x: hidden working)
- [ ] Gallery images scale correctly at 768px (300px) and 480px (250px)
- [ ] Videos display properly with centered play buttons (60px/50px)
- [ ] Navigation arrows hidden on mobile (< 480px)
- [ ] Touch/swipe gestures work smoothly on mobile
- [ ] Overlay text readable on all screen sizes (h3 and p properly scaled)
- [ ] Indicators and counter properly sized on mobile
- [ ] Lightbox works on mobile with proper controls
- [ ] All touch targets minimum 44px (accessibility compliant)
- [ ] No overlapping elements on any screen size
- [ ] Proper spacing and padding at all breakpoints
- [ ] Active touch feedback works on gallery items
- [ ] Text selection disabled on mobile (user-select: none)
- [ ] No tap highlight color on mobile devices

================================================================================
## 15. PAGE LOADER ANIMATION (ADDED: 2026-04-15)
================================================================================

### Overview:
Frame-by-frame SVG loader animation that displays during page load.
Uses 81 SVG frames from /loader folder to create smooth animation.
Animation completes at least one full cycle before fading out.

### Implementation:
- **Location:** index.html (after <body> tag), style.css, script.js
- **Frames:** 81 SVG files in loader/ folder
- **Frame Rate:** 20 FPS (50ms per frame)
- **Animation Duration:** ~4.05 seconds per complete cycle (81 frames × 50ms)
- **Behavior:** Plays full cycle even if page loads early, then fades out
- **Maximum Display Time:** 8 seconds (fallback timeout)

### Technical Details:
- Uses fetch API to load SVG frames dynamically
- Fixed positioning with z-index: 10000
- Smooth 0.5s fade-out transition
- Prevents background scrolling while active
- Auto-removes from DOM after hiding
- Responsive sizing (280px desktop, 220px tablet, 180px mobile)
- **Animation Completion Logic:** Calculates remaining frames and waits for cycle to finish before hiding

### SVG Files:
- **Location:** loader/Create_a_stylish,_202604160038_001.svg through _081.svg
- **Format:** SVG with black fill (#000000)
- **Original Size:** 1280x720pt (scaled down in loader)
- **Total Files:** 81 frames

### JavaScript Module:
```javascript
FrameLoader object (script.js):
- init(): Initialize loader and start animation
- startAnimation(): Begin frame-by-frame display at 20 FPS
- showFrame(frameNumber): Load and display specific SVG frame
- onPageLoaded(): Calculate remaining time and wait for cycle completion
- hide(): Fade out and remove loader from DOM
```

### Animation Timing:
1. **Frame Display:** 50ms per frame (20 FPS)
2. **Full Cycle:** 4.05 seconds (81 frames)
3. **On Page Load:** Waits for remaining frames in current cycle + 500ms buffer
4. **Fallback Timeout:** 8 seconds maximum display time
5. **Fade Out Duration:** 0.5s smooth transition

### CSS Classes:
- `.page-loader` - Fixed fullscreen container
- `.page-loader.hidden` - Faded out state
- `.loader-container` - Centered wrapper (280px)
- `.loader-frame` - SVG display area
- `body.loader-active` - Prevents scrolling

### Accessibility:
- aria-hidden="true" on loader container
- Automatically removed from DOM after loading
- Does not interfere with screen readers
- Respects user's need to see loading progress

### Performance:
- Frames loaded via fetch (cached by browser)
- setInterval for consistent frame timing
- Cleanup removes loader from DOM
- 8-second maximum prevents infinite loading

### Responsive Breakpoints:
- **Desktop (> 768px):** 280px × 280px loader
- **Tablet (768px):** 220px × 220px loader
- **Mobile (< 480px):** 180px × 180px loader

================================================================================
## 16. KNOWN ISSUES & SOLUTIONS
================================================================================

### Issue 1: SRI Hash Blocking Resources
Problem: Invalid SRI hashes blocked Three.js and GSAP from loading
Error: "Failed to find a valid digest in the 'integrity' attribute"
Solution: Use browser console computed hashes (see Section 7)
Status: RESOLVED

### Issue 2: GSAP Undefined Errors
Problem: Code tried to use GSAP before it loaded
Error: "Uncaught ReferenceError: gsap is not defined"
Solution: Added `typeof gsap !== 'undefined'` checks before GSAP usage
Fallback: Direct style updates when GSAP not available
Status: RESOLVED

### Issue 3: Memory Leaks
Problem: Event listeners and Three.js objects not cleaned up
Solution: Implemented event handler tracking and cleanup() function
Status: RESOLVED

### Issue 4: Global Function Pollution
Problem: 6 global functions (openfb, openIn, etc.) cluttered namespace
Solution: Created SocialLinks object with open() method
Status: RESOLVED

### Issue 5: CSS Performance
Problem: `* { transition: all }` caused performance issues
Solution: Replaced with specific property transitions
Status: RESOLVED

### Potential Future Issues:
- WebGL not supported on some devices (graceful degradation implemented)
- Audio autoplay blocked by browsers (user interaction required)
- ES6 modules don't work on file:// (HTTP server required)

================================================================================
## 17. DEVELOPMENT GUIDELINES
================================================================================

### Adding New Features:

1. New Social Platform:
   ```javascript
   // In config.js or SocialLinks object
   tiktok: 'https://www.tiktok.com/@yourprofile'
   ```
   ```html
   <!-- In index.html -->
   <button class="social-btn tiktok" data-link="tiktok">
       <i class="fa-brands fa-tiktok"></i>
       <span>TikTok</span>
   </button>
   ```
   
   **With Firebase:** Also update in admin panel social links form.

2. New Animation:
   - Add to DOMContentLoaded event listener
   - Use specific CSS transitions (avoid `all`)
   - Add to cleanup() if it creates resources

3. New Configuration:
   - Add to CONFIG object with descriptive name
   - Update JSDoc comments
   - Never use magic numbers

4. New Gallery Item:
   - **Option A (Static):** Add directly to index.html
   - **Option B (Dynamic):** Use admin panel to add to Firebase
   - Firebase recommended for frequent updates

### Code Quality Standards:

- All functions must have JSDoc comments
- Use CONFIG constants, not magic numbers
- Track all event listeners for cleanup
- Add error handling with graceful degradation
- Test on mobile devices
- Maintain accessibility standards
- Use specific CSS transitions
- Keep functions under 50 lines when possible

### Git Workflow:

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Update PROJECT_MEMORY.md if needed
5. Commit with descriptive message
6. Create pull request
7. Review before merging

### Testing Requirements:

Before deploying:
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS, Android)
- [ ] Verify SRI hashes (no console errors)
- [ ] Check accessibility (keyboard nav, screen reader)
- [ ] Test performance (Lighthouse audit)
- [ ] Validate JSON-LD (Google Rich Results Test)
- [ ] Test keyboard dance moves
- [ ] Verify all social links work

================================================================================
## 18. DEPLOYMENT INSTRUCTIONS
================================================================================

### Prerequisites:
- HTTP server (not file://)
- HTTPS recommended for production
- All files in same directory

### Deployment Options:

#### Option 1: Netlify (RECOMMENDED - 2025-04-15)

**Quick Deploy:**
1. Go to app.netlify.com/drop
2. Drag project folder
3. Site is live in 30-60 seconds

**Git Integration:**
1. Push to GitHub
2. Connect repo in Netlify
3. Auto-deploys on every push

**Features:**
- Automatic HTTPS/SSL
- Global CDN
- Custom domains (free)
- Continuous deployment
- Preview deployments
- Instant rollbacks
- Form handling
- Serverless functions (future)

**Configuration:**
- netlify.toml: Build & redirect config
- _redirects: Clean URL rules
- Security headers configured
- Cache headers optimized

**Admin Panel:**
- yoursite.netlify.app/login
- yoursite.netlify.app/admin.html

**Cost: $0/month** (Free tier sufficient)

#### Option 2: GitHub Pages

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch (main/master)
4. Select folder (/ (root))
5. Save
6. Wait 2-5 minutes

**URL:** https://username.github.io/repository-name

**Limitations:**
- No custom redirects (/_redirects not supported)
- /login path won't work (must use /admin.html)
- Slower CDN than Netlify
- No automatic HTTPS for custom domains
- No preview deployments

**Admin Panel:**
- username.github.io/repository-name/admin.html
- /login redirect NOT available

#### Option 3: Traditional Web Hosting

1. Upload all files via FTP/cPanel
2. Configure .htaccess for redirects
3. Enable HTTPS (Let's Encrypt)

### Server Configuration:

**Apache (.htaccess):**
```apache
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
</IfModule>

# Redirect /login to /admin.html
RewriteEngine On
RewriteRule ^login$ admin.html [L]
```

**Nginx:**
```nginx
location / {
  add_header Access-Control-Allow-Origin *;
  add_header X-Content-Type-Options nosniff;
  add_header X-Frame-Options DENY;
  
  # Redirect /login to /admin.html
  location = /login {
    rewrite ^/login$ /admin.html last;
  }
}
```

### Setup Firebase (FIRST TIME ONLY):
- Follow FIREBASE_SETUP.md guide
- Create Firebase project
- Enable Realtime Database & authentication
- Create admin user
- Update firebase-config.js with your config
- Set database security rules
- Enable Storage for file uploads

### Update URLs in index.html:
- Change `https://sfactordancecrew.com` to actual domain
- Update canonical URL
- Update JSON-LD image URL

### Test locally:
```bash
python -m http.server 8000
# Visit http://localhost:8000
# Admin panel: http://localhost:8000/login or http://localhost:8000/admin.html
```

### Post-deployment:
- Test all features on live URL
- Validate SEO with testing tools
- Submit sitemap to Google Search Console
- Share on social media
- Test admin panel login on live URL
- Verify Firebase integration working

================================================================================
## 19. CODE PATTERNS & BEST PRACTICES
================================================================================

### Event Listener Pattern:
```javascript
// Good - Tracked for cleanup
const handler = (e) => { /* logic */ };
document.addEventListener('mousemove', handler);
eventHandlers.mouseMove.push(handler);

// Bad - Not tracked, can't cleanup
document.addEventListener('mousemove', (e) => { /* logic */ });
```

### Safe GSAP Usage:
```javascript
// Good - Checks if GSAP loaded
if (typeof gsap !== 'undefined') {
    gsap.to(element, { x: 100 });
} else {
    element.style.transform = 'translateX(100px)';
}

// Bad - Assumes GSAP exists
gsap.to(element, { x: 100 }); // Crashes if GSAP not loaded
```

### SRI Implementation:
```javascript
// Good - Complete SRI setup
script.src = 'https://cdn.example.com/library.min.js';
script.integrity = 'sha512-VALID_HASH_HERE==';
script.crossOrigin = 'anonymous';
script.onerror = () => console.warn('Failed to load');

// Bad - Missing attributes
script.src = 'https://cdn.example.com/library.min.js';
// No integrity, no crossorigin, no error handling
```

### Configuration Usage:
```javascript
// Good - Uses CONFIG
setTimeout(init, CONFIG.GSAP_LOAD_DELAY);
if (particles.length > CONFIG.MAX_CURSOR_PARTICLES) { }

// Bad - Magic numbers
setTimeout(init, 2000);
if (particles.length > 300) { }
```

### CSS Transitions:
```css
/* Good - Specific properties */
.social-btn {
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

/* Bad - Transitions everything */
.social-btn {
    transition: all 0.4s ease;
}
```

================================================================================
## 20. MEMORY OF PAST ISSUES & FIXES
================================================================================

### 2025-04-14: SRI Hash Implementation Crisis
Issue: Used placeholder SRI hashes that blocked all CDN resources
Impact: Three.js and GSAP failed to load, particles and animations broken
Root Cause: Generated fake hashes instead of getting validated ones
Fix: Used browser console computed hashes
Lesson: NEVER guess SRI hashes. Always get from cdnjs.com or browser console.

### 2025-04-14: GSAP Undefined Errors
Issue: Dance moves crashed when GSAP not loaded
Impact: JavaScript errors, broken functionality
Root Cause: Assumed GSAP always available
Fix: Added typeof checks and fallback animations
Lesson: Always check if external libraries loaded before using them.

### 2025-04-14: Global CSS Transition Performance
Issue: `* { transition: all }` caused 60fps → 30fps on mobile
Impact: Poor performance, janky animations
Root Cause: Browser calculating transitions for all properties
Fix: Specific property transitions only
Lesson: Never use `transition: all` in production.

### 2025-04-14: Memory Leak Prevention
Issue: Event listeners accumulated, Three.js objects not disposed
Impact: Memory usage grew over time, page slow after long use
Root Cause: No cleanup mechanism
Fix: Event handler tracking + cleanup() function
Lesson: Always track resources for cleanup.

### 2025-04-14: Inline Handler Removal
Issue: onclick="function()" mixed HTML/JS, not CSP compliant
Impact: Security risk, harder maintenance
Root Cause: Old coding pattern
Fix: data-link attributes + event listeners
Lesson: Separate HTML from JavaScript.

================================================================================
## 21. CUSTOMIZATION GUIDE
================================================================================

### Changing Colors:
Edit style.css :root section:
```css
:root {
    --primary: #YOUR_COLOR;      /* Main brand color */
    --secondary: #YOUR_COLOR;    /* Accent color */
    --accent: #YOUR_COLOR;       /* Highlight color */
}
```

### Adjusting Performance:
Edit CONFIG in script.js:
```javascript
DEFAULT_PARTICLE_COUNT: 300,    // Lower = better performance
MAX_CURSOR_PARTICLES: 200,      // Lower = less GPU usage
```

### Updating Contact Info:
1. index.html: Update phone/email in contact section
2. SocialLinks object: Update URLs
3. JSON-LD: Update contactPoint and sameAs

### Changing Fonts:
1. Update Google Fonts link in index.html
2. Update font-family in style.css body rule

### Adding New Sections:
1. Add HTML in index.html
2. Add CSS in style.css
3. Add animations in script.js DOMContentLoaded

### Modifying Dance Moves:
Find addKeyboardDanceMoves() in script.js
Edit key handlers and GSAP animations

================================================================================
## 22. TESTING CHECKLIST
================================================================================

### Pre-Deployment Testing:

Functional Tests:
- [ ] All social media buttons work
- [ ] Dance toggle button shows/hides guide
- [ ] Keyboard keys (S, B, P, W, ?) trigger animations
- [ ] Three.js particles animate in background
- [ ] Contact information displays correctly
- [ ] Image loads with lazy loading
- [ ] Audio visualization appears
- [ ] Gallery carousel works (auto-slide, navigation, swipe)
- [ ] Lightbox opens for images and videos
- [ ] Page loader animation plays completely
- [ ] Loader fades out smoothly after animation cycle

**Module Loading Tests (NEW - 2026-04-15):**
- [ ] All 6 modules load without errors
- [ ] script.js coordinates initialization correctly
- [ ] loader.js starts SVG animation immediately
- [ ] firebase-loader.js connects to Firebase
- [ ] particles.js initializes Three.js scene
- [ ] audio-system.js creates audio visualization
- [ ] gallery.js carousel auto-plays
- [ ] ui-effects.js loads GSAP after 2s delay
- [ ] No console errors during module loading
- [ ] Modules communicate via window object correctly

Firebase Tests (NEW):
- [ ] Firebase initialization successful (no console errors)
- [ ] Admin panel login works
- [ ] Can add gallery item via admin panel
- [ ] Can edit gallery item
- [ ] Can delete gallery item (with confirmation)
- [ ] Can update social links
- [ ] Can update contact information
- [ ] Database security rules working (unauthenticated users can't write)
- [ ] Changes appear in Firebase Console
- [ ] Logout works correctly
- [ ] **File upload from device works** (NEW)
- [ ] **Upload progress bar displays correctly** (NEW)
- [ ] **File size validation works (50MB limit)** (NEW)
- [ ] **Uploaded files appear in Firebase Storage** (NEW)
- [ ] **Auto-filled URL works after upload** (NEW)

Performance Tests:
- [ ] Page loads in < 2s on 4G
- [ ] Animations run at 60fps
- [ ] No memory leaks after 5 minutes
- [ ] Lighthouse performance score > 80
- [ ] No console errors or warnings

Accessibility Tests:
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces buttons
- [ ] Reduced motion preference respected
- [ ] Color contrast ratios meet WCAG AA
- [ ] Touch targets minimum 44px

Security Tests:
- [ ] SRI hashes valid (no integrity errors)
- [ ] External links open with noopener,noreferrer
- [ ] No inline event handlers
- [ ] CORS headers present
- [ ] No console security warnings
- [ ] Firebase config accessible (needed for live site)
- [ ] Database rules prevent unauthorized writes
- [ ] Admin panel requires authentication
- [ ] Firebase Storage rules prevent unauthorized uploads

SEO Tests:
- [ ] JSON-LD validates in Google Rich Results Test
- [ ] Meta tags present and correct
- [ ] Canonical URL set
- [ ] Open Graph tags work (Facebook Debugger)
- [ ] Twitter Card validates

Cross-Browser Tests:
- [ ] Chrome 80+ (Windows, Mac, Linux)
- [ ] Firefox 75+ (Windows, Mac, Linux)
- [ ] Safari 13+ (Mac, iOS)
- [ ] Edge 80+ (Windows)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

Responsive Tests:
- [ ] Works on 320px width (small phones)
- [ ] Works on 768px width (tablets)
- [ ] Works on 1024px width (laptops)
- [ ] Works on 1920px width (desktops)
- [ ] Touch interactions work on mobile
- [ ] Admin panel responsive on mobile

================================================================================
## 25. MODULE ARCHITECTURE (ADDED: 2026-04-15)
================================================================================

### Overview:
On 2026-04-15, script.js was refactored from a monolithic 1760-line file into
a modular architecture with 6 focused modules and a 144-line coordinator.

### Module Dependency Graph:

```
index.html
    ↓
script.js (Main Coordinator - 144 lines)
    ├── loader.js (SVG Loader - 126 lines)
    ├── firebase-loader.js (Firebase Sync - 194 lines)
    │       └── firebase-config.js (CRUD Operations)
    ├── particles.js (Three.js Particles - 369 lines)
    │       └── exports: CONFIG, initThreeJsBackground
    ├── audio-system.js (Audio System - 253 lines)
    │       └── imports: CONFIG from particles.js
    ├── gallery.js (Carousel & Lightbox - 324 lines)
    └── ui-effects.js (UI Effects - 301 lines)
            └── loads GSAP dynamically
```

### Module Communication:

**Global Variables (window object):**
- window.SocialLinks - Social links configuration (set by script.js)
- window.particles - Three.js particle system (set by particles.js)
- window.camera - Three.js camera (set by particles.js)
- window.scene - Three.js scene (set by particles.js)
- window.createCursorParticles - Cursor particle function (set by particles.js)
- window.GalleryCarousel - Carousel object (set by gallery.js export)
- window.Lightbox - Lightbox object (set by gallery.js export)

**Import/Export Pattern:**
- ES6 modules use `import`/`export` statements
- All modules are loaded via `type="module"` in script.js
- Modules export specific functions/objects
- Script.js coordinates all module initialization

### Initialization Sequence:

```javascript
1. FrameLoader.init()
   - Starts SVG animation immediately
   - Listens for window.load event
   - 8-second fallback timeout

2. initializeFirebaseLoader()
   - Loads firebase-config.js dynamically
   - Fetches gallery, social links, contact info
   - Updates DOM with Firebase data

3. initThreeJsBackground()
   - Detects WebGL support
   - Loads Three.js from CDN
   - Creates particle scene

4. initUIEffects()
   - Page load animations
   - 3D tilt & parallax effects
   - Scroll reveal
   - Loads GSAP after 2s delay

5. GalleryCarousel.init() & Lightbox.init()
   - Binds event listeners
   - Starts auto-play
   - Collects media items

6. Social link button listeners
   - Binds click handlers
   - Creates ripple effects

7. initAudioSystem() (delayed 1.5s)
   - Audio visualization bars
   - Beat synchronization
   - Device motion support
   - Performance optimization
```

### Benefits of Modularization:

1. **Maintainability:**
   - Each file has single responsibility
   - Easier to locate and fix bugs
   - Clear separation of concerns

2. **Readability:**
   - 144 lines vs 1760 lines in main file
   - Focused modules (126-369 lines each)
   - Better code organization

3. **Scalability:**
   - Easy to add new features
   - Can modify one module without affecting others
   - Clear extension points

4. **Testing:**
   - Modules can be tested independently
   - Easier to mock dependencies
   - Isolated debugging

5. **Performance:**
   - Modules load in parallel
   - Better browser caching
   - Lazy loading possible

6. **Collaboration:**
   - Multiple developers can work simultaneously
   - Reduced merge conflicts
   - Clear ownership per module

### Migration Notes:

**What Changed:**
- ✅ script.js reduced from 1760 to 144 lines
- ✅ 6 new module files created
- ✅ All functionality preserved
- ✅ Zero breaking changes
- ✅ index.html unchanged (still loads script.js)

**What Stayed the Same:**
- ✅ All features work identically
- ✅ CSS unchanged
- ✅ HTML unchanged
- ✅ Firebase integration unchanged
- ✅ Admin panel unchanged

**Breaking Changes:** None

### Future Improvements:

Potential next steps for further optimization:
1. Convert CONFIG to separate config module
2. Add module bundling (Vite/Webpack) for production
3. Implement lazy loading for heavy modules
4. Add TypeScript for type safety
5. Create unit tests for each module
6. Add module-level error boundaries

### Troubleshooting:

**Issue:** Module not loading
**Solution:** Check browser console for import errors, ensure HTTP server (not file://)

**Issue:** Particles not appearing
**Solution:** Verify particles.js exports correctly, check WebGL support

**Issue:** Firebase not syncing
**Solution:** Check firebase-loader.js imports, verify firebase-config.js is accessible

**Issue:** GSAP dance moves not working
**Solution:** GSAP loads after 2s delay, check ui-effects.js loadGSAP function

================================================================================
## END OF MEMORY FILE
================================================================================

LAST REVIEWED: 2026-04-15 (Modular Script Architecture Complete)
NEXT REVIEW: When significant changes are made

INSTRUCTIONS FOR AI:
1. Read this file at start of every session
2. Understand complete project context
3. Follow all guidelines and patterns
4. Update this file when making changes
5. Never lose this knowledge between sessions

CRITICAL WORKFLOW INSTRUCTIONS (ADDED: 2026-04-15):
⚠️ MANDATORY WORKFLOW - MUST FOLLOW EVERY TIME:

BEFORE MAKING ANY CHANGES:
1. ALWAYS read this PROJECT_MEMORY.md file completely first
2. Understand the current implementation from this file
3. Check relevant sections (file details, configurations, patterns)
4. THEN proceed with user's request

WHEN USER REQUESTS CHANGES:
1. Read PROJECT_MEMORY.md to understand current state
2. Check which files need to be modified
3. Review existing code patterns and guidelines in this file
4. Make the changes user requested
5. Update PROJECT_MEMORY.md with ALL changes made
   - Update file sizes if significant
   - Add new features to relevant sections
   - Update configuration constants if changed
   - Add new issues/solutions if encountered
   - Update "Last Updated" date
   - Document what was changed and why

AFTER COMPLETING CHANGES:
1. Update PROJECT_MEMORY.md with all modifications
2. RE-READ the entire PROJECT_MEMORY.md file
3. Verify all information is accurate and current
4. This prevents memory loss and hallucination in future sessions
5. Ensure consistency across all documented sections

NEVER SKIP THESE STEPS:
- Never make changes without reading this file first
- Never forget to update this file after changes
- Never skip re-reading this file after updates
- This file is your ONLY source of truth for project context

IMPORTANT REMINDERS:
- SRI hashes must be validated, never guessed
- Always use CONFIG constants
- Track all event listeners
- Check if GSAP loaded before using
- Use specific CSS transitions
- Maintain accessibility standards
- Test before deploying
- Update this file after changes
- Firebase config MUST be public on GitHub (normal for Firebase)
- Security comes from database rules and authentication, not config secrecy
- Admin panel URL: /login or /admin.html
- Regularly backup Firebase database
- Firebase Storage enabled for file uploads (50MB max)
- **Netlify is the RECOMMENDED deployment platform** (since 2025-04-15)
- **netlify.toml configured with security headers, caching, and redirects**
- **/_redirects file for clean URLs**
- **GitHub Pages still works but /login redirect not supported**
- **Live site on Netlify: yoursite.netlify.app**
- **Free SSL, CDN, and custom domains on Netlify**

CONTACT FOR UPDATES:
If you need to update this memory file, edit it directly and maintain the same structure.

================================================================================
## FINAL CRITICAL INSTRUCTION
================================================================================

⚠️ AFTER EVERY SESSION AND EVERY CHANGE:
1. This PROJECT_MEMORY.md file MUST be re-read completely
2. Verify all information is current and accurate
3. This ensures NO knowledge is lost between sessions
4. This prevents AI hallucination and maintains context
5. This file is the SINGLE SOURCE OF TRUTH for the entire project

REMEMBER: READ → UNDERSTAND → CHANGE → UPDATE → RE-READ
This cycle MUST be followed for EVERY user request.
