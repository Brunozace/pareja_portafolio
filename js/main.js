// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Scroll reveal effect
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => {
    revealObserver.observe(el);
});

// Navigation toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isOpen));
        navToggle.classList.toggle('is-open');
        primaryNav.classList.toggle('is-open');
    });
}

// Highlight current nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Fireworks animation when entering website (only on index)
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("fireworksCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = 999;
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        const colors = ["#ff6685", "#ff9eb5", "#ffd678", "#8fe1d9"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 40; i++) {
            particles.push({
                x,
                y,
                angle: Math.random() * 2 * Math.PI,
                speed: Math.random() * 4 + 1.5,
                radius: Math.random() * 2 + 1,
                alpha: 1,
                color
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.alpha -= 0.01;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
            ctx.fill();

            if (p.alpha <= 0) particles.splice(i, 1);
        });

        requestAnimationFrame(animate);
    }

    function hexToRgb(hex) {
        const value = hex.replace("#", "");
        const bigint = parseInt(value, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }

    let fireworkInterval = setInterval(createFirework, 600);
    setTimeout(() => {
        clearInterval(fireworkInterval);
        setTimeout(() => canvas.remove(), 1500);
    }, 2600);

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

// Carta interactiva
document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelopeImage');
    const cartaTexto = document.getElementById('cartaTexto');
    if (!envelope || !cartaTexto) return;

    envelope.addEventListener('mouseenter', () => {
        envelope.src = 'assets/images/envelope-open.png';
        cartaTexto.classList.remove('hidden');
        requestAnimationFrame(() => cartaTexto.classList.add('show'));
    });

    envelope.addEventListener('mouseleave', () => {
        envelope.src = 'assets/images/envelope-closed.png';
        cartaTexto.classList.remove('show');
        setTimeout(() => cartaTexto.classList.add('hidden'), 300);
    });
});

// Galeria con lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = Array.from(document.querySelectorAll(".grid-item img"));
let currentIndex = 0;

if (galleryImages.length && lightbox && lightboxImg) {
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            openLightbox();
        });
    });
}

function openLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.classList.remove("hidden");
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add("hidden");
}

function navigateLightbox(direction) {
    if (!galleryImages.length || !lightboxImg) return;
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    lightboxImg.src = galleryImages[currentIndex].src;
}
