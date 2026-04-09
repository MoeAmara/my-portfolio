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
        typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typeSpeed = 50; 
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typeSpeed = 100; 
    }
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeSpeed = 500; 
    }
    
    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1500); 
    
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

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
});

// ==========================================
// ELITE CYBER CIRCUIT BOARD (INTERACTIVE & READABLE)
// ==========================================
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

// We add margin so parallax doesn't show sharp edges
const overflowMargin = 100;
let width, height;
let traces = [];
const gridSize = 25; 
let mouse = { x: -1000, y: -1000 };

// Apply a default opacity style to dim the canvas for text readability
canvas.style.opacity = '0.35';
canvas.style.left = '0px';
canvas.style.top = '0px';
canvas.style.transform = 'none';

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    traces = [];
    spawnTraces((width * height) / 10000); // Higher density 
}

function spawnTraces(num) {
    for(let i=0; i<num; i++) {
        traces.push({
            x: Math.floor((Math.random() * width) / gridSize) * gridSize,
            y: Math.floor((Math.random() * height) / gridSize) * gridSize,
            length: 0,
            maxLength: Math.random() * 40 + 20,
            dirX: Math.random() > 0.5 ? 1 : -1,
            dirY: Math.random() > 0.5 ? 0 : (Math.random() > 0.5 ? 1 : -1),
            active: true,
            color: Math.random() > 0.75 ? '#00e5ff' : '#00ff41',
            speedMultiplier: (Math.random() * 0.3) + 0.2
        });
    }
}

initCanvas();
window.addEventListener('resize', initCanvas);

let lastTime = 0;
const fps = 40;
const interval = 1000 / fps;

function drawCircuit(timestamp) {
    requestAnimationFrame(drawCircuit);
    
    const deltaTime = timestamp - lastTime;
    if (deltaTime < interval) return;
    lastTime = timestamp - (deltaTime % interval);

    // Fade to create trails (True AMOLED Black fade)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < traces.length; i++) {
        let t = traces[i];
        if (!t.active) continue;

        let oldX = t.x;
        let oldY = t.y;

        t.x += t.dirX * (gridSize * t.speedMultiplier);
        t.y += t.dirY * (gridSize * t.speedMultiplier);
        t.length++;

        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = t.color;
        ctx.lineWidth = 1.5;
        // Turn off heavy blur to keep it sharp and not glaring
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Traces become hyper-active and likely to turn if near mouse
        let distToTarget = Math.hypot(t.x - mouse.x, t.y - mouse.y);
        let turnProbability = distToTarget < 300 ? 0.3 : 0.85; // 70% chance to turn if close, 15% if far

        if (Math.random() > turnProbability) {
            let possibleDirs = [
                {x: 1, y: 0}, {x: -1, y: 0}, 
                {x: 0, y: 1}, {x: 0, y: -1},
                {x: 1, y: 1}, {x: -1, y: -1},
                {x: 1, y: -1}, {x: -1, y: 1}
            ];
            possibleDirs = possibleDirs.filter(d => !(d.x === -t.dirX && d.y === -t.dirY));
            
            let newDir;
            
            // AGGRESSIVE ROUTING: Traces heavily target the mouse
            if (mouse.x > 0 && mouse.y > 0) {
                possibleDirs.sort((a, b) => {
                    let d1 = Math.hypot((t.x + a.x*gridSize) - mouse.x, (t.y + a.y*gridSize) - mouse.y);
                    let d2 = Math.hypot((t.x + b.x*gridSize) - mouse.x, (t.y + b.y*gridSize) - mouse.y);
                    return d1 - d2;
                });
                
                // 95% of the time, pick the absolute best path towards the mouse
                newDir = possibleDirs[Math.random() > 0.95 ? 1 : 0];
            } else {
                newDir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
            }
            
            t.dirX = newDir.x;
            t.dirY = newDir.y;
            
            ctx.beginPath();
            ctx.arc(t.x, t.y, 2.5, 0, Math.PI*2);
            ctx.fillStyle = t.color;
            ctx.fill();
        }

        if (t.length > t.maxLength || t.x < 0 || t.x > width || t.y < 0 || t.y > height) {
            t.active = false;
        }
    }

    traces = traces.filter(t => t.active);
    let targetTraces = (width * height) / 10000;
    if (traces.length < targetTraces && Math.random() > 0.3) {
        spawnTraces(2);
    }
}

requestAnimationFrame(drawCircuit);
