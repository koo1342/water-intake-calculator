class AdvancedWaterIntakeCalculator {
    constructor() {
        this.currentWeight = 0;
        this.currentWeightUnit = 'kg';
        this.currentHeight = 0;
        this.currentHeightUnit = 'cm';
        this.currentActivity = 'moderate';
        this.currentClimate = 'temperate';
        this.initializeEventListeners();
        this.initializeAnimations();
    }

    initializeEventListeners() {
        // Calculate button
        const calculateBtn = document.getElementById('calculateBtn');
        calculateBtn.addEventListener('click', () => this.calculateWaterIntake());

        // Mobile navigation
        this.initializeMobileNavigation();

        // Unit selectors
        this.initializeUnitSelectors();

        // Activity cards
        this.initializeActivityCards();

        // Climate cards
        this.initializeClimateCards();

        // Advanced options toggle
        this.initializeAdvancedOptions();

        // Smooth scrolling for navigation
        this.initializeSmoothScrolling();

        // Form validation
        this.initializeFormValidation();

        // Keyboard shortcuts
        this.initializeKeyboardShortcuts();

        // Ripple effect for buttons
        this.initializeRippleEffect();

        // Responsive utilities
        this.initializeResponsiveFeatures();

        // FAQ functionality
        this.initializeFAQ();
    }

    initializeUnitSelectors() {
        // Weight unit selector
        const weightUnitBtns = document.querySelectorAll('.unit-btn:not(.height-unit)');
        weightUnitBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                weightUnitBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentWeightUnit = btn.dataset.unit;
            });
        });

        // Height unit selector
        const heightUnitBtns = document.querySelectorAll('.height-unit');
        heightUnitBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                heightUnitBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentHeightUnit = btn.dataset.unit;
            });
        });
    }

    initializeActivityCards() {
        const activityCards = document.querySelectorAll('.activity-card');
        activityCards.forEach(card => {
            card.addEventListener('click', () => {
                activityCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.currentActivity = card.dataset.value;
            });
        });
    }

    initializeClimateCards() {
        const climateCards = document.querySelectorAll('.climate-card');
        climateCards.forEach(card => {
            card.addEventListener('click', () => {
                climateCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.currentClimate = card.dataset.value;
            });
        });
    }

    initializeAdvancedOptions() {
        const advancedToggle = document.querySelector('.advanced-toggle');
        const advancedContent = document.querySelector('.advanced-content');

        advancedToggle.addEventListener('click', () => {
            advancedToggle.classList.toggle('active');
            advancedContent.classList.toggle('active');
        });
    }

    initializeSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeFormValidation() {
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('input', () => this.clearValidationError(input));
        });
    }

    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.calculateWaterIntake();
            }
        });
    }

    initializeMobileNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const icon = navToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Close mobile menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
    }

    initializeResponsiveFeatures() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResponsiveChanges();
        });

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResponsiveChanges();
            }, 100);
        });

        // Initial responsive setup
        this.handleResponsiveChanges();
    }

    handleResponsiveChanges() {
        // Use requestAnimationFrame to batch DOM changes
        requestAnimationFrame(() => {
            const screenWidth = window.innerWidth;
            const mobileElements = document.querySelectorAll('.mobile-hide');
            const desktopElements = document.querySelectorAll('.desktop-hide');

            // Batch style changes to prevent forced reflows
            const styleChanges = [];

            if (screenWidth <= 768) {
                // Mobile view
                mobileElements.forEach(el => styleChanges.push(() => el.style.display = 'none'));
                desktopElements.forEach(el => styleChanges.push(() => el.style.display = 'block'));
                
                // Adjust ad sizes for mobile
                const adLeaderboards = document.querySelectorAll('.ad-leaderboard');
                adLeaderboards.forEach(ad => {
                    styleChanges.push(() => {
                        ad.style.width = '100%';
                        ad.style.maxWidth = '100%';
                        if (screenWidth <= 575) {
                            ad.style.height = '60px';
                        }
                    });
                });

                const adRectangles = document.querySelectorAll('.ad-rectangle');
                adRectangles.forEach(ad => {
                    styleChanges.push(() => {
                        ad.style.width = '100%';
                        ad.style.maxWidth = '100%';
                        if (screenWidth <= 575) {
                            ad.style.height = '150px';
                        }
                    });
                });
            } else {
                // Desktop view
                mobileElements.forEach(el => styleChanges.push(() => el.style.display = 'block'));
                desktopElements.forEach(el => styleChanges.push(() => el.style.display = 'none'));
                
                // Reset ad sizes for desktop
                const adLeaderboards = document.querySelectorAll('.ad-leaderboard');
                adLeaderboards.forEach(ad => {
                    styleChanges.push(() => {
                        ad.style.width = '728px';
                        ad.style.maxWidth = '100%';
                        ad.style.height = '90px';
                    });
                });

                const adRectangles = document.querySelectorAll('.ad-rectangle');
                adRectangles.forEach(ad => {
                    styleChanges.push(() => {
                        ad.style.width = '300px';
                        ad.style.maxWidth = '100%';
                        ad.style.height = '250px';
                    });
                });
            }

            // Apply all style changes at once
            styleChanges.forEach(change => change());

            // Close mobile menu on resize to desktop
            if (screenWidth > 768) {
                const navMenu = document.getElementById('navMenu');
                const navToggle = document.getElementById('navToggle');
                if (navMenu && navToggle) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }

    initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    initializeRippleEffect() {
        const buttons = document.querySelectorAll('.calculate-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = button.querySelector('.btn-ripple');
                if (ripple) {
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('animate');
                    
                    setTimeout(() => ripple.classList.remove('animate'), 600);
                }
            });
        });
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.tip-card, .conversion-item, .activity-card, .climate-card');
        animatedElements.forEach(el => observer.observe(el));
    }

    validateInput(input) {
        const value = parseFloat(input.value);
        const inputGroup = input.closest('.form-group');
        
        // Remove existing error
        this.clearValidationError(input);

        if (input.id === 'weight' && (!value || value <= 0 || value > 500)) {
            this.showValidationError(inputGroup, 'Please enter a valid weight (1-500)');
            return false;
        }

        if (input.id === 'height' && value && (value < 50 || value > 300)) {
            this.showValidationError(inputGroup, 'Please enter a valid height');
            return false;
        }

        if (input.id === 'age' && value && (value < 1 || value > 120)) {
            this.showValidationError(inputGroup, 'Please enter a valid age (1-120)');
            return false;
        }

        return true;
    }

    showValidationError(inputGroup, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'validation-error';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color)';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        inputGroup.appendChild(errorElement);
    }

    clearValidationError(input) {
        const inputGroup = input.closest('.form-group');
        const existingError = inputGroup.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }
    }

    calculateWaterIntake() {
        // Get form values
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) || 0;
        const age = parseInt(document.getElementById('age').value) || 30;
        const gender = document.getElementById('gender').value;

        // Get special conditions
        const isPregnant = document.getElementById('pregnancy')?.checked || false;
        const hasIllness = document.getElementById('illness')?.checked || false;
        const onMedication = document.getElementById('medication')?.checked || false;

        // Validate required fields
        if (!weight || weight <= 0) {
            this.showNotification('Please enter a valid weight', 'error');
            document.getElementById('weight').focus();
            return;
        }

        // Show loading state
        this.showLoadingState();

        // Simulate calculation delay for better UX
        setTimeout(() => {
            const result = this.performAdvancedCalculation({
                weight,
                height,
                age,
                gender,
                weightUnit: this.currentWeightUnit,
                heightUnit: this.currentHeightUnit,
                activity: this.currentActivity,
                climate: this.currentClimate,
                isPregnant,
                hasIllness,
                onMedication
            });

            this.displayResults(result);
            this.hideLoadingState();
        }, 1500);
    }

    performAdvancedCalculation(params) {
        // Convert weight to kg
        let weightInKg = params.weight;
        if (params.weightUnit === 'lbs') {
            weightInKg = params.weight * 0.453592;
        }

        // Convert height to cm for BMI calculation
        let heightInCm = params.height;
        if (params.heightUnit === 'ft' && params.height > 0) {
            heightInCm = params.height * 30.48;
        }

        // Base calculation using multiple methods
        let waterIntake = this.calculateBaseIntake(weightInKg, heightInCm, params.age, params.gender);

        // Activity level multipliers (more sophisticated)
        const activityMultipliers = {
            sedentary: 1.0,
            light: 1.15,
            moderate: 1.35,
            high: 1.55,
            extreme: 1.8
        };

        waterIntake *= activityMultipliers[params.activity];

        // Climate adjustments (more nuanced)
        const climateMultipliers = {
            temperate: 1.0,
            hot: 1.25,
            humid: 1.4
        };

        waterIntake *= climateMultipliers[params.climate];

        // Special condition adjustments
        if (params.isPregnant) waterIntake *= 1.3;
        if (params.hasIllness) waterIntake *= 1.2;
        if (params.onMedication) waterIntake *= 1.15;

        // Age-based adjustments (more detailed)
        if (params.age < 18) {
            waterIntake *= 0.9;
        } else if (params.age > 65) {
            waterIntake *= 1.1;
        }

        // Gender-based adjustments
        if (params.gender === 'female') {
            waterIntake *= 0.95;
        }

        // Convert to liters and calculate confidence
        const waterIntakeLiters = waterIntake / 1000;
        const confidence = this.calculateConfidence(params);

        return {
            liters: Math.round(waterIntakeLiters * 10) / 10,
            milliliters: Math.round(waterIntake),
            confidence: confidence,
            factors: this.getCalculationFactors(params)
        };
    }

    calculateBaseIntake(weightKg, heightCm, age, gender) {
        // Use multiple calculation methods and average them
        
        // Method 1: Simple weight-based (35ml per kg)
        const method1 = weightKg * 35;

        // Method 2: Body surface area method (if height available)
        let method2 = method1;
        if (heightCm > 0) {
            const bsa = Math.sqrt((heightCm * weightKg) / 3600); // Mosteller formula
            method2 = bsa * 1500; // 1500ml per m² of BSA
        }

        // Method 3: Metabolic rate estimation
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
        }
        const method3 = bmr * 1.2; // Water needs roughly correlate with metabolic rate

        // Average the methods (weight method 2 if no height)
        const methods = heightCm > 0 ? [method1, method2, method3] : [method1, method3];
        return methods.reduce((sum, method) => sum + method, 0) / methods.length;
    }

    calculateConfidence(params) {
        let confidence = 85; // Base confidence

        // Increase confidence with more data
        if (params.height > 0) confidence += 5;
        if (params.age > 0) confidence += 3;
        
        // Decrease confidence for extreme values
        if (params.weight < 40 || params.weight > 150) confidence -= 10;
        if (params.age < 16 || params.age > 80) confidence -= 5;

        // Special conditions reduce confidence slightly
        if (params.isPregnant || params.hasIllness || params.onMedication) confidence -= 3;

        return Math.max(75, Math.min(98, confidence));
    }

    getCalculationFactors(params) {
        const factors = [];
        
        factors.push(`Weight: ${params.weight} ${params.weightUnit}`);
        if (params.height > 0) factors.push(`Height: ${params.height} ${params.heightUnit}`);
        factors.push(`Age: ${params.age} years`);
        factors.push(`Gender: ${params.gender}`);
        factors.push(`Activity: ${params.activity}`);
        factors.push(`Climate: ${params.climate}`);
        
        if (params.isPregnant) factors.push('Pregnancy adjustment');
        if (params.hasIllness) factors.push('Illness adjustment');
        if (params.onMedication) factors.push('Medication adjustment');

        return factors;
    }

    displayResults(result) {
        const resultsSection = document.getElementById('results');
        const resultAmount = document.getElementById('resultAmount');
        const resultUnit = document.getElementById('resultUnit');
        const confidenceBar = document.getElementById('confidenceBar');
        const confidenceLevel = document.getElementById('confidenceLevel');

        // Display main result with animation
        this.animateNumber(resultAmount, 0, result.liters, 1000);
        resultUnit.textContent = 'liters';

        // Update confidence bar
        confidenceBar.style.width = result.confidence + '%';
        confidenceLevel.textContent = result.confidence + '%';

        // Calculate and display conversions
        this.updateConversions(result.liters, result.milliliters);

        // Generate hydration schedule
        this.generateHydrationSchedule(result.liters);

        // Show results with smooth animation
        resultsSection.style.display = 'block';
        resultsSection.classList.add('slide-up');
        
        // Smooth scroll to results
        setTimeout(() => {
            resultsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);

        // Show success notification
        this.showNotification('Calculation complete! Your personalized hydration plan is ready.', 'success');
    }

    updateConversions(liters, milliliters) {
        const cupsAmount = document.getElementById('cupsAmount');
        const bottlesAmount = document.getElementById('bottlesAmount');
        const glassesAmount = document.getElementById('glassesAmount');
        const mlAmount = document.getElementById('mlAmount');

        // Calculate conversions with more precision
        const cups = Math.round(liters * 4.227); // 1 liter = 4.227 cups (8 oz)
        const bottles = Math.round(liters * 2.0); // 1 liter ≈ 2 bottles (16.9 oz)
        const glasses = Math.round(liters * 2.84); // 1 liter ≈ 2.84 glasses (12 oz)

        // Animate the numbers
        this.animateNumber(cupsAmount, 0, cups, 800);
        this.animateNumber(bottlesAmount, 0, bottles, 900);
        this.animateNumber(glassesAmount, 0, glasses, 1000);
        this.animateNumber(mlAmount, 0, milliliters, 1100);
    }

    generateHydrationSchedule(totalLiters) {
        const scheduleContainer = document.getElementById('hydrationSchedule');
        scheduleContainer.innerHTML = '';

        const schedule = [
            { time: '7:00 AM', percentage: 15, desc: 'Morning hydration' },
            { time: '10:00 AM', percentage: 10, desc: 'Mid-morning' },
            { time: '12:00 PM', percentage: 15, desc: 'Lunch time' },
            { time: '3:00 PM', percentage: 15, desc: 'Afternoon boost' },
            { time: '6:00 PM', percentage: 20, desc: 'Pre-dinner' },
            { time: '8:00 PM', percentage: 15, desc: 'Evening' },
            { time: '10:00 PM', percentage: 10, desc: 'Before bed' }
        ];

        schedule.forEach((item, index) => {
            const amount = Math.round((totalLiters * item.percentage / 100) * 10) / 10;
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item';
            scheduleItem.innerHTML = `
                <div class="schedule-time">${item.time}</div>
                <div class="schedule-content">
                    <div class="schedule-amount">${amount}L</div>
                    <div class="schedule-desc">${item.desc}</div>
                </div>
            `;
            
            // Add staggered animation
            setTimeout(() => {
                scheduleItem.classList.add('fade-in');
                scheduleContainer.appendChild(scheduleItem);
            }, index * 100);
        });
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const difference = end - start;

        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = start + (difference * easeOutCubic);
            
            // Batch DOM updates to prevent forced reflows
            const value = Math.round(current * 10) / 10;
            if (element.textContent !== value.toString()) {
                element.textContent = value;
            }

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = end;
            }
        };

        requestAnimationFrame(updateNumber);
    }

    showLoadingState() {
        const calculateBtn = document.getElementById('calculateBtn');
        const btnText = calculateBtn.querySelector('span');
        const btnIcon = calculateBtn.querySelector('i');
        
        calculateBtn.disabled = true;
        calculateBtn.classList.add('loading');
        btnText.textContent = 'Calculating...';
        btnIcon.className = 'fas fa-spinner fa-spin';
    }

    hideLoadingState() {
        const calculateBtn = document.getElementById('calculateBtn');
        const btnText = calculateBtn.querySelector('span');
        const btnIcon = calculateBtn.querySelector('i');
        
        calculateBtn.disabled = false;
        calculateBtn.classList.remove('loading');
        btnText.textContent = 'Calculate My Water Intake';
        btnIcon.className = 'fas fa-calculator';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Initialize chart (placeholder for future enhancement)
    initializeChart() {
        const canvas = document.getElementById('hydrationChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            // Simple placeholder chart
            ctx.fillStyle = 'var(--primary-color)';
            ctx.fillRect(50, 50, 200, 100);
            ctx.fillStyle = 'white';
            ctx.font = '16px Inter';
            ctx.fillText('Hydration Chart', 100, 105);
        }
    }
}

// Initialize the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new AdvancedWaterIntakeCalculator();
    
    // Initialize chart
    calculator.initializeChart();
    
    // Add navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.tip-card, .activity-card, .climate-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});