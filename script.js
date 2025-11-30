// Loading Animation
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 800);
});

// Navigation Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

function toggleMenu() {
    const lines = document.querySelectorAll('.line');
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    if (navLinks.classList.contains('active')) {
        // Line 1: rotate 45deg and move down
        lines[0].style.transform = "translateY(9px) rotate(45deg)";
        // Line 2: fade out
        lines[1].style.opacity = "0";
        // Line 3: rotate -45deg and move up
        lines[2].style.transform = "translateY(-9px) rotate(-45deg)";
    } else {
        // Reset to original state
        lines[0].style.transform = "none";
        lines[1].style.opacity = "1";
        lines[2].style.transform = "none";
    }
}

// Add event listeners
hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking on a nav link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Scroll Animation
function checkVisibility() {
    const elements = document.querySelectorAll('.stats-bar, .info-section, .pricing-section');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initial check
checkVisibility();

// Check on scroll (with throttling for performance)
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            checkVisibility();
            ticking = false;
        });
        ticking = true;
    }
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = "rgba(5, 10, 24, 0.95)";
        nav.style.backdropFilter = "blur(10px)";
    } else {
        nav.style.background = "rgba(5, 10, 24, 0.9)";
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to cards on hover
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn, .card-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn, .card-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);