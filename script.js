// Text to type out
const phrases = [
    "Junior Penetration Tester",
    "Nanoscience & Materials Student",
    "USAID Egyptian Pioneers Scholar",
    "CTF Champion & Problem Solver",
    "NYAS Team Leader"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        // Deleting text
        typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typeSpeed = 50; // Faster deleting
    } else {
        // Typing text
        typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typeSpeed = 100; // Normal typing speed
    }
    
    // Pause at the end of typing
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause for 2s
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    setTimeout(typeWriter, 1500); // Wait for the "Connection established" impact
    
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.querySelector('i').classList.toggle('fa-bars');
            mobileMenu.querySelector('i').classList.toggle('fa-xmark');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.querySelector('i').classList.add('fa-bars');
                mobileMenu.querySelector('i').classList.remove('fa-xmark');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.querySelector('i').classList.toggle('fa-bars');
            mobileMenu.querySelector('i').classList.toggle('fa-xmark');
        });
    }

    // Close mobile menu on link click and section scroll
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.querySelector('i').classList.add('fa-bars');
                mobileMenu.querySelector('i').classList.remove('fa-xmark');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
});

// ==========================================
// PREMIUM GRAPHENE / HEXAGON INTERACTIVE BACKGROUND
// (Combines Nanoscience + Cybersecurity Themes)
// ==========================================
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouse = { x: -1000, y: -1000, radius: 250 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}, {passive: true});
window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}, {passive: true});
window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

// Hexagon layout math
let hexRadius = 40;
let dx = hexRadius * Math.sqrt(3);
let dy = hexRadius * 1.5;
let columns, rows;

function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.ceil(width / dx) + 2;
    rows = Math.ceil(height / dy) + 2;
}

initCanvas();
window.addEventListener('resize', initCanvas);

// Draw a single flat-topped hexagon
function drawHexagon(x, y, r, strokeStyle, fillStyle) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        // Flat top hexagon math (-30 degrees offset)
        let angle = (60 * i - 30) * Math.PI / 180;
        let pX = x + r * Math.cos(angle);
        let pY = y + r * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(pX, pY);
        } else {
            ctx.lineTo(pX, pY);
        }
    }
    ctx.closePath();
    
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
}

let tick = 0;

function animateHexagons() {
    requestAnimationFrame(animateHexagons);
    ctx.clearRect(0, 0, width, height);
    tick += 0.02;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            
            // Calculate center point of the current hexagon
            let x = col * dx + (row % 2 === 1 ? dx / 2 : 0);
            let y = row * dy;
            
            // Mouse Interaction Logic
            let dist = Math.hypot(mouse.x - x, mouse.y - y);
            
            // Default almost invisible state
            let lineAlpha = 0.02; 
            let fillAlpha = 0;
            
            // 1) Flashlight effect from mouse
            if (dist < mouse.radius) {
                let intensity = 1 - (dist / mouse.radius);
                // Ease out the interpolation for a smoother glow curve
                let easeIntensity = intensity * intensity;
                lineAlpha = 0.02 + (easeIntensity * 0.4);
                fillAlpha = easeIntensity * 0.08;
            }
            
            // 2) Ambient Data Flow effect (Soft sine wave pulses traveling across grid)
            let noise = Math.sin(tick + col * 0.5 + row * 0.3) + Math.cos(tick*0.8 + row*0.1);
            if (noise > 1.8) {
                let pulseAlpha = (noise - 1.8) * 0.5;
                fillAlpha = Math.max(fillAlpha, pulseAlpha * 0.2);
                lineAlpha = Math.max(lineAlpha, pulseAlpha);
            }

            // Render
            ctx.lineWidth = 1;
            drawHexagon(
                x, y, 
                hexRadius - 1, // Subtract 1 for subtle gap between hexes
                `rgba(0, 240, 255, ${lineAlpha})`, 
                fillAlpha > 0 ? `rgba(0, 240, 255, ${fillAlpha})` : null
            );
        }
    }
}

animateHexagons();
