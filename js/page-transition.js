// Page Transition Manager
class PageTransition {
    constructor() {
        this.isNavigating = false;
        this.init();
    }

    init() {
        // Check if we're coming from a navigation
        const isFromNavigation = sessionStorage.getItem('isNavigating');
        const navigationStartTime = sessionStorage.getItem('navigationStartTime');
        
        if (isFromNavigation === 'true') {
            // We're coming from navigation
            sessionStorage.removeItem('isNavigating');
            sessionStorage.removeItem('navigationStartTime');
            
            // Calculate elapsed time and continue progress
            const elapsed = navigationStartTime ? Date.now() - parseInt(navigationStartTime) : 0;
            const startProgress = Math.min((elapsed / 2000) * 100, 90); // Max 90% from previous page
            
            this.continueProgressAnimation(startProgress);
            
            window.addEventListener('load', () => {
                this.hideLoader();
            });
        } else {
            // Direct page load, hide loader immediately
            this.hideLoaderImmediately();
        }

        // Add click handlers for navigation
        this.addNavigationHandlers();
    }

    startProgressAnimation() {
        const progressBar = document.querySelector('.progress-bar');
        const progressPercentage = document.querySelector('.progress-percentage');
        
        if (progressBar && progressPercentage) {
            let progress = 0;
            const duration = 2000; // 2 seconds
            const increment = 100 / (duration / 50); // Update every 50ms

            const progressInterval = setInterval(() => {
                progress += increment;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(progressInterval);
                }
                
                progressPercentage.textContent = Math.round(progress) + '%';
            }, 50);
        }
    }

    continueProgressAnimation(startProgress = 0) {
        const progressBar = document.querySelector('.progress-bar');
        const progressPercentage = document.querySelector('.progress-percentage');
        
        if (progressBar && progressPercentage) {
            let progress = startProgress;
            const duration = 1500; // Reduced duration for continuation
            const increment = (100 - startProgress) / (duration / 50);

            // Set initial progress
            progressPercentage.textContent = Math.round(progress) + '%';

            const progressInterval = setInterval(() => {
                progress += increment;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(progressInterval);
                }
                
                progressPercentage.textContent = Math.round(progress) + '%';
            }, 50);
        }
    }

    showLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.remove('fade-out');
            loader.style.display = 'flex';
            
            // Reset progress
            const progressPercentage = loader.querySelector('.progress-percentage');
            if (progressPercentage) {
                progressPercentage.textContent = '0%';
            }
            
            // Start progress animation
            this.startProgressAnimation();
        }
    }

    hideLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            // Ensure progress reaches 100% before hiding
            const progressPercentage = loader.querySelector('.progress-percentage');
            if (progressPercentage) {
                progressPercentage.textContent = '100%';
            }

            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 500);
        }

        // Show page content
        const pageContent = document.querySelector('.page-content');
        if (pageContent) {
            pageContent.classList.add('show');
        }
    }

    hideLoaderImmediately() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.style.display = 'none';
        }

        // Show page content immediately
        const pageContent = document.querySelector('.page-content');
        if (pageContent) {
            pageContent.classList.add('show');
        }
    }

    navigateToPage(url, buttonElement = null) {
        // Set navigation flag and current progress
        sessionStorage.setItem('isNavigating', 'true');
        sessionStorage.setItem('navigationStartTime', Date.now().toString());
        
        // Add loading state to button if provided
        if (buttonElement) {
            buttonElement.classList.add('btn-loading');
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = '<span>' + originalText + '</span>';
        }

        // Show loader
        this.showLoader();

        // Navigate after a short delay
        setTimeout(() => {
            window.location.href = url;
        }, 1200);
    }

    addNavigationHandlers() {
        // Handle login button clicks
        const loginButtons = document.querySelectorAll('[data-navigate="login"]');
        loginButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToPage('login.html', button);
            });
        });

        // Handle home navigation (logo clicks, etc.)
        const homeButtons = document.querySelectorAll('[data-navigate="home"]');
        homeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToPage('index.html', button);
            });
        });

        // Handle form submissions with transitions
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Set navigation flag and start time
                sessionStorage.setItem('isNavigating', 'true');
                sessionStorage.setItem('navigationStartTime', Date.now().toString());
                
                const submitButton = loginForm.querySelector('.login-btn');
                submitButton.classList.add('btn-loading');
                submitButton.innerHTML = '<span>Đăng nhập</span>';

                // Simulate login process
                setTimeout(() => {
                    this.showLoader();
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }, 1500);
            });
        }
    }
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', () => {
    new PageTransition();
});

// Smooth scroll for internal links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});
