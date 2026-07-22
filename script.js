// script.js - Gestion interactive pour le site Steak House MK Restaurant

document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion du menu mobile hamburger
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Fermer le menu mobile lorsqu'on clique sur un lien de navigation
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 2. Effet dynamique sur le header au défilement de la page (Scroll)
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
        } else {
            header.style.background = 'var(--dark-color)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        }
    });

    console.log("Steak House MK Restaurant - Script 100% plein écran chargé avec succès !");
});
