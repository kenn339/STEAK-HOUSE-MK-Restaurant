/**
 * Steak House MK Restaurant
 * Gestion interactive du site
 * Version optimisée avec délégation d'événements et performance améliorée
 */
(function () {
    'use strict';

    // Cache des éléments DOM fréquemment utilisés
    const DOM = {
        header: null,
        mobileMenu: null,
        navLinks: null,
    };

    /**
     * Initialisation au chargement du DOM
     */
    function init() {
        // Cache des éléments
        DOM.header = document.getElementById('header');
        DOM.mobileMenu = document.getElementById('mobileMenu');
        DOM.navLinks = document.getElementById('navLinks');

        // Initialisation des modules
        initMobileMenu();
        initScrollEffect();
        initSmoothScroll();

        console.log('Steak House MK Restaurant - Script chargé avec succès !');
    }

    /**
     * 1. Gestion du menu mobile hamburger
     */
    function initMobileMenu() {
        if (!DOM.mobileMenu || !DOM.navLinks) return;

        DOM.mobileMenu.addEventListener('click', toggleMobileMenu);

        DOM.navLinks.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link) {
                closeMobileMenu();
            }
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

    /**
     * 2. Effet header au scroll
     */
    function initScrollEffect() {
        if (!DOM.header) return;

        let ticking = false;
        const SCROLL_THRESHOLD = 50;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateHeaderState(SCROLL_THRESHOLD);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        updateHeaderState(SCROLL_THRESHOLD);
    }

    function updateHeaderState(threshold) {
        const shouldBeScrolled = window.scrollY > threshold;
        DOM.header.classList.toggle('scrolled', shouldBeScrolled);
    }

    /**
     * 3. Défilement fluide
     */
    function initSmoothScroll() {
        // Support natif via CSS scroll-behavior
    }

    // Démarrage
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
