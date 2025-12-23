/**
 * 🚀 FUTURISTIC CV - Interactive Script
 * 42 School Inspired Design
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.getElementById('navLinks').classList.remove('active');
                document.getElementById('hamburger').classList.remove('active');
            }
        });
    });

    // ============================================
    // NAVBAR HIDE/SHOW ON SCROLL
    // ============================================
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100;
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress Bar
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }

        // Back to Top Button
        if (backToTop) {
            if (scrollTop > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Navbar stays fixed - no hide/show

        // Active Section Highlight
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });

        lastScrollTop = scrollTop;
    });

    // Back to Top Click Handler
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
        observer.observe(item);
    });

    // Observe cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach((cat, index) => {
        cat.style.opacity = '0';
        cat.style.transform = 'translateY(30px)';
        cat.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(cat);
    });

    // ============================================
    // TYPING EFFECT FOR HERO GREETING
    // ============================================
    const heroGreeting = document.querySelector('.hero-greeting');
    if (heroGreeting) {
        const originalText = heroGreeting.textContent;
        heroGreeting.textContent = '';
        heroGreeting.style.opacity = '1';

        let charIndex = 0;
        const typeText = () => {
            if (charIndex < originalText.length) {
                heroGreeting.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 50);
            }
        };

        // Start typing after a delay
        setTimeout(typeText, 500);
    }

    // ============================================
    // CURSOR GLOW EFFECT (Optional)
    // ============================================
    const createGlowCursor = () => {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(glow);

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateGlow = () => {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;
            glow.style.left = glowX + 'px';
            glow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        };

        animateGlow();
    };

    // Enable glow cursor on desktop
    if (window.innerWidth > 768) {
        createGlowCursor();
    }

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroSection = document.querySelector('.hero-section');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c⚡ HALIT YAKICI', 'font-size: 24px; font-weight: bold; color: #00f5ff; text-shadow: 0 0 10px #00f5ff;');
    console.log('%cEndüstri Mühendisi & Yazılım Geliştirici', 'font-size: 14px; color: #ff00ff;');
    console.log('%c> system.ready()', 'font-size: 12px; color: #00ff88; font-family: monospace;');

    // ============================================
    // 42 EASTER EGG - Click Counter
    // ============================================
    const heroName = document.querySelector('.hero-name');
    let clickCount = 0;
    let easterEggActive = false;
    const targetClicks = 42;

    if (heroName) {
        heroName.addEventListener('click', () => {
            if (easterEggActive) return;

            clickCount++;

            // Show progress in console
            if (clickCount % 10 === 0) {
                console.log(`%c> click_count: ${clickCount}/${targetClicks}`, 'color: #00f5ff; font-family: monospace;');
            }

            // Trigger Easter Egg at 42 clicks
            if (clickCount >= targetClicks) {
                triggerEasterEgg();
                clickCount = 0; // Reset counter
            }
        });
    }

    function triggerEasterEgg() {
        easterEggActive = true;
        const originalText = heroName.textContent;

        // Console celebration
        console.log('%c🎉 EASTER EGG ACTIVATED!', 'font-size: 20px; color: #00ff88; font-weight: bold;');
        console.log('%c> ./42 --secret --mode=glitch', 'color: #ff00ff; font-family: monospace;');

        // Phase 1: Initial Glitch (0.5s)
        heroName.classList.add('easter-egg-active');

        // Create screen glitch overlay
        const glitchOverlay = document.createElement('div');
        glitchOverlay.className = 'glitch-overlay';
        document.body.appendChild(glitchOverlay);

        // Phase 2: Show "42" after initial glitch
        setTimeout(() => {
            heroName.textContent = '42';

            // Create floating 42 element with separate digits
            const easter42 = document.createElement('div');
            easter42.className = 'easter-egg-42';

            // Create separate spans for 4 and 2
            const digit4 = document.createElement('span');
            digit4.className = 'digit digit-4';
            digit4.textContent = '4';

            const digit2 = document.createElement('span');
            digit2.className = 'digit digit-2';
            digit2.textContent = '2';

            easter42.appendChild(digit4);
            easter42.appendChild(digit2);
            document.body.appendChild(easter42);

        }, 500);

        // Phase 3: Start exit animation (after 2 seconds)
        setTimeout(() => {
            const easter42 = document.querySelector('.easter-egg-42');
            if (easter42) {
                easter42.classList.add('exit');
            }
        }, 2000);

        // Phase 4: Glitch back to original
        setTimeout(() => {
            // Remove floating 42
            const easter42 = document.querySelector('.easter-egg-42');
            if (easter42) {
                easter42.remove();
            }

            // Restore original text with glitch
            heroName.textContent = originalText;

        }, 2500);

        // Phase 5: Clean up
        setTimeout(() => {
            heroName.classList.remove('easter-egg-active');
            glitchOverlay.remove();
            easterEggActive = false;

            console.log('%c> system.restored()', 'color: #00ff88; font-family: monospace;');
        }, 3000);
    }
});
