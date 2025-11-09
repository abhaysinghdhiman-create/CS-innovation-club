// ================================
// 🌟 Computer Science Innovation Club JS
// ================================

// LIGHTBOX GALLERY (Gallery + Facilities)
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
lightbox.innerHTML = `
  <button class="lb-btn lb-prev" aria-label="Previous">❮</button>
  <span class="close" aria-label="Close">&times;</span>
  <img class="lightbox-content" id="lightbox-img" alt="">
  <p id="lightbox-caption"></p>
  <button class="lb-btn lb-next" aria-label="Next">❯</button>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("#lightbox-img");
const captionText = lightbox.querySelector("#lightbox-caption");
const closeBtn = lightbox.querySelector(".close");
const prevBtn = lightbox.querySelector(".lb-prev");
const nextBtn = lightbox.querySelector(".lb-next");

// Combine all clickable images
const allImages = Array.from(document.querySelectorAll(".gallery-item img, .facility-card img"));
let currentIndex = 0;

function showByIndex(i) {
  if (i < 0) i = allImages.length - 1;
  if (i >= allImages.length) i = 0;
  currentIndex = i;
  const img = allImages[currentIndex];
  lightboxImg.src = img.src;
  captionText.textContent = img.alt || "";
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "";
}

// Add click events to open
allImages.forEach((img, i) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => showByIndex(i));
});

// Buttons
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", e => { e.stopPropagation(); showByIndex(currentIndex - 1); });
nextBtn.addEventListener("click", e => { e.stopPropagation(); showByIndex(currentIndex + 1); });

// Close on background click
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard controls
document.addEventListener("keydown", e => {
  if (lightbox.style.display !== "flex") return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showByIndex(currentIndex - 1);
  if (e.key === "ArrowRight") showByIndex(currentIndex + 1);
});

// Swipe (for mobiles)
let touchStartX = 0;
lightbox.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].clientX, { passive: true });
lightbox.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) {
    if (dx > 0) showByIndex(currentIndex - 1);
    else showByIndex(currentIndex + 1);
  }
}, { passive: true });

// ================================
// 🌈 Fade-in Animation on Scroll
// ================================
const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ================================
// 🔝 Scroll-to-Top Button (Bonus)
// ================================
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "⬆";
scrollBtn.className = "scroll-top";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Wait until the page content loads completely
document.addEventListener('DOMContentLoaded', function () {

  // Select the "about-floating" box
  const aboutBox = document.querySelector('.about-floating');

  // Run scroll animation when scrolling
  window.addEventListener('scroll', function () {
    if (aboutBox) {
      const boxPosition = aboutBox.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // When box is visible in viewport, add "visible" class
      if (boxPosition < windowHeight - 100) {
        aboutBox.classList.add('visible');
      }
    }
  });
});

// ===============================
// TESTIMONIAL SLIDER FUNCTIONALITY
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");

  // Function to show the correct slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
  }

  // Auto-slide every 5 seconds
  function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  let slideInterval = setInterval(autoSlide, 5000);

  // Allow manual slide change via dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(index);

      // Reset timer so auto-slide continues smoothly
      clearInterval(slideInterval);
      slideInterval = setInterval(autoSlide, 5000);
    });
  });

  // Initialize the first slide
  showSlide(currentSlide);
});

// ===============================
// SCROLL-TRIGGERED FADE-IN FOR LOGO CAROUSEL
// ===============================

// Select the logo carousel section
const logoCarousel = document.querySelector('.logo-carousel');

// Function to check when the section enters the viewport
function revealOnScroll() {
  const rect = logoCarousel.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if section is in view
  if (rect.top < windowHeight - 100) {
    logoCarousel.classList.add('visible');
  }
}

// Run the check on scroll
window.addEventListener('scroll', revealOnScroll);