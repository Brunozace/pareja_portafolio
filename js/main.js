// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Scroll reveal effect
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.event, .carta-amor, .hero').forEach(el => {
    el.classList.add("invisible");
    observer.observe(el);
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

function toggleMenu(el) {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("hidden");

    if (el) {
        el.classList.toggle("active");
    }
}


// Fireworks animation when entering website
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = 9999;
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        const colors = ["#ff4d4d", "#ff66cc", "#ffcc00", "#66ff66", "#66ccff"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 50; i++) {
            particles.push({
                x,
                y,
                angle: Math.random() * 2 * Math.PI,
                speed: Math.random() * 5 + 2,
                radius: Math.random() * 3 + 1,
                alpha: 1,
                color
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            const dx = Math.cos(p.angle) * p.speed;
            const dy = Math.sin(p.angle) * p.speed;
            p.x += dx;
            p.y += dy;
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
        hex = hex.replace("#", "");
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }

    // Launch fireworks every 500ms for 3 seconds
    let fireworkInterval = setInterval(createFirework, 500);
    setTimeout(() => {
        clearInterval(fireworkInterval);
        // Remove canvas after animation
        setTimeout(() => canvas.remove(), 2000);
    }, 3000);

    animate();
});





document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelopeImage');
    const cartaTexto = document.getElementById('cartaTexto');

    envelope.addEventListener('mouseenter', () => {
        envelope.src = 'assets/images/envelope-open.png';
        cartaTexto.classList.remove('hidden');
        setTimeout(() => cartaTexto.classList.add('show'), 50);
    });

    envelope.addEventListener('mouseleave', () => {
        envelope.src = 'assets/images/envelope-closed.png';
        cartaTexto.classList.remove('show');
        setTimeout(() => cartaTexto.classList.add('hidden'), 300);
    });
});





const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = Array.from(document.querySelectorAll(".grid-item img"));
let currentIndex = 0;

// Show image in lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.classList.remove("hidden");
}

function closeLightbox() {
    lightbox.classList.add("hidden");
}

// Navigate left or right
function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    lightboxImg.src = galleryImages[currentIndex].src;
}
