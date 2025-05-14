// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Theme Switcher
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]')
  const currentTheme = localStorage.getItem("theme")

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme)
    if (currentTheme === "dark") {
      toggleSwitch.checked = true
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false)

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("open")
    navLinks.classList.toggle("active")
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll(".nav-links a, .hero-buttons a, .scroll-down a, .scroll-top a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Close mobile menu if open
      mobileMenuBtn.classList.remove("open")
      navLinks.classList.remove("active")
      
      // Get the target section
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Smooth scroll to the section
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Offset for the fixed header
          behavior: "smooth"
        });
      }
    });
  });

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active")
      }
    })
  })

  // Typing Animation
  const typingElement = document.querySelector(".typing")
  const words = ["Java Developer", "Web Developer", "Programmer", "Problem Solver"]
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  const isEnd = false

  function type() {
    const currentWord = words[wordIndex]
    const currentChar = currentWord.substring(0, charIndex)
    typingElement.textContent = currentChar
    typingElement.classList.add("stop-blinking")

    if (!isDeleting && charIndex < currentWord.length) {
      // If typing
      charIndex++
      setTimeout(type, 200)
    } else if (isDeleting && charIndex > 0) {
      // If deleting
      charIndex--
      setTimeout(type, 100)
    } else {
      // If word is complete
      isDeleting = !isDeleting
      typingElement.classList.remove("stop-blinking")

      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length
        setTimeout(type, 1200)
      } else {
        setTimeout(type, 800)
      }
    }
  }

  type()

  // Skills Category Tabs
  const categoryTabs = document.querySelectorAll(".category-tab")
  const skillsContainers = document.querySelectorAll(".skills-container")

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")

      const category = tab.dataset.category
      skillsContainers.forEach((container) => {
        container.classList.remove("active")
        if (container.id === `${category}-skills`) {
          container.classList.add("active")
        }
      })
    })
  })

  // Projects Filter
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const filter = btn.dataset.filter
      projectCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Certificates Slider
  const sliderTrack = document.querySelector(".slider-track")
  const sliderDots = document.querySelectorAll(".slider-dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const certificateCards = document.querySelectorAll(".certificate-card")
  let currentSlide = 0

  function goToSlide(index) {
    sliderTrack.style.transform = `translateX(-${index * 100}%)`
    sliderDots.forEach((dot) => dot.classList.remove("active"))
    sliderDots[index].classList.add("active")
    currentSlide = index
  }

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + certificateCards.length) % certificateCards.length
    goToSlide(currentSlide)
  })

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % certificateCards.length
    goToSlide(currentSlide)
  })

  sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index)
    })
  })

  // Contact Form Submission
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Form is handled by formsubmit.co, so we don't need to prevent default
      console.log("Form submitted")
    })
  }

  // Scroll to Top Button
  const scrollTopBtn = document.querySelector(".scroll-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("active")
    } else {
      scrollTopBtn.classList.remove("active")
    }
  })

  // Animate on scroll (simple implementation)
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".skill-progress, .project-card, .timeline-item, .certificate-card, .contact-card",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial styles for animation
  document
    .querySelectorAll(".skill-progress, .project-card, .timeline-item, .certificate-card, .contact-card")
    .forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })

  // Call on scroll and on load
  window.addEventListener("scroll", animateOnScroll)
  window.addEventListener("load", animateOnScroll)
})
