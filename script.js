// --- 1. Animated Typing Effect ---
const typingTextElement = document.getElementById('typing-text');
const phrases = ["DevOps Enthusiast", "Linux Administrator", "Cloud Engineer"];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Remove a letter
        typingTextElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        // Add a letter
        typingTextElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
    }

    // Determine typing speed
    let typingSpeed = isDeleting ? 50 : 100;

    // Logic for pausing at the end of a phrase and before deleting
    if (!isDeleting && letterIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    if(typingTextElement) typeEffect();
});


// --- 2. Scroll Animations & Skill Progress Bars ---
const fadeElements = document.querySelectorAll('.fade-in');
const skillBars = document.querySelectorAll('.skill-per');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class to trigger fade-in CSS
            entry.target.classList.add('visible');

            // If it's the skills section, animate the progress bars
            if (entry.target.classList.contains('skills-container')) {
                skillBars.forEach(bar => {
                    const width = bar.style.width; // get the inline style width
                    bar.style.width = '0%'; // reset to 0
                    setTimeout(() => {
                        bar.style.width = width; // animate to target width
                    }, 200);
                });
            }

            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe all fade-in elements
fadeElements.forEach(el => observer.observe(el));