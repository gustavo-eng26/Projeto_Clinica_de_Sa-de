// Professional Card Interactions

// 1. Enhanced hover effects with sound feedback
document.addEventListener('DOMContentLoaded', function() {
    const professionalCards = document.querySelectorAll('.professional-card');

    professionalCards.forEach((card, index) => {
        // Staggered animation on load
        card.style.animationDelay = `${index * 0.1}s`;

        // Click to expand/collapse professional details
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            // Emit visual feedback
            const ripple = createRipple(event);
            this.appendChild(ripple);
        });

        // Mouse enter effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        // Mouse leave effects
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Create ripple effect on click
    function createRipple(event) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = event.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        return ripple;
    }
});

// 2. Filter professionals by specialty (if filter buttons exist)
function initProfessionalFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.professional-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.specialty === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 3. Smooth scroll to professional
function smoothScrollToProfessional(professionalName) {
    const cards = document.querySelectorAll('.professional-card');
    let targetCard = null;

    cards.forEach(card => {
        const nameElement = card.querySelector('.professional-info h3');
        if (nameElement && nameElement.textContent.includes(professionalName)) {
            targetCard = card;
        }
    });

    if (targetCard) {
        targetCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Highlight the card briefly
        targetCard.style.boxShadow = '0 0 30px rgba(107, 76, 154, 0.5)';
        setTimeout(() => {
            targetCard.style.boxShadow = 'var(--shadow-hover)';
        }, 2000);
    }
}

// 4. Certification badges interaction
document.addEventListener('DOMContentLoaded', function() {
    const badges = document.querySelectorAll('.cert-badge');

    badges.forEach(badge => {
        badge.addEventListener('mouseover', function() {
            this.title = this.textContent;
        });

        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            showCertificationInfo(this.textContent);
        });
    });
});

function showCertificationInfo(certification) {
    console.log(`Certification selected: ${certification}`);
    // You can add a modal or tooltip here to show more info
}

// 5. Professional card reveal animation on scroll
function initScrollRevealAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.professional-card').forEach(card => {
        observer.observe(card);
    });
}

// 6. Search professionals by name or specialty
function searchProfessionals(searchTerm) {
    const cards = document.querySelectorAll('.professional-card');
    let found = 0;

    cards.forEach(card => {
        const name = card.querySelector('.professional-info h3').textContent.toLowerCase();
        const specialty = card.querySelector('.specialty').textContent.toLowerCase();

        if (name.includes(searchTerm.toLowerCase()) || specialty.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
            card.style.opacity = '1';
            found++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0.3';
        }
    });

    return found;
}

// 7. Initialize all on page load
document.addEventListener('DOMContentLoaded', function() {
    initScrollRevealAnimation();
    initProfessionalFilter();

    // Add CSS for ripple effect if it doesn't exist
    addRippleStyles();

    // WhatsApp scheduling with professional selection
    initProfessionalWhatsApp();
});

// 8. Add dynamic ripple effect styles
function addRippleStyles() {
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.innerHTML = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(232, 168, 124, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }

            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            .professional-card.expanded {
                z-index: 100;
            }

            .professional-card.revealed {
                opacity: 1;
                transform: translateY(0);
            }

            .cert-badge {
                cursor: pointer;
            }

            .cert-badge:active {
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(style);
    }
}

// 9. WhatsApp integration with professional selection
function initProfessionalWhatsApp() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const cardParent = this.closest('.professional-card');
            if (cardParent) {
                const professionalName = cardParent.querySelector('.professional-info h3').textContent;
                const specialty = cardParent.querySelector('.specialty').textContent;

                // Modify WhatsApp message to include professional info
                const baseMessage = this.getAttribute('href');
                const newMessage = baseMessage.replace(
                    /text=.*$/,
                    `text=Olá! Gostaria de agendar uma sessão com ${professionalName} (${specialty}).`
                );
                this.setAttribute('href', newMessage);
            }
        });
    });
}

// 10. Export functions for external use
window.ProfessionalsModule = {
    scrollToProfessional: smoothScrollToProfessional,
    search: searchProfessionals,
    filter: function(specialty) {
        const button = document.querySelector(`[data-filter="${specialty}"]`);
        if (button) button.click();
    }
};

// 11. Add keyboard navigation support
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.professional-card');
    let currentIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % cards.length;
            cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            cards[currentIndex].focus();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            cards[currentIndex].focus();
        }
    });
});

// 12. Performance optimization: Lazy load images if using actual img tags
function lazyLoadProfessionalImages() {
    const images = document.querySelectorAll('.professional-image img');

    if (!('IntersectionObserver' in window)) {
        images.forEach(img => img.classList.add('loaded'));
        return;
    }

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

    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadProfessionalImages);

console.log('Professional module loaded successfully');
