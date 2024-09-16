// Preloader function
window.addEventListener("load", function() {
    setTimeout(() => {
        document.querySelector('.loader-canva').style.display = 'none';
        document.querySelector('main').style.display = 'flex';
        animateIntroElements();
    }, 3000); // 3000 milliseconds = 3 seconds
});

// Sidebar toggle functions
const toggleSidebar = (show) => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.left = show ? "0" : "-100%";
    document.body.style.overflow = show ? 'hidden' : 'auto';
};

// 1. Function to animate intro elements with staggered timing
function animateIntroElements() {
    const introElements = document.querySelectorAll('#intro-section .intro-content, #intro-section img, #intro-section .stats, #resume-section h1, #resume-section p');

    introElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('intro-fade-in');
            if (index === introElements.length - 1) {
                incrementNumbers();
            }
        }, index * 200); // Delay each element's animation for a staggered effect
    });
}

// 2. Function to increment numbers after intro animation is complete
function incrementNumbers() {
    const elements = document.querySelectorAll('.number');
    const runDuration = 2000; // Total duration of the animation in milliseconds

    elements.forEach(element => {
        const targetValue = parseInt(element.textContent, 10);
        incrementNumber(element, targetValue, runDuration);
    });
}

function incrementNumber(element, targetValue, runDuration) {
    const startTime = performance.now();
    const endTime = startTime + runDuration;
    const initialValue = 0;

    function step(timestamp) {
        if (timestamp < endTime) {
            const elapsedTime = timestamp - startTime;
            const progress = elapsedTime / runDuration; // Progress from 0 to 1
            const currentValue = initialValue + progress * (targetValue - initialValue);
            element.textContent = Math.round(currentValue);
            window.requestAnimationFrame(step);
        } else {
            element.textContent = targetValue; // Ensure we set to the exact target value
        }
    }

    window.requestAnimationFrame(step);
}

// Skill item fade-in when visible using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    const resumeSection = document.querySelector('#resume-section');
    const skillItems = document.querySelectorAll('.resume-section .skill-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach((item, index) => {
                    setTimeout(() => item.classList.add('show'), index * 200);
                });
                observer.unobserve(resumeSection); // Stop observing once triggered
            }
        });
    }, { threshold: 0.5 });

    observer.observe(resumeSection);
});

// Pricing section visibility and animation
document.addEventListener('DOMContentLoaded', () => {
    const pricingSection = document.querySelector('#pricing-section');
    const pricingItems = document.querySelectorAll('#pricing-section .item');
    const pricingElements = document.querySelectorAll('#pricing-section h1, #pricing-section p');

    const animatePricingElements = () => {
        pricingElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('intro-fade-in');
                if (index === pricingElements.length - 1) { // Use pricingElements here
                    incrementNumbers();
                }
            }, index * 150); // Delay each element's animation for a staggered effect
        });
    };
    
    const showPricingItems = () => {
        pricingItems.forEach((item, index) => {
            setTimeout(() => item.classList.add('show'), index * 200);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePricingElements();
                showPricingItems();
                observer.unobserve(pricingSection);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(pricingSection);
});
