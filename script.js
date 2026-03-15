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
});
