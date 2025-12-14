/**
 * Main JavaScript for OpenGov Compliance Center Theme
 */

(function() {
    'use strict';

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                const isOpen = navMenu.classList.toggle('active');
                this.classList.toggle('active');
                document.body.classList.toggle('menu-open');
                
                // Update ARIA attributes
                this.setAttribute('aria-expanded', isOpen);
                navMenu.setAttribute('aria-hidden', !isOpen);
            });
            
            // Close menu on ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.main-navigation') && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                }
            });
        }
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#" or "#0"
                if (href === '#' || href === '#0') {
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Get header height for offset
                    const header = document.querySelector('.site-header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    /**
     * Header Scroll Effect
     */
    function initHeaderScroll() {
        let lastScroll = 0;
        const header = document.querySelector('.site-header');
        
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll (optional)
            // Uncomment if you want hide-on-scroll behavior
            /*
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            */
            
            lastScroll = currentScroll;
        });
    }

    /**
     * Animation on Scroll
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements with fade-in class
        document.querySelectorAll('.feature-card, .card, .testimonial').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Dropdown Menu Accessibility
     */
    function initDropdownMenus() {
        const menuItems = document.querySelectorAll('.nav-menu > li');
        
        menuItems.forEach(item => {
            const submenu = item.querySelector('.sub-menu');
            if (submenu) {
                const link = item.querySelector('a');
                
                // Add ARIA attributes
                link.setAttribute('aria-haspopup', 'true');
                link.setAttribute('aria-expanded', 'false');
                
                // Toggle on click for touch devices
                link.addEventListener('click', function(e) {
                    if (window.matchMedia('(max-width: 992px)').matches) {
                        e.preventDefault();
                        const isOpen = submenu.style.display === 'block';
                        submenu.style.display = isOpen ? 'none' : 'block';
                        link.setAttribute('aria-expanded', !isOpen);
                    }
                });
                
                // Keyboard navigation
                item.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        const isOpen = link.getAttribute('aria-expanded') === 'true';
                        link.setAttribute('aria-expanded', !isOpen);
                    }
                });
            }
        });
    }

    /**
     * Form Validation Enhancement
     */
    function initFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        
                        // Remove error class on input
                        input.addEventListener('input', function() {
                            this.classList.remove('error');
                        }, { once: true });
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                }
            });
        });
    }

    /**
     * Back to Top Button (optional)
     */
    function initBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });
            
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    /**
     * Initialize all functions when DOM is ready
     */
    function init() {
        initMobileMenu();
        initSmoothScroll();
        initHeaderScroll();
        initScrollAnimations();
        initDropdownMenus();
        initFormValidation();
        initBackToTop();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
