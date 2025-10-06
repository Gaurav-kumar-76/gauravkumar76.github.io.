// Global variables
let particlesArray = [];
let animationId;

// TG-ULTRON Player Data
const playerData = {
    gamerTag: "TG-ULTRON",
    freeFireID: "2813958275",
    level: 71,
    guild: "SOULMATES!",
    role: "Fighter • Rusher • Level 71",
    logo: "🥊",
    bio: "Elite Free Fire fighter dominating battlegrounds with 3,757 matches and 8,185 eliminations! My 2.62 K/D ratio and 38.89% Top 3 rate speak for themselves. With 1,461 top 3 finishes and a record 19 eliminations in a single match, I bring the heat to every squad. Average survival time: 11:36 - I fight smart and fight hard!",
    voiceNote: "Ready to fight! Add me for epic battles!",
    stats: {
        games: 3757,
        wins: 637,
        winRate: "16.96%",
        eliminations: 8185,
        top3: 1461,
        top3Rate: "38.89%",
        kdRatio: "2.62",
        avgDistance: "4.41 KM",
        avgSurvival: "11:36",
        helpUps: 2328,
        highestKills: 19,
        avgDamage: 1285
    },
    socialLinks: {
        discord: "TG-ULTRON#1234",
        instagram: "https://www.instagram.com/arise_abhiii_?igsh=eTU1bWQxOWp3ZmU2",
        instagram_handle: "@arise_abhiii_",
        youtube: "TG-ULTRON Gaming",
        whatsapp: "+91 8864084619",
        whatsapp_link: "https://wa.me/918864084619"
    }
};

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const voiceBtn = document.getElementById('voice-btn');
const particlesBg = document.getElementById('particles-bg');

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    setupNavigation();
    createParticleSystem();
    setupScrollAnimations();
    setupStatsAnimations();
    setupFilterSystem();
    setupVoiceNote();
    setupBackToTop();
    
    // Start particle animation
    animateParticles();
    
    // Initial scroll position check
    handleScroll();
}

// Navigation functionality
function setupNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        let offsetTop;
        
        // Special handling for home section to scroll to very top
        if (sectionId === 'home') {
            offsetTop = 0;
        } else {
            offsetTop = targetSection.offsetTop - 70; // Account for fixed nav height
        }
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Particle system for background animation
function createParticleSystem() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    particlesBg.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    function createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        particlesArray = [];

        for (let i = 0; i < particleCount; i++) {
            particlesArray.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                color: Math.random() > 0.5 ? '#00BFFF' : '#FF4500'
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesArray.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around screen
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;

            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        animationId = requestAnimationFrame(animateParticles);
    }

    createParticles();
    window.addEventListener('resize', createParticles);

    // Return the animate function to be called from initialize
    window.animateParticles = animateParticles;
}

// Scroll animations using Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger specific animations
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Observe individual cards and elements
    const cards = document.querySelectorAll('.glass-card, .stat-card, .badge');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Stats counter and progress bar animations
function setupStatsAnimations() {
    let statsAnimated = false;

    window.animateStats = function() {
        if (statsAnimated) return;
        statsAnimated = true;

        // Animate counters
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += step;
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        });

        // Animate progress bars
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 500);
        });
    };
}

// Filter system for highlights
function setupFilterSystem() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const highlightCards = document.querySelectorAll('.highlight-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            highlightCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add click handlers for video cards
    highlightCards.forEach(card => {
        card.addEventListener('click', function() {
            // Simulate video play - in real implementation, this would open a modal or redirect
            const playBtn = this.querySelector('.play-btn');
            if (playBtn) {
                playBtn.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    playBtn.style.transform = 'scale(1)';
                }, 200);
            }

            // Add pulse effect
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'pulse 0.6s ease';
            
            // Show play notification
            showNotification('🎬 Playing TG-ULTRON highlight!');
        });
    });
}

// Voice note functionality
function setupVoiceNote() {
    if (!voiceBtn) return;
    
    let isPlaying = false;

    voiceBtn.addEventListener('click', function() {
        if (!isPlaying) {
            isPlaying = true;
            this.classList.add('playing');
            
            // Simulate voice note playing
            const icon = this.querySelector('.voice-icon');
            const text = this.querySelector('span');
            
            if (text) text.textContent = `Playing: "${playerData.voiceNote}"`;
            if (icon) icon.style.animation = 'pulse 0.5s infinite';

            // Reset after 3 seconds (duration of voice note)
            setTimeout(() => {
                isPlaying = false;
                this.classList.remove('playing');
                if (text) text.textContent = 'Play Voice Note';
                if (icon) icon.style.animation = 'pulse 2s infinite';
            }, 3000);
        }
    });
}

// Back to top functionality
function setupBackToTop() {
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            scrollToSection('home');
        });
    }
}

// Handle scroll events
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Show/hide back to top button
    if (backToTop) {
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Add scroll effect to navigation
    const nav = document.querySelector('.nav');
    if (nav) {
        if (scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
        }
    }
    
    // Update active nav link based on current section
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = 'home';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const offset = 100; // Account for nav height
        
        if (rect.top <= offset && rect.bottom > offset) {
            currentSection = section.id;
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Scroll event listener
window.addEventListener('scroll', handleScroll);

// Card tilt effect for desktop
function setupCardTiltEffect() {
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.glass-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
}

// Social link interactions
function setupSocialInteractions() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for actual links
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                return; // Let the browser handle the navigation
            }
            
            e.preventDefault();
            
            // Get platform and handle for copy notification
            const platform = this.querySelector('.social-platform')?.textContent || 'Social';
            const handle = this.querySelector('.social-handle')?.textContent || 'Handle';
            
            // Show copy notification
            showNotification(`${platform}: ${handle} - Contact info ready!`);
        });
    });
}

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #00BFFF, #8A2BE2);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
        max-width: 300px;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 191, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .nav-link.active {
        color: var(--electric-blue) !important;
        text-shadow: 0 0 10px var(--electric-blue) !important;
    }
`;
document.head.appendChild(style);

// Add hover effects for buttons
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
}

// Fighter-themed interactions
function setupFighterEffects() {
    // Add punch effect to fighter icons
    const fighterIcons = document.querySelectorAll('.fighter-icon, .avatar-text');
    
    fighterIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(-15deg)';
            this.style.transition = '0.1s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.transition = '0.3s ease';
            }, 100);
            
            showNotification('🥊 Ready to fight!');
        });
    });

    // Add special effects for achievement badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('click', function() {
            const badgeText = this.querySelector('.badge-text')?.textContent || 'Achievement';
            showNotification(`🏆 Achievement: ${badgeText}`);
            
            // Add glow effect
            this.style.boxShadow = '0 0 20px rgba(0, 191, 255, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 1000);
        });
    });
}

// Copy Free Fire ID functionality
function setupIDCopy() {
    const idDisplay = document.querySelector('.ff-id-display');
    const qrCode = document.querySelector('.qr-placeholder');
    
    if (idDisplay) {
        idDisplay.addEventListener('click', function() {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(playerData.freeFireID).then(() => {
                    showNotification(`🎮 Free Fire ID ${playerData.freeFireID} copied!`);
                });
            } else {
                showNotification(`🎮 Free Fire ID: ${playerData.freeFireID}`);
            }
        });
        
        // Add cursor pointer
        idDisplay.style.cursor = 'pointer';
    }
    
    if (qrCode) {
        qrCode.addEventListener('click', function() {
            showNotification(`📱 Scan QR to add ${playerData.gamerTag} in-game!`);
        });
        
        qrCode.style.cursor = 'pointer';
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll handler
window.addEventListener('scroll', throttle(handleScroll, 16));

// Initialize additional effects after a short delay
setTimeout(() => {
    setupCardTiltEffect();
    setupSocialInteractions();
    setupButtonEffects();
    setupFighterEffects();
    setupIDCopy();
}, 500);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
    
    // Arrow keys for section navigation
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        navigateToNextSection();
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        navigateToPrevSection();
    }
});

// Section navigation helpers
function navigateToNextSection() {
    const sections = ['home', 'about', 'stats', 'highlights', 'guild', 'connect'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    scrollToSection(sections[nextIndex]);
}

function navigateToPrevSection() {
    const sections = ['home', 'about', 'stats', 'highlights', 'guild', 'connect'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    scrollToSection(sections[prevIndex]);
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let current = 'home';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            current = section.id;
        }
    });
    
    return current;
}

// Lazy loading for better performance
function setupLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-src]');
    
    if (lazyElements.length > 0) {
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                    lazyLoadObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(element => {
            lazyLoadObserver.observe(element);
        });
    }
}

// Initialize lazy loading
setupLazyLoading();

// Cleanup function for page unload
window.addEventListener('beforeunload', function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

// Export functions for global access
window.scrollToSection = scrollToSection;

// Console message for developers
console.log(`
🥊 TG-ULTRON Fighter Portfolio Website
🔥 Cyberpunk Fighter Theme Active
⚡ All systems operational
📱 Mobile responsive design enabled
🎯 Performance optimized
🔧 Fighter effects enabled

Built with passion for Free Fire esports!
Fighter ID: ${playerData.freeFireID}
Guild: ${playerData.guild}
K/D: ${playerData.stats.kdRatio}
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                console.log(`⚡ TG-ULTRON site loaded in ${loadTime}ms`);
            }
        }, 0);
    });
}