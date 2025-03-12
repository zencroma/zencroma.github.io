// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Add active class styling for mobile menu
    if (!document.querySelector('.nav-links-mobile-styles')) {
      const style = document.createElement('style');
      style.className = 'nav-links-mobile-styles';
      style.textContent = `
        .nav-links.active {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 70px;
          left: 0;
          right: 0;
          background-color: var(--background);
          padding: 1rem 2rem;
          border-bottom: 1px solid var(--gray-800);
          z-index: 10;
        }
        
        .nav-links.active .nav-link {
          padding: 1rem 0;
          margin: 0;
          border-bottom: 1px solid var(--gray-800);
        }
        
        .nav-links.active .nav-link:last-child {
          border-bottom: none;
        }
      `;
      document.head.appendChild(style);
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    let isValid = true;
    
    // Reset previous error states
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());
    
    // Validate name
    if (!nameInput.value.trim()) {
      addErrorMessage(nameInput, 'Name is required');
      isValid = false;
    }
    
    // Validate email
    if (!emailInput.value.trim()) {
      addErrorMessage(emailInput, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      addErrorMessage(emailInput, 'Please enter a valid email');
      isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
      addErrorMessage(messageInput, 'Message is required');
      isValid = false;
    }
    
    if (isValid) {
      // For GitHub Pages, we'll simulate a form submission
      // In a real application, you would use a form service like Formspree or Netlify Forms
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Message sent successfully!';
      successMessage.style.color = 'var(--cyan)';
      successMessage.style.padding = '1rem';
      successMessage.style.textAlign = 'center';
      
      contactForm.style.display = 'none';
      contactForm.parentNode.appendChild(successMessage);
      
      // Reset form after 3 seconds and show it again
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        successMessage.remove();
      }, 3000);
    }
  });
}

function addErrorMessage(inputElement, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  inputElement.parentNode.appendChild(errorDiv);
  inputElement.style.borderColor = 'var(--pink)';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add subtle hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
  });
});

// Add a simple typing effect to the hero heading
function typeEffect() {
  const heroText = document.getElementById('hero-text');
  if (!heroText) return;
  
  const text = heroText.innerHTML;
  heroText.innerHTML = '';
  
  let i = 0;
  const speed = 50; // typing speed in milliseconds
  
  function type() {
    if (i < text.length) {
      heroText.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  // Start the typing effect after a short delay
  setTimeout(type, 1000);
}

// Initialize typing effect when page loads
window.addEventListener('load', typeEffect);
