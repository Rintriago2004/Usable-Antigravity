document.addEventListener('DOMContentLoaded', () => {
    // Accessibility: Reduced Motion Preference check for smooth scrolling manually
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Smooth Scrolling for anchor links (conditionally applied based on user preferences)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ignore # only links like the logo
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                
                if (prefersReducedMotion.matches) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'auto' // instant feedback for motion sensitive users
                    });
                } else {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Accessibility: Send keyboard focus directly to target
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // Modals Logic
    const modals = {
        'modal-legal': document.getElementById('modal-legal'),
        'modal-terms': document.getElementById('modal-terms'),
        'modal-cookies': document.getElementById('modal-cookies')
    };

    document.querySelectorAll('[data-open-modal]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-open-modal');
            if (modals[modalId]) {
                modals[modalId].showModal();
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-close');
            if (modals[modalId]) {
                modals[modalId].close();
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close on backdrop click
    Object.values(modals).forEach(modal => {
        if(modal) {
            modal.addEventListener('click', (e) => {
                const dialogDimensions = modal.getBoundingClientRect()
                if (
                    e.clientX < dialogDimensions.left ||
                    e.clientX > dialogDimensions.right ||
                    e.clientY < dialogDimensions.top ||
                    e.clientY > dialogDimensions.bottom
                ) {
                    modal.close();
                    document.body.style.overflow = '';
                }
            });
        }
    });
});
