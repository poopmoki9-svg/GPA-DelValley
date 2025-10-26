const adminCredentials = {
  email: 'kaitlynkaylia@gmail.com',
  password: '12345'
};

let registeredMembers = JSON.parse(localStorage.getItem('registeredMembers')) || [];

// --- DOM Elements ---
const registrationForm = document.getElementById('registrationForm');
const adminLoginForm = document.getElementById('adminLoginForm');
const formMessage = document.getElementById('formMessage');
const adminMessage = document.getElementById('adminMessage');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

// --- Utility Functions ---
function displayMessage(element, message, type = 'info') {
  element.textContent = message;
  element.className = `form-message ${type}`;
  setTimeout(() => {
    element.textContent = '';
    element.className = 'form-message';
  }, 5000);
}

function saveMembers() {
  localStorage.setItem('registeredMembers', JSON.stringify(registeredMembers));
}

function getCurrentDate() {
  return new Date();
}

// This function is not directly used in the current flow, but kept for potential future enhancements.
function isWithinLastYear(date) {
  const now = getCurrentDate();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  return date >= oneYearAgo && date <= now;
}

// --- Event Listeners ---

// Mobile Menu Toggle
if (mobileMenuToggle && nav) {
  mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
    mobileMenuToggle.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      nav.classList.remove('mobile-open');
      mobileMenuToggle.classList.remove('active');
    }
  });
}

// Registration Form Submission
if (registrationForm) {
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const psionicInterestsInput = document.getElementById('psionicInterests'); // Get the new textarea

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const psionicInterests = psionicInterestsInput.value.trim(); // Get the value from the new textarea

    if (!name || !email) {
      displayMessage(formMessage, 'Please fill in all fields.', 'error');
      return;
    }

    // Basic email format validation
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      displayMessage(formMessage, 'Please enter a valid email address.', 'error');
      return;
    }

    const newMember = {
      id: Date.now(),
      name: name,
      email: email,
      psionicInterests: psionicInterests, // Add the new field
      appliedAt: new Date().toISOString()
    };

    registeredMembers.push(newMember);
    saveMembers();

    displayMessage(formMessage, 'Application submitted successfully! You will receive an email within 12-48 hours.', 'success');
    registrationForm.reset();

    // Simulate sending an email (for demonstration purposes)
    setTimeout(() => {
      alert(`Simulating email to ${email}: 

Dear ${name},

Thank you for your interest in the Global Psionic Association. We have received your application. 

Please answer the following questions to help us understand your interests and the role you envision within our community:

1. Why do you want to join the Global Psionic Association?
2. What role do you see yourself playing within the association?
3. Do you have any specific psionic interests or abilities you'd like to share?

${psionicInterests ? `Based on your application, we note your interests in: ${psionicInterests}

` : ''}We look forward to hearing from you.

Sincerely,
Global Psionic Association Team`);
    }, 1000);
  });
}

// Admin Login Form Submission
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === adminCredentials.email && password === adminCredentials.password) {
      // Store login status in localStorage for simple authentication
      localStorage.setItem('adminData', JSON.stringify({ loggedIn: true }));
      window.location.href = 'admin.html'; // Redirect to admin dashboard
    } else {
      displayMessage(adminMessage, 'Invalid email or password. Please try again.', 'error');
    }
  });
}

// --- Initial Load ---
// Ensure menu is initialized after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Any initializations needed for the main page can go here
});
