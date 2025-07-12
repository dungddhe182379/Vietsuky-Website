// Page Transition Manager - Production Version
class PageTransition {
    constructor() {
        this.isNavigating = false;
        this.init();
    }

    init() {
        // Reset navigation state
        this.isNavigating = false;
        
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
                // Reset navigation state after page fully loads
                setTimeout(() => {
                    this.isNavigating = false;
                }, 1000);
            });
        } else {
            // Direct page load, hide loader immediately
            this.hideLoaderImmediately();
            // Ensure navigation state is reset
            this.isNavigating = false;
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
                
                // Update both width and text
                progressBar.style.width = progress + '%';
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
            progressBar.style.width = progress + '%';
            progressPercentage.textContent = Math.round(progress) + '%';

            const progressInterval = setInterval(() => {
                progress += increment;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(progressInterval);
                }
                
                // Update both width and text
                progressBar.style.width = progress + '%';
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
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        }
        
        // Ensure body is visible
        document.body.style.opacity = '1';
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
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        }
        
        // Ensure body is visible
        document.body.style.opacity = '1';
    }

    navigateToPage(url, buttonElement = null) {
        // Prevent multiple simultaneous navigations
        if (this.isNavigating) return;
        
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
        // Prevent multiple handlers on same elements
        if (this.handlersAdded) return;
        this.handlersAdded = true;

        // Generic navigation handler for all data-navigate elements
        const navigateElements = document.querySelectorAll('[data-navigate]');
        
        navigateElements.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.isNavigating) return;
                this.isNavigating = true;
                
                const navigateType = element.getAttribute('data-navigate');
                let targetUrl = '';
                
                // Determine target URL based on navigation type
                switch(navigateType) {
                    case 'login':
                        targetUrl = 'login.html';
                        break;
                    case 'home':
                        targetUrl = 'index.html';
                        break;
                    default:
                        // Use href if available, otherwise use navigate type as filename
                        targetUrl = element.href || `${navigateType}.html`;
                        break;
                }
                
                this.navigateToPage(targetUrl, element);
            }, true); // Use capturing phase
        });

        // Handle form submissions with transitions (for any form with data-navigate-to attribute)
        const formsWithTransition = document.querySelectorAll('form[data-navigate-to]');
        
        formsWithTransition.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.isNavigating) return;
                this.isNavigating = true;
                
                const targetUrl = form.getAttribute('data-navigate-to');
                const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                
                if (submitButton) {
                    submitButton.classList.add('btn-loading');
                    const originalText = submitButton.innerHTML;
                    submitButton.innerHTML = '<span>' + originalText + '</span>';
                }

                // Simulate form processing time
                setTimeout(() => {
                    sessionStorage.setItem('isNavigating', 'true');
                    sessionStorage.setItem('navigationStartTime', Date.now().toString());
                    
                    this.showLoader();
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 1000);
                }, 1500);
            });
        });
    }
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Clear any stuck navigation state on fresh page load
    const lastNavigation = sessionStorage.getItem('navigationStartTime');
    if (lastNavigation) {
        const timeSinceNavigation = Date.now() - parseInt(lastNavigation);
        // If more than 10 seconds have passed, clear navigation state
        if (timeSinceNavigation > 10000) {
            sessionStorage.removeItem('isNavigating');
            sessionStorage.removeItem('navigationStartTime');
        }
    }
    
    // Wait for other scripts to load, then initialize
    setTimeout(() => {
        window.pageTransitionInstance = new PageTransition();
    }, 200);
});

// Fallback navigation for critical links (in case of conflicts)
document.addEventListener('click', function(e) {
    const element = e.target.closest('[data-navigate]');
    if (element && !window.pageTransitionInstance) {
        e.preventDefault();
        
        const navigateType = element.getAttribute('data-navigate');
        let targetUrl = '';
        
        switch(navigateType) {
            case 'login':
                targetUrl = 'login.html';
                break;
            case 'home':
                targetUrl = 'index.html';
                break;
            default:
                targetUrl = element.href || `${navigateType}.html`;
                break;
        }
        
        window.location.href = targetUrl;
    }
}, true);

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
