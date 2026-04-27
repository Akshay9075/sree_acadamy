// ===== JavaScript for Sree Academy =====

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const course = document.getElementById('course').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !course || !message) {
                showMessage('कृपया सभी फील्ड भरें | Please fill all fields', 'error');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showMessage('कृपया सही ईमेल दर्ज करें | Please enter valid email', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                showMessage('धन्यवाद! हम आपसे शीघ्र संपर्क करेंगे | Thank you! We will contact you soon.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }, 1500);
        });
    }

    function showMessage(message, type) {
        if (formMessage) {
            formMessage.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
            formMessage.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;

            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Active Navbar Link
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && window.location.pathname.includes(href)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Intersection Observer for Scroll Reveal Animations
const revealObserverOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
};

const revealObserver = new IntersectionObserver(function(entries, observerInstance) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observerInstance.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

function addRevealClass(selector, className) {
    document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add('reveal-on-scroll');
        if (className) {
            element.classList.add(className);
        }
        const delayClass = index % 4;
        if (delayClass === 1) element.classList.add('reveal-delay-1');
        if (delayClass === 2) element.classList.add('reveal-delay-2');
        if (delayClass === 3) element.classList.add('reveal-delay-3');
        revealObserver.observe(element);
    });
}

// Auto-animate major layout blocks site-wide
addRevealClass('section.page-banner, section:not(.page-banner):not(.site-footer)', 'reveal-from-right');
addRevealClass('.hero-slider', 'reveal-from-left');
addRevealClass('.course-card, .why-card, .mission-card, .director-card, .benefit-item, .contact-box, .stat-box, .result-stat, .faq-modern .accordion-item, .timeline-card, .testimonial-card, .course-detail-card, .admission-split-card, .about-split-card, .map-embed-wrap', 'reveal-scale');
addRevealClass('.admission-split-image img, .about-split-image img, .course-banner img, .hero-slider .slide-overlay', 'reveal-zoom');
addRevealClass('.admission-split-content, .about-split-content, .detail-support, .admission-box, .detail-panel, .testimonial-strip, .faq-heading, .footer-brand, .footer-title, .site-footer .social-links a', 'reveal-fade');

// Hero Parallax Motion
const heroSlider = document.querySelector('.hero-slider');
const heroItems = document.querySelectorAll('.hero-slider .carousel-item');
let heroParallaxFrame = null;

function updateHeroParallax() {
    if (!heroSlider || !heroItems.length) return;

    const isDesktop = window.matchMedia('(min-width: 992px)').matches;
    if (!isDesktop) {
        heroItems.forEach(item => {
            item.style.backgroundPosition = 'center center';
        });
        return;
    }

    const scrollOffset = Math.max(window.scrollY, 0);
    heroItems.forEach((item, index) => {
        const depth = 18 + (index * 6);
        const shift = Math.min(scrollOffset * 0.06 * depth / 18, 70);
        item.style.backgroundPosition = `center calc(50% + ${shift}px)`;
    });
}

function scheduleHeroParallax() {
    if (heroParallaxFrame) return;
    heroParallaxFrame = window.requestAnimationFrame(() => {
        updateHeroParallax();
        heroParallaxFrame = null;
    });
}

if (heroSlider) {
    window.addEventListener('scroll', scheduleHeroParallax, { passive: true });
    window.addEventListener('resize', scheduleHeroParallax, { passive: true });
    updateHeroParallax();
}

// Mobile Menu Close
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-box h3, .result-stat h3');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const numberMatch = text.match(/\d+/);
        if (numberMatch) {
            const target = parseInt(numberMatch[0]);
            let current = 0;
            const increment = target / 50;
            const suffix = text.replace(/\d+/, '');
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(event) {
    // Escape to close offcanvas/modals
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        });
    }
});

// Page Load Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in-out';

// Back to Top Button
document.addEventListener('DOMContentLoaded', function () {
    let backToTopBtn = document.querySelector('.back-to-top-btn');
    let whatsappFloatBtn = document.querySelector('.whatsapp-float-btn');

    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.type = 'button';
        backToTopBtn.className = 'back-to-top-btn';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopBtn);
    }

    if (!whatsappFloatBtn) {
        whatsappFloatBtn = document.createElement('a');
        whatsappFloatBtn.className = 'whatsapp-float-btn';
        whatsappFloatBtn.href = 'https://wa.me/918421449548?text=Hello%20Sree%20Academy%2C%20I%20would%20like%20information%20about%20admission.';
        whatsappFloatBtn.target = '_blank';
        whatsappFloatBtn.rel = 'noopener';
        whatsappFloatBtn.setAttribute('aria-label', 'Chat on WhatsApp');
        whatsappFloatBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsappFloatBtn);
    }

    function toggleBackToTopButton() {
        if (window.scrollY > 260) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', toggleBackToTopButton, { passive: true });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    toggleBackToTopButton();
});

// Console Message
console.log('%c🎓 SREE ACADEMY', 'color: #0ea5a5; font-size: 24px; font-weight: bold;');
console.log('%cExcellence in Competitive Exams', 'color: #f97316; font-size: 14px;');
console.log('%cNagpur, Maharashtra', 'color: #a855f7; font-size: 12px;');
console.log('%c📞 8421449548', 'color: #0891b2; font-size: 13px; font-weight: bold;');
