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
    indicators: [],
    currentIndex: 0,
    totalSlides: 6,
    autoPlayInterval: null,
    autoPlayDelay: 4000,
    isTransitioning: false,
    
    init() {
        this.track = document.querySelector('.media-track');
        this.items = document.querySelectorAll('.media-item');
        this.carouselDots = document.querySelectorAll('.carousel-dot');
        
        if (!this.track || this.items.length === 0) return;
        
        this.totalSlides = this.items.length;
        this.bindEvents();
        this.startAutoPlay();
        // Counter removed - Instagram UI
    },
    
    bindEvents() {
        document.querySelector('.media-nav.prev')?.addEventListener('click', () => this.prev());
        document.querySelector('.media-nav.next')?.addEventListener('click', () => this.next());
        
        this.carouselDots.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });
        
        document.querySelectorAll('.media-item').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                Lightbox.open(index);
            });
        });
        
        document.querySelectorAll('.media-item:not(.video-item)').forEach((item, index) => {
            item.addEventListener('click', () => Lightbox.open(index));
        });
        
        document.querySelectorAll('.video-play-btn').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const videoItem = btn.closest('.video-item');
                const video = videoItem.querySelector('.gallery-video');
                this.toggleVideoPlay(video, btn);
            });
        });
        
        document.querySelectorAll('.gallery-video').forEach((video) => {
            video.addEventListener('click', (e) => {
                e.stopPropagation();
                const videoItem = video.closest('.video-item');
                const playBtn = videoItem.querySelector('.video-play-btn');
                this.toggleVideoPlay(video, playBtn);
            });
        });
        
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
        
        this.track.addEventListener('mouseenter', () => {
            if (!this.isVideoPlaying()) {
                this.pauseAutoPlay();
            }
        });
        this.track.addEventListener('mouseleave', () => {
            if (!this.isVideoPlaying()) {
                this.startAutoPlay();
            }
        });
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
        this.currentIndex = index;
        
        const offset = -index * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        this.carouselDots.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
            ind.setAttribute('aria-selected', i === index);
        });
        
        // Counter removed - Instagram UI
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
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
    
    updateCounter() {
        const currentEl = document.querySelector('.gallery-counter .current');
        if (currentEl) {
            currentEl.textContent = this.currentIndex + 1;
        }
    },
    
    toggleVideoPlay(video, playBtn) {
        if (video.paused) {
            this.pauseAllVideos();
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.style.opacity = '0.8';
            this.pauseAutoPlay();
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.style.opacity = '1';
            this.startAutoPlay();
        }
    },
    
    pauseAllVideos() {
        document.querySelectorAll('.gallery-video').forEach(video => {
            if (!video.paused) {
                video.pause();
                const videoItem = video.closest('.video-item');
                const playBtn = videoItem.querySelector('.video-play-btn');
                if (playBtn) {
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    playBtn.style.opacity = '1';
                }
            }
        });
    },
    
    isVideoPlaying() {
        let playing = false;
        document.querySelectorAll('.gallery-video').forEach(video => {
            if (!video.paused) {
                playing = true;
            }
        });
        return playing;
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
