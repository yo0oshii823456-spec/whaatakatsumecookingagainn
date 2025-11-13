// Smooth scroll and interaction effects
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle different button actions
            if (buttonText === 'Home') {
                hideAllSections();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (buttonText === '🛒 Shopping' || buttonText === 'Our Goods') {
                hideAllSections();
                scrollToProducts();
            } else if (buttonText === 'About Us') {
                hideAllSections();
                showSection('about-us');
            } else if (buttonText === 'Services') {
                hideAllSections();
                showSection('services');
            } else if (buttonText === 'Contact Us') {
                hideAllSections();
                showSection('contact-us');
            }
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show notification
            showNotification(`${productName} added to cart! (${productPrice})`);
            
            // Add pulse effect to shopping button
            const shoppingBtn = document.querySelector('.shopping-btn');
            shoppingBtn.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                shoppingBtn.style.animation = '';
            }, 500);
        });
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Enhanced aurora effect on mouse move with smooth interpolation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', function(e) {
        targetX = e.clientX / window.innerWidth;
        targetY = e.clientY / window.innerHeight;
    });
    
    // Smooth aurora movement with easing
    function updateAurora() {
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;
        
        const aurora = document.querySelector('.aurora-background');
        if (aurora) {
            const xOffset = (mouseX - 0.5) * 30;
            const yOffset = (mouseY - 0.5) * 30;
            aurora.style.backgroundPosition = `${50 + xOffset}% ${50 + yOffset}%, ${50 - xOffset}% ${50 - yOffset}%, ${50 + xOffset * 0.5}% ${50 - yOffset * 0.5}%, ${50 - xOffset * 0.5}% ${50 + yOffset * 0.5}%, 0% 0%`;
        }
        requestAnimationFrame(updateAurora);
    }
    updateAurora();
});

// Show section function
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Trigger fade-in animation
        const panel = section.querySelector('.glass-panel');
        if (panel) {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(30px)';
            setTimeout(() => {
                panel.style.transition = 'all 0.6s ease';
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, 10);
        }
    }
}

// Hide all sections function
function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
}

// Smooth scroll to products section
function scrollToProducts() {
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Notification system
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #ffffff;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for ripple and pulse animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

