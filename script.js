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
     * Utilise la délégation d'événements pour les liens
     */
    function initMobileMenu() {
        if (!DOM.mobileMenu || !DOM.navLinks) return;

        // Toggle du menu mobile
        DOM.mobileMenu.addEventListener('click', toggleMobileMenu);

        // Fermeture du menu au clic sur un lien (délégation d'événement)
        DOM.navLinks.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link) {
                closeMobileMenu();
            }
        });

        // Accessibilité : fermeture avec la touche Échap
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && DOM.navLinks.classList.contains('active')) {
                closeMobileMenu();
                DOM.mobileMenu.focus();
            }
        });
    }

    /**
     * Bascule l'état du menu mobile
     */
    function toggleMobileMenu() {
        const isActive = DOM.navLinks.classList.toggle('active');
        updateMenuIcon(isActive);

        // Mise à jour de l'attribut aria-expanded pour l'accessibilité
        DOM.mobileMenu.setAttribute('aria-expanded', isActive);
    }

    /**
     * Ferme le menu mobile
     */
    function closeMobileMenu() {
        DOM.navLinks.classList.remove('active');
        updateMenuIcon(false);
        DOM.mobileMenu.setAttribute('aria-expanded', 'false');
    }

    /**
     * Met à jour l'icône du menu hamburger
     * @param {boolean} isActive - État du menu
     */
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
     * 2. Effet dynamique sur le header au défilement
     * Utilise requestAnimationFrame pour les performances
     * Applique une classe CSS au lieu de modifier le style inline
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

        // Vérification initiale
        updateHeaderState(SCROLL_THRESHOLD);
    }

    /**
     * Met à jour l'état du header selon la position de défilement
     * @param {number} threshold - Seuil de défilement en pixels
     */
    function updateHeaderState(threshold) {
        const shouldBeScrolled = window.scrollY > threshold;
        DOM.header.classList.toggle('scrolled', shouldBeScrolled);
    }

    /**
     * 3. Défilement fluide pour les liens d'ancrage
     * Gère le décalage du header fixe
     */
    function initSmoothScroll() {
        // Support natif via CSS scroll-behavior, rien à faire
        // Si besoin de compatibilité supplémentaire, décommentez le code ci-dessous :
        //
        // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        //     anchor.addEventListener('click', function(e) {
        //         const targetId = this.getAttribute('href');
        //         if (targetId === '#') return;
        //
        //         const target = document.querySelector(targetId);
        //         if (target) {
        //             e.preventDefault();
        //             const headerHeight = DOM.header?.offsetHeight || 75;
        //             const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        //
        //             window.scrollTo({
        //                 top: targetPosition,
        //                 behavior: 'smooth'
        //             });
        //         }
        //     });
        // });
    }

    // Démarrage lorsque le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
