document.addEventListener("DOMContentLoaded", () => {
  // ========== Header Hide/Show on Scroll ==========
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      header.style.transform = "translateY(-100%)"; // Hide
    } else {
      header.style.transform = "translateY(0)"; // Show
    }
    lastScrollY = window.scrollY;
  });

  // ========== Back to Top Button ==========
  const backToTop = document.getElementById("backToTop");
  const logoLink = document.querySelector(".logo a");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  logoLink?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ========== Nav Link Active on Scroll ==========
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    let scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${section.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink); // Run on load


  // ========== Slideshow ==========
  let slideIndex = 0;
  let slideTimer = null;
  const slides = document.querySelectorAll(".mySlide");
  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    slides.forEach((slide) => (slide.style.display = "none"));
    dots.forEach((dot) => dot.classList.remove("active-dot"));

    slides[index].style.display = "block";
    dots[index].classList.add("active-dot");

    slideIndex = index;
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  function startSlideShow() {
    slideTimer = setInterval(nextSlide, 7000);
  }

  function resetSlideShow(index) {
    clearInterval(slideTimer);
    showSlide(index);
    startSlideShow();
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => resetSlideShow(idx));
  });

  showSlide(slideIndex);
  startSlideShow();



  // ========== Language Dropdown ==========
  const langToggle = document.querySelector(".lang-toggle");
  const langMenu = document.querySelector(".lang-menu");
  const currentLangText = document.getElementById("current-lang-text");

  if (langToggle && langMenu && currentLangText) {
    langToggle.addEventListener("click", () => {
      langMenu.style.display =
        langMenu.style.display === "block" ? "none" : "block";
    });

    document.querySelectorAll(".lang-menu li").forEach((item) => {
      item.addEventListener("click", () => {
        const selectedLang = item.getAttribute("data-lang");
        currentLangText.textContent = selectedLang.toUpperCase();
        langMenu.style.display = "none";
      });
    });

    // Close dropdown if click outside
    document.addEventListener("click", (e) => {
      if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.style.display = "none";
      }
    });
  }

  // ========== Story and Intern Video Popup ==========
  const stories = {
    1: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Helping Mr. Lee Retire Early</h3><p>Mr. Lee approached us at age 45 with a dream to retire by 55. Through strategic investment and financial planning, we helped him achieve early retirement, debt-free and with a stable passive income.</p>`,
    },
    2: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Rescuing a Family’s Investment Plan</h3><p>This family was trapped in a high-risk scheme. Our advisors helped them exit and restructure their portfolio, resulting in stable growth and financial peace of mind.</p>`,
    },
    3: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Building a Safe Future for Kids</h3><p>We helped this young couple set up a long-term savings and protection plan, ensuring education and healthcare for their children, even during economic uncertainty.</p>`,
    },
    4: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Guiding Young Advisors</h3><p>Our training program helps fresh graduates gain confidence, build portfolios, and grow into future financial leaders.</p>`,
    },
    5: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Financial Freedom for Moms</h3><p>We empower full-time mothers with flexible work options and financial training to achieve independence while raising their children.</p>`,
    },
    6: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Second Career for Retirees</h3><p>Retirees join our community to share experience and continue earning by guiding others in finance and wealth planning.</p>`,
    },
  };

  const storyCards = document.querySelectorAll(".story-card");
  const storyVideo = document.getElementById("storyVideo");
  const storyText = document.getElementById("storyText");
  const storyPopup = document.getElementById("storyPopup");
  const closeStory = document.getElementById("closeStory");
  const speedSelect = document.getElementById("speed");

  if (storyCards.length && storyPopup && storyVideo && storyText && closeStory) {
    storyCards.forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.story;
        if (stories[id]) {
          storyVideo.src = stories[id].video;
          storyVideo.poster = stories[id].poster;
          storyText.innerHTML = stories[id].text;
          storyPopup.style.display = "flex";
          storyVideo.play(); // Auto-play video when opened
        }
      });
    });

    closeStory.addEventListener("click", () => {
      storyPopup.style.display = "none";
      storyVideo.pause();
      storyVideo.currentTime = 0;
      storyVideo.src = ""; // Unload the video for reset
    });

    if (speedSelect) {
      speedSelect.addEventListener("change", (e) => {
        storyVideo.playbackRate = parseFloat(e.target.value);
      });
    }
    
    // Close popup when clicking outside the video content
    storyPopup.addEventListener('click', (e) => {
        if (e.target === storyPopup) {
            closeStory.click(); // Simulate click on close button
        }
    });
  }

  // ========== Service Card Expand ==========
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".service-card");
      const content = card.querySelector(".card-content");

      const isOpen = content.classList.contains("open");

      if (isOpen) {
        content.classList.remove("open");
        btn.classList.remove("rotate");
        content.style.display = "none"; // Hide content
      } else {
        content.classList.add("open");
        btn.classList.add("rotate");
        content.style.display = "block"; // Show content
      }
    });
  });

  // ========== CV Upload Functionality ==========
  const fileInput = document.getElementById("cv");
  const chooseFileBtn = document.getElementById("chooseFileBtn");
  const fileNameDisplay = document.getElementById("fileName");
  const removeFileBtn = document.getElementById("removeFileBtn");
  const form = document.querySelector(".cv-form");

  if (fileInput && chooseFileBtn && fileNameDisplay && removeFileBtn && form) {
    // When "Choose File" button is clicked
    chooseFileBtn.addEventListener("click", () => {
      fileInput.click();
    });

    // When a file is selected
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
        removeFileBtn.style.display = "inline";
      } else {
        fileNameDisplay.textContent = "No file chosen";
        removeFileBtn.style.display = "none";
      }
    });

    // When remove icon is clicked
    removeFileBtn.addEventListener("click", () => {
      fileInput.value = "";
      fileNameDisplay.textContent = "No file chosen";
      removeFileBtn.style.display = "none";
    });

    // On form submit
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch("submit_cv.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => {
          alert(result); // Server response from submit_cv.php
          form.reset();
          fileNameDisplay.textContent = "No file chosen";
          removeFileBtn.style.display = "none";
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
    });
  }

  // ========== Event Tab Functionality ==========
  const tabs = document.querySelectorAll(".event-tab");
  const items = document.querySelectorAll(".event-item");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalDesc = document.getElementById("modalDesc");
  const modalClose = document.getElementById("modalClose");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");

  let filteredItems = [];
  let currentIndex = 0;

  if (tabs.length && items.length && modal && modalImg && modalDesc && modalClose && modalPrev && modalNext) {
    // Filtering
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((btn) => btn.classList.remove("active"));
        tab.classList.add("active");

        const category = tab.getAttribute("data-category");

        // Update filteredItems based on the selected category
        filteredItems = [...items].filter((item) =>
          item.getAttribute("data-category") === category
        );

        items.forEach((item) => {
          item.style.display =
            item.getAttribute("data-category") === category ? "block" : "none";
        });

        // Reset index for the new filtered set
        currentIndex = 0;
      });
    });

    // Show only first category on load
    window.addEventListener("DOMContentLoaded", () => {
      if (tabs.length > 0) {
        tabs[0].click(); // Simulate click on the first tab
      }
    });

    // Modal logic
    function openModal(index) {
      const item = filteredItems[index];
      if (item) { // Safety check
          modalImg.src = item.querySelector("img").src;
          modalDesc.textContent = item.getAttribute("data-description");
          modal.style.display = "flex";
          document.body.style.overflow = "hidden"; // Prevent background scroll
          currentIndex = index;
      }
    }

    function closeModal() {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Re-enable background scroll
    }

    function navigateModal(dir) {
      currentIndex += dir;
      if (currentIndex < 0) currentIndex = filteredItems.length - 1;
      if (currentIndex >= filteredItems.length) currentIndex = 0;
      openModal(currentIndex);
    }

    // Event listeners for opening modal from items
    items.forEach((item) => {
      item.addEventListener("click", () => {
        // Ensure filteredItems reflects the currently visible category when an item is clicked
        const currentCategory = document.querySelector(".event-tab.active")?.getAttribute("data-category");
        filteredItems = [...items].filter(
          (i) => i.getAttribute("data-category") === currentCategory
        );
        
        currentIndex = filteredItems.indexOf(item); // Find index of clicked item within filtered items
        openModal(currentIndex);
      });
    });

    modalClose.addEventListener("click", closeModal);
    modalPrev.addEventListener("click", () => navigateModal(-1));
    modalNext.addEventListener("click", () => navigateModal(1));
    // Close modal if clicking on the overlay itself, not the content
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
});