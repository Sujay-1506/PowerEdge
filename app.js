// PowerEdge Premium Website JavaScript
class PowerEdgeApp {
    constructor() {
        this.currentStep = 1;
        this.currentTestimonial = 0;
        this.testimonialCount = 2;
        this.isLoaded = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handlePageLoad();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.handleDOMLoaded();
        });

        window.addEventListener('load', () => {
            this.hideLoadingScreen();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handlePageLoad() {
        // Set minimum loading time
        setTimeout(() => {
            this.isLoaded = true;
            if (document.readyState === 'complete') {
                this.hideLoadingScreen();
            }
        }, 2000);
    }

    hideLoadingScreen() {
        if (!this.isLoaded) return;
        
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 600);
        }
        
        // Start animations after loading screen is hidden
        setTimeout(() => {
            this.startHeroAnimations();
        }, 300);
    }

    handleDOMLoaded() {
        this.setupNavigation();
        this.setupHeroSection();
        this.setupValuePropCards();
        this.setupTimeline();
        this.setupProductTabs();
        this.setupTestimonials();
        this.setupContactForm();
        this.setupScrollAnimations();
        this.setupBackToTop();
        this.setupTiltEffects();
        this.setupAllCTAButtons();
        
        console.log('🔋 PowerEdge website loaded successfully!');
    }

    // Navigation functionality
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        // Mobile navigation toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                this.animateHamburger(navToggle, navMenu.classList.contains('active'));
            });
        }

        // Smooth scrolling navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                    // Close mobile menu
                    if (navMenu) {
                        navMenu.classList.remove('active');
                        this.animateHamburger(navToggle, false);
                    }
                }
            });
        });

        // Active navigation highlighting
        this.setupActiveNavigation();
    }

    animateHamburger(toggle, isActive) {
        const spans = toggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (isActive) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current link
                    const currentLink = document.querySelector(`.nav__link[href="#${id}"]`);
                    if (currentLink) {
                        currentLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -70% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    smoothScrollTo(target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Hero section animations
    setupHeroSection() {
        this.setupTypewriterEffect();
        this.setupHeroButtons();
    }

    setupTypewriterEffect() {
        const typewriterElement = document.querySelector('.typewriter-text');
        if (!typewriterElement) return;

        const text = typewriterElement.getAttribute('data-text');
        if (!text) return;
        
        typewriterElement.textContent = '';

        let index = 0;
        const typeSpeed = 50;
        
        const typeWriter = () => {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            }
        };

        // Start typewriter effect after a delay
        setTimeout(() => {
            typeWriter();
        }, 500);
    }

    setupHeroButtons() {
        const heroButtons = document.querySelectorAll('.hero__buttons .btn');
        
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const buttonText = button.textContent.toLowerCase();
                
                if (buttonText.includes('technology') || buttonText.includes('explore')) {
                    this.scrollToSection('#products');
                } else if (buttonText.includes('talk') || buttonText.includes('experts')) {
                    this.scrollToSection('#contact');
                }
                
                // Add click animation
                this.addClickAnimation(button);
            });
        });
    }

    // Setup all CTA buttons throughout the site
    setupAllCTAButtons() {
        // Solution CTA button
        const solutionBtn = document.querySelector('.solution-cta .btn');
        if (solutionBtn) {
            solutionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.scrollToSection('#products');
                this.addClickAnimation(solutionBtn);
            });
        }

        // Navigation Schedule Demo button
        const navDemoBtn = document.querySelector('.nav__cta .btn');
        if (navDemoBtn) {
            navDemoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.scrollToSection('#contact');
                this.addClickAnimation(navDemoBtn);
            });
        }

        // All other demo/contact buttons
        const allButtons = document.querySelectorAll('button, .btn');
        allButtons.forEach(btn => {
            const text = btn.textContent.toLowerCase();
            if (text.includes('demo') || text.includes('schedule') || text.includes('talk') || text.includes('contact')) {
                btn.addEventListener('click', (e) => {
                    // Don't prevent default for form buttons
                    if (btn.type !== 'submit' && !btn.onclick && !btn.getAttribute('onclick')) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.scrollToSection('#contact');
                        this.addClickAnimation(btn);
                    }
                });
            }
        });
    }

    startHeroAnimations() {
        this.animateCounters();
        this.animateValueProps();
    }

    // Counter animations
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    
                    // Format number
                    let displayValue = current;
                    if (target >= 1000) {
                        displayValue = (current / 1000).toFixed(1);
                        if (displayValue.endsWith('.0')) {
                            displayValue = Math.floor(displayValue);
                        }
                        displayValue += 'K';
                    } else {
                        displayValue = Math.floor(current);
                    }
                    
                    counter.textContent = displayValue + suffix;
                    
                    if (current < target) {
                        requestAnimationFrame(updateCounter);
                    }
                } else {
                    let finalValue = target;
                    if (target >= 1000) {
                        finalValue = (target / 1000).toFixed(1);
                        if (finalValue.endsWith('.0')) {
                            finalValue = Math.floor(finalValue);
                        }
                        finalValue += 'K';
                    }
                    counter.textContent = finalValue + suffix;
                }
            };

            updateCounter();
        };

        // Intersection Observer to trigger when counters come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    setTimeout(() => {
                        animateCounter(entry.target);
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // Value proposition cards
    setupValuePropCards() {
        const cards = document.querySelectorAll('.value-prop-card');
        
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) rotateX(5deg) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(15, 23, 42, 0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                card.style.boxShadow = '';
            });
        });
    }

    animateValueProps() {
        const cards = document.querySelectorAll('.value-prop-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Timeline functionality
    setupTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.activateTimelineItem(entry.target);
                }
            });
        }, { threshold: 0.6 });

        timelineItems.forEach(item => {
            observer.observe(item);
            
            // Add click functionality
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.activateTimelineItem(item);
            });
        });

        // Update progress bar
        this.updateTimelineProgress();
    }

    activateTimelineItem(item) {
        // Remove active class from all items
        document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Update progress bar
        this.updateTimelineProgress();
    }

    updateTimelineProgress() {
        const activeItem = document.querySelector('.timeline-item.active');
        const allItems = document.querySelectorAll('.timeline-item');
        const progressBar = document.getElementById('timeline-progress');
        
        if (activeItem && progressBar) {
            const index = Array.from(allItems).indexOf(activeItem);
            const progress = ((index + 1) / allItems.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    // Product tabs - ENHANCED FIX
    setupProductTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const productContents = document.querySelectorAll('.product-content');

        console.log('Setting up product tabs:', tabButtons.length, 'buttons,', productContents.length, 'contents');

        // Ensure first tab is active by default
        if (tabButtons.length > 0 && productContents.length > 0) {
            tabButtons[0].classList.add('active');
            productContents[0].classList.add('active');
        }

        tabButtons.forEach((button, buttonIndex) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const productType = button.getAttribute('data-product');
                console.log('Product tab clicked:', productType, 'Button index:', buttonIndex);
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                productContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Find and activate the corresponding content
                const targetContent = document.getElementById(`product-${productType}`);
                console.log('Looking for content:', `product-${productType}`, 'Found:', !!targetContent);
                
                if (targetContent) {
                    targetContent.classList.add('active');
                    console.log('Content activated for:', productType);
                    
                    // Force a reflow to ensure the content is displayed
                    targetContent.style.display = 'grid';
                    setTimeout(() => {
                        targetContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                } else {
                    console.error('Could not find content for:', `product-${productType}`);
                    
                    // Fallback: activate content by index
                    if (productContents[buttonIndex]) {
                        productContents[buttonIndex].classList.add('active');
                        productContents[buttonIndex].style.display = 'grid';
                        console.log('Fallback: activated content by index:', buttonIndex);
                    }
                }
                
                // Add click animation
                this.addClickAnimation(button);
            });
        });

        // Debug: Log all product content IDs
        productContents.forEach((content, index) => {
            console.log('Product content', index, ':', content.id);
        });
    }

    // Testimonials carousel
    setupTestimonials() {
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        const dots = document.querySelectorAll('.dot');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showTestimonial(this.currentTestimonial - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showTestimonial(this.currentTestimonial + 1);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showTestimonial(index);
            });
        });

        // Auto-advance testimonials
        setInterval(() => {
            this.showTestimonial(this.currentTestimonial + 1);
        }, 5000);
    }

    showTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');

        // Wrap around
        if (index >= this.testimonialCount) index = 0;
        if (index < 0) index = this.testimonialCount - 1;

        // Remove active class from all testimonials and dots
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Add active class to current testimonial and dot
        if (testimonials[index]) testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        this.currentTestimonial = index;
    }

    // Contact form functionality - ENHANCED FIX
    setupContactForm() {
        const form = document.getElementById('contact-form');
        
        // Setup step navigation
        window.nextStep = () => this.nextFormStep();
        window.prevStep = () => this.prevFormStep();
        window.resetForm = () => this.resetContactForm();
        
        // Prevent form from causing unwanted scrolling
        if (form) {
            // Prevent default form submission behavior
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleFormSubmission(form);
            });

            // Prevent inputs from causing scroll jumps
            const formInputs = form.querySelectorAll('input, textarea, select');
            formInputs.forEach(input => {
                input.addEventListener('focus', (e) => {
                    e.stopPropagation();
                    // Prevent automatic scrolling on focus
                    setTimeout(() => {
                        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                });
                
                input.addEventListener('blur', (e) => {
                    e.stopPropagation();
                });
            });
        }

        // Real-time validation
        this.setupFormValidation();
        
        // Initialize first step
        this.showFormStep(1);
    }

    nextFormStep() {
        console.log('Next step clicked, current step:', this.currentStep);
        
        if (this.currentStep < 2) {
            // Validate current step
            if (this.validateCurrentStep()) {
                this.showFormStep(this.currentStep + 1);
            } else {
                console.log('Validation failed for step:', this.currentStep);
            }
        }
    }

    prevFormStep() {
        if (this.currentStep > 1) {
            this.showFormStep(this.currentStep - 1);
        }
    }

    showFormStep(step) {
        console.log('Showing form step:', step);
        
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));

        // Show current step
        const currentStepEl = document.getElementById(`step-${step}`);
        const stepIndicators = document.querySelectorAll('.step');
        const currentStepIndicator = stepIndicators[step - 1];

        if (currentStepEl) {
            currentStepEl.classList.add('active');
            currentStepEl.style.display = 'block';
            console.log('Step element activated:', step);
        } else {
            console.error('Could not find step element:', `step-${step}`);
        }
        
        if (currentStepIndicator) {
            currentStepIndicator.classList.add('active');
        }

        this.currentStep = step;
    }

    validateCurrentStep() {
        const currentStepEl = document.getElementById(`step-${this.currentStep}`);
        if (!currentStepEl) {
            console.error('Current step element not found:', this.currentStep);
            return false;
        }

        const requiredInputs = currentStepEl.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        console.log('Validating step', this.currentStep, 'with', requiredInputs.length, 'required fields');

        requiredInputs.forEach(input => {
            if (input.type === 'radio') {
                const radioGroup = currentStepEl.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    isValid = false;
                    this.showValidationError(input.closest('.radio-group') || input, 'Please select an option');
                    console.log('Radio validation failed:', input.name);
                } else {
                    this.clearValidationError(input.closest('.radio-group') || input);
                }
            } else if (!input.value.trim()) {
                isValid = false;
                this.showValidationError(input, 'This field is required');
                console.log('Required field empty:', input.name || input.id);
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                isValid = false;
                this.showValidationError(input, 'Please enter a valid email address');
                console.log('Email validation failed:', input.value);
            } else {
                this.clearValidationError(input);
            }
        });

        console.log('Step validation result:', isValid);
        return isValid;
    }

    setupFormValidation() {
        const inputs = document.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                e.stopPropagation();
                if (input.hasAttribute('required')) {
                    this.validateInput(input);
                }
            });

            input.addEventListener('input', (e) => {
                e.stopPropagation();
                this.clearValidationError(input);
            });
        });
    }

    validateInput(input) {
        if (input.hasAttribute('required') && !input.value.trim()) {
            this.showValidationError(input, 'This field is required');
            return false;
        }

        if (input.type === 'email' && input.value && !this.isValidEmail(input.value)) {
            this.showValidationError(input, 'Please enter a valid email address');
            return false;
        }

        this.clearValidationError(input);
        return true;
    }

    showValidationError(input, message) {
        input.style.borderColor = '#ef4444';
        
        // Remove existing error message
        const parentNode = input.closest('.form-group') || input.parentNode;
        const existingError = parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();

        // Add error message
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.style.color = '#ef4444';
        errorEl.style.fontSize = '0.875rem';
        errorEl.style.marginTop = '0.25rem';
        errorEl.textContent = message;
        parentNode.appendChild(errorEl);
    }

    clearValidationError(input) {
        input.style.borderColor = '';
        const parentNode = input.closest('.form-group') || input.parentNode;
        const errorMessage = parentNode.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Scheduling...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showFormSuccess();
            
            // Log form data (in production, this would be sent to a server)
            console.log('Form submitted:', data);
            
            // Analytics tracking would go here
            this.trackFormSubmission(data);
            
        }, 1500);
    }

    showFormSuccess() {
        document.querySelector('.contact-form').style.display = 'none';
        document.getElementById('form-success').classList.remove('hidden');
    }

    resetContactForm() {
        document.querySelector('.contact-form').style.display = 'block';
        document.getElementById('form-success').classList.add('hidden');
        document.getElementById('contact-form').reset();
        this.currentStep = 1;
        this.showFormStep(1);
        
        // Clear all validation errors
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.form-control').forEach(input => {
            input.style.borderColor = '';
        });
    }

    trackFormSubmission(data) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: 'contact_form',
                value: 1
            });
        }
    }

    // Scroll animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.problem-card, .value-prop-card, .timeline-item, .focus-item, .patent-item, .contact-card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Tilt effects
    setupTiltEffects() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    // Back to top button
    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            window.scrollToTop = () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            };
        }
    }

    // Scroll handling
    handleScroll() {
        const scrollTop = window.pageYOffset;
        const header = document.getElementById('header');
        const backToTopBtn = document.getElementById('back-to-top');

        // Header effects
        if (header) {
            if (scrollTop > 100) {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.1)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.boxShadow = '';
            }
        }

        // Back to top button
        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Parallax effects (reduced to prevent scroll issues)
        // this.handleParallax(scrollTop);
    }

    handleParallax(scrollTop) {
        const heroVisual = document.querySelector('.hero__visual');
        if (heroVisual && scrollTop < window.innerHeight) {
            const parallaxSpeed = 0.3;
            heroVisual.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
        }
    }

    handleResize() {
        // Handle responsive adjustments
        this.adjustForMobile();
    }

    adjustForMobile() {
        const isMobile = window.innerWidth < 768;
        const heroStats = document.querySelector('.hero__stats');
        
        if (heroStats) {
            if (isMobile) {
                heroStats.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                heroStats.style.gridTemplateColumns = 'repeat(4, 1fr)';
            }
        }
    }

    // Utility functions
    scrollToSection(selector) {
        const section = document.querySelector(selector);
        if (section) {
            this.smoothScrollTo(section);
        }
    }

    addClickAnimation(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    // Performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application
const app = new PowerEdgeApp();

// Global functions for inline event handlers
window.nextStep = () => app.nextFormStep();
window.prevStep = () => app.prevFormStep();
window.resetForm = () => app.resetContactForm();
window.scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Additional enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (this.style.transform !== 'scale(0.95)') {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (this.style.transform !== 'scale(0.95)') {
                this.style.transform = '';
            }
        });
    });

    // Enhanced form interactions
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(input => {
        input.addEventListener('focus', function(e) {
            e.stopPropagation();
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function(e) {
            e.stopPropagation();
            this.parentNode.classList.remove('focused');
        });
    });

    // Add loading states to navigation
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '';
            }, 300);
        });
    });

    // Enhanced testimonial interactions
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 25px 50px rgba(15, 23, 42, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Console branding
    console.log('%c⚡ PowerEdge', 'color: #f59e0b; font-size: 24px; font-weight: bold;');
    console.log('%cPioneering India\'s EV Battery Revolution', 'color: #0f172a; font-size: 16px;');
    console.log('%cWebsite loaded with premium interactions! 🚀', 'color: #1e40af; font-size: 14px;');
});

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PowerEdgeApp;
}