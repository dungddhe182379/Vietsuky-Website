// Main JavaScript for Viet Su Ky Website
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
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
    
    // Pricing card interactions
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('.plan-name').textContent;
            const planPrice = card.querySelector('.price').textContent;
            
            alert(`Bạn đã chọn gói: ${planName} - Giá: ${planPrice}`);
            
            // Add animation effect
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Feedback interactions
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.feedback-card');
            const authorName = card.querySelector('.author-name').textContent;
            alert(`Đọc thêm câu chuyện của ${authorName}...`);
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
                const increment = finalValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(counter);
                    }
                    
                    stat.textContent = Math.floor(currentValue).toLocaleString();
                }, 30);
            });
        }
    }
    
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
    
    // Auth button interactions
    const loginBtn = document.querySelector('.auth-buttons .btn-primary');
    const signupBtn = document.querySelector('.auth-buttons .btn-outline');
    
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
    
    // View All feedback button
    const viewAllBtn = document.querySelector('.feedback-header .btn');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Xem tất cả phản hồi...');
        });
    }
});
