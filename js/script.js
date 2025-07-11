// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        const currentSection = getCurrentSection();
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === '#' + currentSection || (href === '#' && currentSection === 'hero')) {
                link.classList.add('active');
            }
        });
    }
    
    function getCurrentSection() {
        let currentSection = 'hero';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.id || section.className.split(' ')[0];
            }
        });
        
        return currentSection;
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        const button = card.querySelector('.pricing-btn');
        
        button.addEventListener('click', function() {
            const planName = card.querySelector('.plan-name').textContent;
            const planPrice = card.querySelector('.price').textContent;
            
            // Show alert for demo purposes
            alert(`Bạn đã chọn gói: ${planName} - Giá: ${planPrice}`);
            
            // Add animation effect
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Feedback card interactions
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.feedback-card');
            const authorName = card.querySelector('.author-name').textContent;
            
            // Show full story modal (simplified version)
            alert(`Đọc thêm câu chuyện của ${authorName}...`);
        });
    });
    
    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Counter animation for achievements
    const statNumbers = document.querySelectorAll('.stat-number');
    let animationTriggered = false;
    
    function animateCounters() {
        if (animationTriggered) return;
        
        const achievementsSection = document.querySelector('.achievements');
        const rect = achievementsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animationTriggered = true;
            
            statNumbers.forEach(stat => {
                const finalValue = parseInt(stat.textContent.replace(/,/g, ''));
                let currentValue = 0;
                const increment = finalValue / 100;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(counter);
                    }
                    
                    stat.textContent = Math.floor(currentValue).toLocaleString();
                }, 20);
            });
        }
    }
    
    // Trigger counter animation on scroll
    window.addEventListener('scroll', animateCounters);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Mobile menu toggle (for responsive design)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.classList.add('mobile-menu-btn');
    mobileMenuButton.style.display = 'none';
    mobileMenuButton.style.background = 'none';
    mobileMenuButton.style.border = 'none';
    mobileMenuButton.style.fontSize = '24px';
    mobileMenuButton.style.cursor = 'pointer';
    
    // Insert mobile menu button
    const nav = document.querySelector('.nav');
    nav.parentNode.insertBefore(mobileMenuButton, nav);
    
    // Mobile menu functionality
    mobileMenuButton.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('mobile-active');
    });
    
    // Show/hide mobile menu button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuButton.style.display = 'block';
        } else {
            mobileMenuButton.style.display = 'none';
            document.querySelector('.nav-menu').classList.remove('mobile-active');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    
    // Login and Sign Up button interactions
    const loginBtn = document.querySelector('.btn-primary');
    const signupBtn = document.querySelector('.btn-outline');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Chức năng đăng nhập sẽ được phát triển sớm!');
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Chức năng đăng ký sẽ được phát triển sớm!');
        });
    }
    
    // View All button in feedback section
    const viewAllBtn = document.querySelector('.feedback-header .btn');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Xem tất cả phản hồi...');
        });
    }
});

// Add CSS for mobile menu
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            background-color: white;
            flex-direction: column;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: left 0.3s ease;
            padding: 20px 0;
        }
        
        .nav-menu.mobile-active {
            left: 0;
        }
        
        .nav-menu li {
            width: 100%;
            text-align: center;
        }
        
        .nav-link {
            display: block;
            padding: 15px 20px;
            width: 100%;
        }
        
        .mobile-menu-btn {
            display: block !important;
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);
