// ============================
//  EmailJS Initialization
// ============================
(function () {
  emailjs.init("_q8ndMkTEIo7hY1pC"); // ✅ Your public key
})();

// ============================
//  AOS (Animate On Scroll)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") AOS.init({ duration: 800, once: true });
});

// ============================
//  Loading Overlay
// ============================
window.addEventListener("load", () => {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) overlay.style.display = "none";
});

// ============================
//  Mobile Menu Toggle
// ============================
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// ============================
//  Navbar Blur on Scroll
// ============================
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scroll-top");
  if (window.scrollY > 80) {
    navbar.classList.add("nav-blur");
    scrollTopBtn.classList.remove("hidden");
  } else {
    navbar.classList.remove("nav-blur");
    scrollTopBtn.classList.add("hidden");
  }
});

// ============================
//  Smooth Scrolling
// ============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});

// ============================
//  Typing Animation (Hero roles)
// ============================
const typingEl = document.getElementById("typing-text");
const roles = [
  "Full-Stack Developer",
  "Mobile App Creator",
  "UI/UX Designer",
  "Poster & Banner Designer",
  "Branding Expert",
  "Data Analyst",
];
let rIndex = 0,
  cIndex = 0,
  deleting = false;

function typeEffect() {
  if (!typingEl) return;
  const text = roles[rIndex];
  typingEl.textContent = deleting
    ? text.substring(0, cIndex - 1)
    : text.substring(0, cIndex + 1);

  cIndex += deleting ? -1 : 1;
  let speed = deleting ? 50 : 100;

  if (!deleting && cIndex === text.length) {
    speed = 2000;
    deleting = true;
  } else if (deleting && cIndex === 0) {
    deleting = false;
    rIndex = (rIndex + 1) % roles.length;
    speed = 500;
  }
  setTimeout(typeEffect, speed);
}
setTimeout(typeEffect, 1200);

// ============================
//  Project Card Click → Scroll to Contact
// ============================
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelector("#contact")?.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ============================
//  Testimonials Auto-Rotate
// ============================
const slides = document.querySelectorAll("#testimonials-slider .testi-slide");
let slideIndex = 0;
function rotateSlides() {
  slides.forEach((s) => {
    s.classList.add("hidden");
    s.style.opacity = 0;
  });
  slides[slideIndex].classList.remove("hidden");
  slides[slideIndex].style.opacity = 1;
  slideIndex = (slideIndex + 1) % slides.length;
}
if (slides.length > 0) {
  rotateSlides();
  setInterval(rotateSlides, 5000);
}

// ============================
//  Scroll To Top Button
// ============================
const topBtn = document.getElementById("scroll-top");
if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================
//  EmailJS Contact Form
// ============================
const form = document.getElementById("contact-form");
const formMsg = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");

    formMsg.classList.remove("hidden");
    formMsg.innerHTML = `
      <div class="rounded-xl p-3 border border-blue-400/30 text-center animate-pulse">
        <span class="text-blue-300">Sending your message...</span>
      </div>`;

    emailjs
      .send("service_b3cu6za", "template_v1oykjq", {
        name,
        email,
        subject,
        message,
      })
      .then(() => {
        formMsg.innerHTML = `
          <div class="rounded-xl p-3 border border-green-400/30 text-center">
            <p class="text-green-300 font-semibold">✅ Message sent successfully!</p>
            <p class="text-gray-400 text-sm mt-1">Thanks, ${name}! I'll reply soon.</p>
          </div>`;
        form.reset();
        setTimeout(() => formMsg.classList.add("hidden"), 5000);
      })
      .catch(() => {
        formMsg.innerHTML = `
          <div class="rounded-xl p-3 border border-red-400/30 text-center">
            <p class="text-red-400 font-semibold">❌ Something went wrong.</p>
            <p class="text-gray-400 text-sm">Please try again later.</p>
          </div>`;
      });
  });
}
