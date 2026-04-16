/**
 * Gallery Carousel & Lightbox Module
 * 
 * Provides interactive photo gallery with auto-sliding carousel,
 * touch/swipe support, and fullscreen lightbox preview.
 * 
 * @module Gallery
 * @version 1.0.0
 */

// Gallery Carousel Configuration
const GalleryCarousel = {
    track: null,
    items: [],
    carouselDots: [],
    currentIndex: 0,
    totalSlides: 6,
    autoPlayInterval: null,
    autoPlayDelay: 4000,
    isTransitioning: false,
    isMuted: true,
    lastTapTime: 0,
    lastTapTarget: null,
    isVisible: false,
    progressInterval: null,
    
    init() {
        this.track = document.querySelector('.media-track');
        this.items = document.querySelectorAll('.media-item');
        this.carouselDots = document.querySelectorAll('.carousel-dot');
        
        if (!this.track || this.items.length === 0) return;
        
        this.totalSlides = this.items.length;
        this.bindEvents();
        this.setupIntersectionObserver();
        this.setupTabVisibility();
        this.startAutoPlay();
        
        // Setup initial slide
        this.updateCurrentSlide();
    },
    
    bindEvents() {
        // Navigation
        document.querySelector('.media-nav.prev')?.addEventListener('click', () => this.prev());
        document.querySelector('.media-nav.next')?.addEventListener('click', () => this.next());
        
        // Carousel dots
        this.carouselDots.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });
        
        // Double-tap for like
        this.track.addEventListener('click', (e) => this.handleDoubleTap(e));
        
        // Like button
        document.querySelector('.like-btn')?.addEventListener('click', () => this.toggleLike());
        
        // Save button
        document.querySelector('.save-btn')?.addEventListener('click', () => this.toggleSave());
        
        // Share button
        document.querySelector('.share-btn')?.addEventListener('click', () => this.handleShare());
        
        // Mute button
        document.querySelector('.mute-btn')?.addEventListener('click', () => this.toggleMute());
        
        // Touch/swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.pauseAutoPlay();
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
            this.startAutoPlay();
        }, { passive: true });
    },
    
    next() {
        if (this.isTransitioning) return;
        this.goTo((this.currentIndex + 1) % this.totalSlides);
    },
    
    prev() {
        if (this.isTransitioning) return;
        this.goTo((this.currentIndex - 1 + this.totalSlides) % this.totalSlides);
    },
    
    goTo(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.isTransitioning = true;
        
        // Pause current video before sliding
        this.pauseActiveVideo();
        
        this.currentIndex = index;
        
        const offset = -index * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        this.carouselDots.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
            ind.setAttribute('aria-selected', i === index);
        });
        
        // Update caption
        this.updateCaption(index);
        
        // Show/hide mute button based on media type
        this.updateMuteButton(index);
        
        // Play new video after transition
        setTimeout(() => {
            this.isTransitioning = false;
            this.playActiveVideo();
            this.startProgressTracking();
        }, 400);
    },
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) this.next();
            else this.prev();
        }
    },
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    },
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    },
    
    // Instagram-style Video Control Methods
    
    playActiveVideo() {
        const activeItem = this.items[this.currentIndex];
        if (!activeItem || !activeItem.classList.contains('video-item')) return;
        
        const video = activeItem.querySelector('.gallery-video');
        if (video) {
            video.muted = this.isMuted;
            video.play().catch(err => {
                console.log('Autoplay prevented:', err);
            });
        }
    },
    
    pauseActiveVideo() {
        const activeItem = this.items[this.currentIndex];
        if (!activeItem || !activeItem.classList.contains('video-item')) return;
        
        const video = activeItem.querySelector('.gallery-video');
        if (video && !video.paused) {
            video.pause();
        }
    },
    
    pauseAllVideos() {
        document.querySelectorAll('.gallery-video').forEach(video => {
            if (!video.paused) {
                video.pause();
            }
        });
    },
    
    // Double-Tap Like Handler
    handleDoubleTap(e) {
        const now = Date.now();
        const target = e.target.closest('.media-item');
        
        if (!target) return;
        
        // Check if double-tap (within 300ms)
        if (now - this.lastTapTime < 300 && this.lastTapTarget === target) {
            // Trigger like
            this.triggerLike();
            
            // Show heart animation
            this.showHeartAnimation(target);
        }
        
        this.lastTapTime = now;
        this.lastTapTarget = target;
    },
    
    showHeartAnimation(mediaItem) {
        const heartContainer = mediaItem.querySelector('.double-tap-heart');
        if (!heartContainer) return;
        
        // Create heart icon
        heartContainer.innerHTML = '<i class="fas fa-heart"></i>';
        
        // Trigger animation
        heartContainer.classList.remove('animate');
        void heartContainer.offsetWidth; // Force reflow
        heartContainer.classList.add('animate');
        
        // Clean up after animation
        setTimeout(() => {
            heartContainer.classList.remove('animate');
            heartContainer.innerHTML = '';
        }, 800);
    },
    
    // Like Button Handler
    triggerLike() {
        const likeBtn = document.querySelector('.like-btn');
        if (!likeBtn) return;
        
        const isLiked = likeBtn.classList.contains('liked');
        
        if (!isLiked) {
            likeBtn.classList.add('liked');
            likeBtn.querySelector('i').className = 'fas fa-heart'; // Solid heart
        }
    },
    
    toggleLike() {
        const likeBtn = document.querySelector('.like-btn');
        if (!likeBtn) return;
        
        const isLiked = likeBtn.classList.toggle('liked');
        const icon = likeBtn.querySelector('i');
        
        if (isLiked) {
            icon.className = 'fas fa-heart'; // Solid
            this.showHeartAnimation(this.items[this.currentIndex]);
        } else {
            icon.className = 'far fa-heart'; // Outline
        }
    },
    
    // Save Button Handler
    toggleSave() {
        const saveBtn = document.querySelector('.save-btn');
        if (!saveBtn) return;
        
        const isSaved = saveBtn.classList.toggle('saved');
        const icon = saveBtn.querySelector('i');
        
        icon.className = isSaved ? 'fas fa-bookmark' : 'far fa-bookmark';
    },
    
    // Share Button Handler
    async handleShare() {
        const currentMedia = this.items[this.currentIndex];
        const video = currentMedia?.querySelector('.gallery-video');
        const img = currentMedia?.querySelector('img');
        const mediaUrl = video?.querySelector('source')?.src || img?.src;
        
        const shareData = {
            title: 'S. Factor Dance Crew',
            text: 'Check out this amazing performance!',
            url: mediaUrl || window.location.href
        };
        
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(shareData.url);
                this.showToast('Link copied to clipboard!');
            }
        } catch (err) {
            console.log('Share cancelled:', err);
        }
    },
    
    // Mute Button Handler
    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteBtn = document.querySelector('.mute-btn');
        const icon = muteBtn?.querySelector('i');
        
        // Update all videos
        document.querySelectorAll('.gallery-video').forEach(video => {
            video.muted = this.isMuted;
        });
        
        // Update icon
        if (icon) {
            icon.className = this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        }
    },
    
    updateMuteButton(index) {
        const muteBtn = document.querySelector('.mute-btn');
        const activeItem = this.items[index];
        
        if (activeItem?.classList.contains('video-item')) {
            muteBtn?.classList.add('visible');
        } else {
            muteBtn?.classList.remove('visible');
        }
    },
    
    // Progress Bar Tracking
    startProgressTracking() {
        this.stopProgressTracking();
        
        const activeItem = this.items[this.currentIndex];
        if (!activeItem || !activeItem.classList.contains('video-item')) return;
        
        const video = activeItem.querySelector('.gallery-video');
        const progressBar = document.querySelector('.video-progress-bar');
        
        if (!video || !progressBar) return;
        
        this.progressInterval = setInterval(() => {
            if (video.duration) {
                const progress = (video.currentTime / video.duration) * 100;
                progressBar.style.width = `${progress}%`;
            }
        }, 100);
    },
    
    stopProgressTracking() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    },
    
    // Intersection Observer for Autoplay/Pause
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                
                if (entry.isIntersecting) {
                    this.playActiveVideo();
                    this.startAutoPlay();
                } else {
                    this.pauseAllVideos();
                    this.pauseAutoPlay();
                }
            });
        }, {
            threshold: 0.5 // 50% visible
        });
        
        observer.observe(document.querySelector('.card-media'));
    },
    
    // Tab Visibility Handler
    setupTabVisibility() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAllVideos();
                this.pauseAutoPlay();
            } else if (this.isVisible) {
                this.playActiveVideo();
                this.startAutoPlay();
            }
        });
    },
    
    // Helper Methods
    updateCaption(index) {
        const captionContent = document.querySelector('.caption-content');
        const currentMedia = this.items[index];
        
        if (!captionContent || !currentMedia) return;
        
        const title = currentMedia.querySelector('h3')?.textContent || '';
        captionContent.textContent = title;
    },
    
    updateCurrentSlide() {
        this.updateCaption(this.currentIndex);
        this.updateMuteButton(this.currentIndex);
    },
    
    showToast(message) {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            animation: fadeInOut 2s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
};

// Lightbox Preview Module
const Lightbox = {
    modal: null,
    image: null,
    video: null,
    caption: null,
    currentIndex: 0,
    images: [],
    
    init() {
        this.modal = document.getElementById('lightbox');
        this.image = this.modal?.querySelector('.lightbox-image');
        this.video = this.modal?.querySelector('.lightbox-video');
        this.caption = this.modal?.querySelector('.lightbox-caption');
        
        if (!this.modal) return;
        
        this.images = [];
        document.querySelectorAll('.media-item').forEach((item, index) => {
            const isVideo = item.classList.contains('video-item');
            
            if (isVideo) {
                const video = item.querySelector('.gallery-video');
                const source = video.querySelector('source');
                this.images.push({
                    type: 'video',
                    src: source.src,
                    poster: video.poster,
                    alt: video.alt || '',
                    title: item.querySelector('h3')?.textContent || ''
                });
            } else {
                const img = item.querySelector('img');
                this.images.push({
                    type: 'image',
                    src: img.src,
                    alt: img.alt,
                    title: item.querySelector('h3')?.textContent || ''
                });
            }
        });
        
        console.log('🖼️ Lightbox initialized with', this.images.length, 'items');
        
        this.bindEvents();
    },
    
    bindEvents() {
        this.modal.querySelector('.lightbox-close')?.addEventListener('click', () => this.close());
        this.modal.querySelector('.lightbox-nav.prev')?.addEventListener('click', () => this.prev());
        this.modal.querySelector('.lightbox-nav.next')?.addEventListener('click', () => this.next());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    },
    
    open(index) {
        this.currentIndex = index;
        this.updateMedia();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        if (this.video) {
            this.video.pause();
            this.video.currentTime = 0;
        }
    },
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateMedia();
    },
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateMedia();
    },
    
    updateMedia() {
        const media = this.images[this.currentIndex];
        
        if (this.video) {
            this.video.pause();
        }
        
        if (media.type === 'video') {
            this.image.style.display = 'none';
            this.video.style.display = 'block';
            
            const source = this.video.querySelector('source');
            source.src = media.src;
            this.video.poster = media.poster;
            this.video.load();
            
            this.caption.textContent = media.title;
        } else {
            this.video.style.display = 'none';
            this.image.style.display = 'block';
            
            const img = new Image();
            img.onload = () => {
                this.image.src = media.src;
                this.image.alt = media.alt || media.title;
            };
            img.onerror = () => {
                this.image.src = media.src;
                this.image.alt = media.alt || media.title;
            };
            img.src = media.src;
            
            this.caption.textContent = media.title;
        }
    }
};

export { GalleryCarousel, Lightbox };
