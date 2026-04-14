# S. Factor Dance Crew - Social Media Handles

A visually stunning, high-performance social media link tree for S. Factor Dance Crew with interactive Three.js particle animations, custom cursor, and keyboard-controlled dance effects.

## 🌟 Features

### Visual Effects
- **Three.js Particle System** - Dance-themed animated particles with mouse interaction
- **Custom Cursor** - Animated cursor with trail effects (respects reduced motion preferences)
- **3D Tilt & Parallax** - Interactive hover effects on cards and images
- **Audio Visualization** - Simulated audio bars with beat synchronization
- **Keyboard Dance Moves** - Press S, B, P, W to trigger particle animations
- **Photo Gallery** - Interactive carousel with lightbox preview and touch/swipe support

### Performance & Security
- **Optimized Performance** - 50% particle reduction, specific CSS transitions
- **SRI Hashes** - Subresource Integrity for all CDN resources
- **Memory Management** - Proper cleanup on page unload
- **Graceful Degradation** - Works even if CDN resources fail to load
- **WebGL Detection** - Automatically disables particles if not supported

### Accessibility & SEO
- **JSON-LD Structured Data** - Enhanced search engine visibility
- **Meta Tags** - Open Graph, Twitter Cards, canonical URLs
- **Reduced Motion Support** - Respects user preferences
- **Semantic HTML** - Proper ARIA labels and accessible markup
- **Touch-Friendly** - Minimum 44px touch targets

### Architecture
- **Modular Design** - Separate config, utils, and main modules
- **JSDoc Documentation** - Comprehensive code documentation
- **Configuration Constants** - No magic numbers, easy to customize
- **Event Listener Tracking** - Prevents memory leaks

## 🚀 Quick Start

### Running Locally

**Important:** This project must be served via HTTP server (not opened directly as file://)

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Why HTTP Server Required?
- ES6 modules require HTTP protocol
- Three.js WebGL has file:// restrictions
- SRI hashes need proper CORS headers
- Some browsers block certain features on file://

## 📁 Project Structure

```
Social-media-handles/
├── index.html          # Main HTML with SEO meta tags and JSON-LD
├── style.css           # Styles with optimized transitions
├── script.js           # Main application script (well-documented)
├── config.js           # Configuration constants & social links
├── utils.js            # Utility functions & cleanup helpers
├── sfactor.png         # Dance crew logo/image
├── makee.mp3           # Audio file for beat synchronization
└── README.md           # This file
```

## ⌨️ Keyboard Dance Moves

**Note:** This feature is only available on laptop/desktop devices with physical keyboards.

Press these keys to trigger particle animations:

- **S** - Spin move (360° rotation)
- **B** - Bounce effect (elastic movement)
- **P** - Pop effect (scale pulse)
- **W** - Wave effect (sinusoidal motion)
- **?** - Toggle dance moves guide

**Pro Tip:** Click the keyboard icon button (bottom-left) to toggle the guide!

## 📸 Photo & Video Gallery

The project includes an interactive mixed-media gallery to showcase dance performances:

### Gallery Features:
- **Auto-sliding carousel** (4-second intervals)
- **Mixed media support** - Photos AND videos in same carousel
- **Navigation arrows** (previous/next)
- **Dot indicators** (click to jump to any photo/video)
- **Touch/swipe support** for mobile devices
- **Photo hover effects** with image zoom and overlay
- **Video play controls** - Custom-styled player matching site theme
- **Lightbox preview** (click for fullscreen with video controls)
- **Keyboard navigation** in lightbox (arrows, Escape)

### How to Add Photos:
1. Create a `gallery` folder in the project root
2. Add 4 images named:
   - `performance-1.jpg` through `performance-4.jpg`
3. Recommended size: 1200x800px (landscape)
4. Max file size: 500KB per image (optimize with TinyPNG.com)

### How to Add Videos:
1. Create a `videos` folder in the project root
2. Add video files:
   - `performance-video-1.mp4` - First video
   - `performance-video-2.mp4` - Second video
3. Add poster images (thumbnails):
   - `video-1-poster.jpg` - Thumbnail for video 1
   - `video-2-poster.jpg` - Thumbnail for video 2
4. Video specs: 1920x1080, 5-10MB, H.264 codec
5. **Detailed instructions:** See `videos/README.md`

### Gallery Controls:
- **Desktop:** Click arrows, indicators, or swipe
- **Mobile:** Swipe left/right to navigate
- **Photos:** Click image to open lightbox
- **Videos:** Click video or play button to play/pause
- **Lightbox:** Click media to open, X or Escape to close

### Video Features:
- Custom play button (matches your neon theme)
- Auto-pauses carousel when video plays
- Only one video plays at a time
- Fullscreen lightbox with video controls
- Poster image shows before video loads
- Video badge indicator (🎬 Video)

### Customization:
Edit titles and descriptions in `index.html` gallery section:
```html
<div class="overlay-content">
    <h3>Your Title Here</h3>
    <p>Your Description Here</p>
</div>
```

## 🎨 Customization

### Changing Colors
Edit CSS custom properties in `style.css`:

```css
:root {
    --primary: #ff2a6d;      /* Main brand color (pink) */
    --secondary: #05d9e8;    /* Accent color (cyan) */
    --accent: #ffdc3c;       /* Highlight color (yellow) */
    --background: #121212;   /* Page background */
}
```

### Adjusting Performance
Edit constants in `script.js`:

```javascript
const CONFIG = {
    DEFAULT_PARTICLE_COUNT: 500,    // Reduce for better performance
    MAX_CURSOR_PARTICLES: 300,      // Cursor trail particles
    PARTICLE_SPAWN_RATE: 0.7        // 70% spawn probability
};
```

### Updating Social Links
Edit the `SocialLinks` object in `script.js`:

```javascript
const SocialLinks = {
    facebook: 'https://www.facebook.com/yourpage',
    instagram: 'https://www.instagram.com/yourprofile',
    // ... add more platforms
};
```

## 🔒 Security Features

- **Subresource Integrity (SRI)** - All CDN scripts have integrity hashes
- **Cross-Origin Resource Sharing (CORS)** - Proper crossorigin attributes
- **Secure External Links** - `noopener,noreferrer` on all `window.open()` calls
- **No Inline Handlers** - CSP-compliant event listener architecture

## 📊 Performance Metrics

- **Initial Load:** ~200KB (without Three.js)
- **Particles:** 500 (reduced from 1000)
- **CSS Transitions:** Optimized (specific properties only)
- **Memory Leaks:** Prevented with cleanup functions
- **Low-End Devices:** Automatic optimization

## 🌐 Browser Support

- Chrome 80+ (recommended)
- Firefox 75+
- Safari 13+
- Edge 80+

**Note:** WebGL required for particle effects. Site works without it.

## 🔍 SEO & Discovery

The site includes:
- JSON-LD structured data (PerformingGroup schema)
- Open Graph meta tags (Facebook, LinkedIn)
- Twitter Card meta tags
- Canonical URLs
- Semantic HTML structure

Test with:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 🛠️ Development

### Adding New Features

1. **New Social Platform:**
   - Add to `SocialLinks` object
   - Add button in `index.html` with `data-link` attribute

2. **New Animation:**
   - Add to DOMContentLoaded event listener
   - Use specific CSS transitions (avoid `all`)

3. **New Configuration:**
   - Add to `CONFIG` object with descriptive name
   - Update JSDoc comments

### Code Quality

- All functions have JSDoc comments
- No magic numbers (use CONFIG)
- Event listeners are tracked for cleanup
- Error handling with graceful degradation

## 📝 License

MIT License - Feel free to use for your own projects!

## 👥 Credits

**Directed by:** MAK-E  
**Founder:** Sunny Thakur (In Memoriam)  
**Development:** Social Media Handles Project

## 📞 Contact

- **Email:** sfactorperformingart@gmail.com
- **Phone:** +91-9340073167
- **Instagram:** [@s.factordancecrew](https://www.instagram.com/s.factordancecrew/)

---

**Enjoy the experience!** 🎭✨
