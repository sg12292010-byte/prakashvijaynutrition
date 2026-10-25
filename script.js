document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year in Footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });

    // Close menu when a link is clicked
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Sticky Header Effect on Scroll
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // 4. Scroll Reveal Animation (Simple fallback)
  // CSS mein humne reveal ko visible kar diya hai, par future ke liye ye rakha hai
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach(el => {
    el.classList.add("visible");
  });

  // 5. FAQ Accordion Logic
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", () => {
        const activeItem = document.querySelector(".faq-item.active");
        
        // Agar koi aur item pehle se khula hai, toh use band karo
        if (activeItem && activeItem !== item) {
          activeItem.classList.remove("active");
          activeItem.querySelector(".faq-answer").style.maxHeight = null;
        }

        // Current item ko toggle karo
        item.classList.toggle("active");
        
        if (item.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
          answer.style.maxHeight = null;
        }
      });
    }
  });
});

// 6. Gallery Lightbox Functions (Global)
function openLightbox(element) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (lightbox && lightboxImg) {
    lightboxImg.src = element.querySelector("img").src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
}

function closeLightbox(event) {
  if (event.target.id === "lightbox" || event.target.classList.contains("lightbox-close")) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    }
  }
}

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});