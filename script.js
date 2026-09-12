// ================================================================================
// SIGNIT - JAVASCRIPT
// Based on EasyPanel interactions
// ================================================================================

// Webhook URL for early access form submissions
const WEBHOOK_URL = 'https://n8n.zenautomations.cloud/webhook/signit';

document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    initNavigationScroll();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Intersection Observer for scroll animations
    initScrollAnimations();

    // FAQ accordion
    initFaqAccordion();

    // Early access form (main)
    initEarlyAccessForm('early-access-form', 'form-success');

    // Final CTA form
    initEarlyAccessForm('final-access-form', 'final-form-success');
});

// ================================================================================
// NAVIGATION SCROLL EFFECT
// ================================================================================

function initNavigationScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ================================================================================
// SMOOTH SCROLL
// ================================================================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#' || href === '#hero') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================================================================
// SCROLL ANIMATIONS
// ================================================================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Special observer for ecosystem diagram animation
    const ecosystemSection = document.getElementById('ekosystem');
    if (ecosystemSection) {
        const ecosystemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animation by adding class
                    entry.target.classList.add('animate-ecosystem');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px'
        });

        ecosystemObserver.observe(ecosystemSection);
    }
}

// ================================================================================
// FAQ ACCORDION
// ================================================================================

function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ================================================================================
// EARLY ACCESS FORM
// ================================================================================

function initEarlyAccessForm(formId, successId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successId);

    if (!form || !successMessage) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            industry: formData.get('industry'),
            timestamp: new Date().toISOString(),
            source: 'signit-landing'
        };

        // Basic validation
        if (!data.email || !data.industry) {
            alert('Proszę wypełnić wszystkie pola');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Proszę podać prawidłowy adres email');
            return;
        }

        try {
            // Show loading state on button
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Wysyłanie...';
            submitButton.disabled = true;

            // Send to webhook (if URL is configured)
            if (WEBHOOK_URL !== 'TODO_N8N_WEBHOOK_URL') {
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } else {
                // Log to console if webhook not configured
                console.log('Form submission (webhook not configured):', data);
                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';

            // Track in Google Analytics if available
            if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                    event: 'early_access_signup',
                    email: data.email,
                    industry: data.industry
                });
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później lub skontaktuj się z nami bezpośrednio.');

            // Restore button state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ================================================================================
// UTILITY FUNCTIONS
// ================================================================================

// Debounce function for performance
function debounce(func, wait) {
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ================================================================================
// PERFORMANCE OPTIMIZATIONS
// ================================================================================

// Preload critical fonts
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('700 1em "Space Grotesk"'),
        document.fonts.load('400 1em "Inter"')
    ]).then(() => {
        document.body.classList.add('fonts-loaded');
    });
}

// Add smooth reveal to images when they load
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    }
});
