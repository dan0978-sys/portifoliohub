// ============================================
// PORTFOLIO HUB - ADVANCED INTERACTIVITY
// ============================================

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mouse tracking effect for hero section
const hero = document.querySelector('.hero');
const geometricBox = document.querySelector('.geometric-box');

if (hero && geometricBox) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        geometricBox.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
    });
    
    hero.addEventListener('mouseleave', () => {
        geometricBox.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.feature-card, .project-card, .timeline-item, .achievement-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Header glow effect on scroll
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 0 50px rgba(0, 217, 255, 0.3)';
        header.style.borderBottomColor = 'rgba(0, 217, 255, 0.4)';
    } else {
        header.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.1)';
        header.style.borderBottomColor = 'rgba(0, 217, 255, 0.2)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav a').forEach(link => {
        link.style.color = 'var(--text-secondary)';
        link.style.textShadow = 'none';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary)';
            link.style.textShadow = '0 0 10px var(--glow-primary)';
        }
    });
});

// Button ripple effect
document.querySelectorAll('.btn, .link-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay) {
        const scrolled = window.pageYOffset;
        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Card hover glow effect
document.querySelectorAll('.feature-card, .project-card, .timeline-content, .achievement-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.6);
    display: none;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.display = 'block';
    cursorGlow.style.left = (e.clientX - 20) + 'px';
    cursorGlow.style.top = (e.clientY - 20) + 'px';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.display = 'none';
});

// Animated counter for achievements
const observerCounter = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const value = entry.target.textContent;
            
            if (value.includes('+')) {
                const num = parseInt(value);
                let current = 0;
                const increment = Math.ceil(num / 30);
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        entry.target.textContent = num + '+';
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = current + '+';
                    }
                }, 30);
            }
            
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.achievement-value').forEach(el => {
    observerCounter.observe(el);
});

// Add dynamic background animation
const updateBackgroundGradient = () => {
    const time = Date.now() * 0.0001;
    const x = Math.sin(time) * 50 + 50;
    const y = Math.cos(time * 0.7) * 50 + 50;
    
    document.body.style.setProperty('--bg-x', `${x}%`);
    document.body.style.setProperty('--bg-y', `${y}%`);
};

setInterval(updateBackgroundGradient, 50);

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'all 0.1s linear');
}

// Log initialization
console.log('Portfolio Hub loaded with advanced interactivity!');
console.log('Features: Smooth scrolling, parallax, hover effects, animations');
console.log('Optimized for performance and accessibility');
