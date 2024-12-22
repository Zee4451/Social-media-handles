// Create snowflakes dynamically
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    for (let i = 0; i < 20; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = ['❅', '❆', '❄'][Math.floor(Math.random() * 3)];
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.animationDelay = `${Math.random() * 2}s`;
        snowflakesContainer.appendChild(snowflake);
    }
}

// Add smooth animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();

    // Animate elements on page load with staggered timing
    const elements = [
        document.querySelector('.image-container'),
        document.querySelector('.contact-info'),
        document.querySelector('.head'),
        ...document.querySelectorAll('.social-btn'),
        document.querySelector('.end')
    ];

    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 150 * index);
        }
    });

    // Add Christmas theme to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            const icon = item.querySelector('i');
            if (icon) icon.style.color = '#c41e3a';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            const icon = item.querySelector('i');
            if (icon) icon.style.color = '';
        });
    });
});

// Add parallax effect to image with Christmas theme
const image = document.querySelector('.image-container img');
if (image) {
    document.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = image.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        image.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    document.addEventListener('mouseleave', () => {
        image.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    });
}

// Add Christmas-themed click effects to buttons
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const icon = this.querySelector('i');
        const iconWrapper = this.querySelector('.icon-wrapper');
        
        // Add festive click animation
        this.style.transform = 'scale(0.95)';
        if (iconWrapper) {
            iconWrapper.style.transform = 'rotate(360deg)';
            iconWrapper.style.backgroundColor = 'rgba(196, 30, 58, 0.1)';
        }
        
        setTimeout(() => {
            this.style.transform = '';
            if (iconWrapper) {
                iconWrapper.style.transform = '';
                iconWrapper.style.backgroundColor = '';
            }
        }, 300);

        // Add sparkle effect
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        const rect = button.getBoundingClientRect();
        sparkle.style.left = `${e.clientX - rect.left}px`;
        sparkle.style.top = `${e.clientY - rect.top}px`;
        this.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 600);
    });
});

// Social media functions with Christmas theme
function openSocialLink(url, button) {
    const icon = button.querySelector('i');
    const iconWrapper = button.querySelector('.icon-wrapper');
    
    // Add Christmas click animation
    button.style.transform = 'scale(0.95)';
    if (iconWrapper) {
        iconWrapper.style.transform = 'rotate(360deg)';
        iconWrapper.style.backgroundColor = 'rgba(196, 30, 58, 0.1)';
    }
    
    setTimeout(() => {
        button.style.transform = '';
        if (iconWrapper) {
            iconWrapper.style.transform = '';
            iconWrapper.style.backgroundColor = '';
        }
        window.open(url, '_blank');
    }, 300);
}

// Social media functions
function openfb() {
    openSocialLink("https://www.facebook.com/rex.khan3", event.currentTarget);
}

function openIn() {
    openSocialLink("https://www.instagram.com/s.factordancecrew/", event.currentTarget);
}

function openWa() {
    openSocialLink("https://wa.link/ntso2j", event.currentTarget);
}

function openTg() {
    openSocialLink("https://t.me/SfactorDanceCrew", event.currentTarget);
}

function openCt() {
    openSocialLink("tel:9340073167", event.currentTarget);
}

function openGm() {
    openSocialLink("mailto:sfactorperformingart@gmail.com", event.currentTarget);
}

// Add Christmas theme to scroll behavior
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header-section');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Add snow parallax effect
    document.querySelectorAll('.snowflake').forEach(snowflake => {
        snowflake.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// Intersection Observer for Christmas-themed reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('social-btn')) {
                entry.target.style.setProperty('--animation-order', entry.target.dataset.order);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.social-btn, .contact-item').forEach((el, index) => {
    el.dataset.order = index;
    observer.observe(el);
});
