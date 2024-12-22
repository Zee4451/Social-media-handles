// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        let ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Social media link functions with smooth transitions
function openSocialLink(url) {
    const button = event.currentTarget;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        window.open(url, '_blank');
    }, 200);
}

function openfb() {
    openSocialLink("https://www.facebook.com/rex.khan3");
}

function openIn() {
    openSocialLink("https://www.instagram.com/s.factordancecrew/");
}

function openWa() {
    openSocialLink("https://wa.link/ntso2j");
}

function openTg() {
    openSocialLink("https://t.me/SfactorDanceCrew");
}

function openCt() {
    openSocialLink("tel:9340073167");
}

function openGm() {
    openSocialLink("mailto:sfactorperformingart@gmail.com");
}

// Add parallax effect to header image
const imageContainer = document.querySelector('.image-container');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (imageContainer) {
        imageContainer.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add fade-in animation for elements on page load
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.head, .links button, .end');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
