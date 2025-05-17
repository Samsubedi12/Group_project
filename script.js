// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Fade-In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.stat-card, .service-card').forEach(el => {
    observer.observe(el);
});

// Sticky Navigation
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add active class to current navigation item
function setActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize functions
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavItem();
});

// Handle quiz form submission
document.getElementById('mental-health-quiz').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    formData.append('form_type', 'quiz');

    fetch('process_forms.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show quiz results
            document.getElementById('quiz-result').style.display = 'block';
            document.getElementById('score-number').textContent = data.score;
            
            // Set result message based on score
            let message = '';
            if (data.score <= 4) {
                message = 'Your mental well-being appears to be in good shape. Keep up the good work!';
            } else if (data.score <= 8) {
                message = 'You might be experiencing some stress. Consider reaching out for support.';
            } else {
                message = 'You may be experiencing significant stress. We recommend speaking with a counselor.';
            }
            document.getElementById('result-message').textContent = message;
        } else {
            alert('Error submitting quiz: ' + data.message);
        }
    })
    .catch(error => {
        alert('An error occurred while submitting the quiz.');
    });
});

// Handle demo request form submission
document.getElementById('demo-request-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    formData.append('form_type', 'demo');

    fetch('process_forms.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for your interest! We will contact you shortly to schedule your consultation.');
            this.reset();
        } else {
            alert('Error submitting request: ' + data.message);
        }
    })
    .catch(error => {
        alert('An error occurred while submitting your request.');
    });
});

// Function to reset quiz
function resetQuiz() {
    document.getElementById('mental-health-quiz').reset();
    document.getElementById('quiz-result').style.display = 'none';
} 