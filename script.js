/**
 * Blog Malo & Louise — Norvège
 * script.js
 */

/* ============================================================
   HEADER : devient opaque après le scroll hors du hero
   ============================================================ */
(function () {
    const header = document.getElementById('site-header');
    if (!header) return;

    function updateHeader() {
        const threshold = window.innerHeight * 0.1;
        if (window.scrollY > threshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); // état initial
})();


/* ============================================================
   ÉTAT VIDE : masquer si des articles sont présents
   ============================================================ */
(function () {
    const feed  = document.getElementById('blog-feed');
    const empty = document.getElementById('empty-state');
    if (!feed || !empty) return;

    const articles = feed.querySelectorAll('article.blog-strip');
    if (articles.length > 0) {
        empty.style.display = 'none';
    }
})();


/* ============================================================
   CARROUSEL
   ============================================================ */

// Chaque carrousel est indépendant grâce à l'index du conteneur parent
// On stocke les index dans un Map pour supporter plusieurs carrousels par page.
const carouselStates = new Map();

function changeSlide(btn, n) {
    // Trouver le conteneur parent .carousel-container
    const container = btn.closest('.carousel-container');
    if (!container) return;

    const slides = container.querySelectorAll('.carousel-slide');
    if (!slides.length) return;

    // Récupérer ou initialiser l'index courant
    let current = carouselStates.get(container) ?? 0;

    // Retire l'active de la slide courante
    slides[current].classList.remove('active');

    // Calcule le nouvel index avec wrap-around
    current = (current + n + slides.length) % slides.length;

    // Active la nouvelle slide
    slides[current].classList.add('active');
    carouselStates.set(container, current);
}

// Expose globalement pour les onclick inline dans le HTML
window.changeSlide = changeSlide;
