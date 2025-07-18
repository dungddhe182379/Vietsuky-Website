// Courses slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Page transition effect (similar to index.html)
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        // Check if this is a direct page load or navigation
        const isDirectLoad = !document.referrer || !document.referrer.includes(window.location.hostname);
        
        if (isDirectLoad) {
            // Direct load - show immediately with class for styling
            pageContent.classList.add('direct-load');
        } else {
            // Navigation from another page - show with transition
            setTimeout(() => {
                pageContent.classList.add('show');
            }, 100);
        }
    }
    
    // Header visibility on page load (copied from main.js)
    const header = document.querySelector('.header');
    if (header) {
        setTimeout(() => {
            header.classList.add('header-visible');
        }, 100);
    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            }
        });
    }

    // Courses slider functionality with seamless loop
    const coursesContainer = document.querySelector('.courses-container');
    const originalCards = document.querySelectorAll('.course-card');
    
    if (!coursesContainer || originalCards.length === 0) return;
    
    // Create seamless infinite loop by duplicating cards
    function createInfiniteLoop() {
        // Clear existing duplicates
        const existingDuplicates = coursesContainer.querySelectorAll('.course-card[data-duplicate]');
        existingDuplicates.forEach(card => card.remove());
        
        // Clone original cards and append them
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('data-duplicate', 'true');
            coursesContainer.appendChild(clone);
        });
        
        // Set up hover effects for all cards (original + clones)
        setupHoverEffects();
    }

    // Setup hover effects for all cards
    function setupHoverEffects() {
        const allCards = coursesContainer.querySelectorAll('.course-card');
        allCards.forEach(card => {
            // Remove existing event listeners to prevent duplicates
            card.removeEventListener('mouseenter', cardHoverIn);
            card.removeEventListener('mouseleave', cardHoverOut);
            
            // Add event listeners
            card.addEventListener('mouseenter', cardHoverIn);
            card.addEventListener('mouseleave', cardHoverOut);
        });
    }

    // Card hover in effect
    function cardHoverIn() {
        const content = this.querySelector('.card-content');
        const overlay = this.querySelector('.card-overlay');
        const img = this.querySelector('.card-image img');
        
        // Show content
        if (content) {
            content.style.transform = 'translateY(0)';
            content.style.opacity = '1';
        }
        
        // Change overlay to yellow
        if (overlay) {
            overlay.style.background = 'linear-gradient(to bottom, rgba(252, 194, 74, 0.2) 0%, rgba(252, 194, 74, 0.6) 50%, rgba(252, 194, 74, 0.9) 100%)';
        }
        
        // Remove grayscale and scale image
        if (img) {
            img.style.filter = 'grayscale(0%) brightness(1)';
            img.style.transform = 'scale(1.1)';
        }
    }

    // Card hover out effect - Reset to grayscale state
    function cardHoverOut() {
        const content = this.querySelector('.card-content');
        const overlay = this.querySelector('.card-overlay');
        const img = this.querySelector('.card-image img');
        
        // Reset content to hidden state
        if (content) {
            content.style.transform = 'translateY(30px)';
            content.style.opacity = '0';
        }
        
        // Reset overlay to dark state
        if (overlay) {
            overlay.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.8) 100%)';
        }
        
        // Reset image to grayscale
        if (img) {
            img.style.filter = 'grayscale(100%) brightness(0.7)';
            img.style.transform = 'scale(1)';
        }
    }

    // Function to reset all cards to grayscale state
    function resetAllCardsToGrayscale() {
        const allCards = coursesContainer.querySelectorAll('.course-card');
        allCards.forEach(card => {
            // Skip cards that are currently being hovered
            if (!card.matches(':hover')) {
                cardHoverOut.call(card);
            }
        });
    }

    // Initialize infinite loop
    createInfiniteLoop();
    
    // Reset all cards to grayscale state initially
    setTimeout(() => {
        resetAllCardsToGrayscale();
    }, 100);
    
    // Reset cards periodically to ensure they stay in grayscale state
    setInterval(() => {
        resetAllCardsToGrayscale();
    }, 5000); // Reset every 5 seconds
    
    // Pause animation when hovering over container
    coursesContainer.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    // Resume animation and reset cards when mouse leaves container
    coursesContainer.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        // Reset all cards after a short delay to ensure smooth transition
        setTimeout(() => {
            resetAllCardsToGrayscale();
        }, 100);
    });

    // Handle responsive behavior
    function handleResize() {
        if (window.innerWidth <= 768) {
            coursesContainer.style.animation = 'none';
            coursesContainer.style.overflowX = 'auto';
            coursesContainer.style.scrollBehavior = 'smooth';
        } else {
            coursesContainer.style.animation = 'slideShow 5s infinite linear'; /* Tăng tốc gấp 3 lần */
            coursesContainer.style.overflowX = 'visible';
        }
    }

    // Initial resize check
    handleResize();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
});
