/**
 * Steak House MK Restaurant
 * Gestion interactive du site
 */
(function () {
    'use strict';

    const DOM = {
        header: null,
        mobileMenu: null,
        navLinks: null,
    };

    function init() {
        DOM.header = document.getElementById('header');
        DOM.mobileMenu = document.getElementById('mobileMenu');
        DOM.navLinks = document.getElementById('navLinks');

        initMobileMenu();
        initScrollEffect();
        console.log('Steak House MK Restaurant - Script chargé avec succès !');
    }

    function initMobileMenu() {
        if (!DOM.mobileMenu || !DOM.navLinks) return;

        DOM.mobileMenu.addEventListener('click', toggleMobileMenu);

        DOM.navLinks.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link) closeMobileMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && DOM.navLinks.classList.contains('active')) {
                closeMobileMenu();
                DOM.mobileMenu.focus();
            }
        });
    }

    function toggleMobileMenu() {
        const isActive = DOM.navLinks.classList.toggle('active');
        updateMenuIcon(isActive);
        DOM.mobileMenu.setAttribute('aria-expanded', isActive);
    }

    function closeMobileMenu() {
        DOM.navLinks.classList.remove('active');
        updateMenuIcon(false);
        DOM.mobileMenu.setAttribute('aria-expanded', 'false');
    }

    function updateMenuIcon(isActive) {
        const icon = DOM.mobileMenu.querySelector('i');
        if (!icon) return;
        if (isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    function initScrollEffect() {
        if (!DOM.header) return;
        let ticking = false;
        const SCROLL_THRESHOLD = 50;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    DOM.header.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        DOM.header.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
