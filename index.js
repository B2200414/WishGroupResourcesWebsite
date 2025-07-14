document.addEventListener("DOMContentLoaded", () => {
  // ========== Sticky Header & Active Section Highlight ==========
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    if (document.body.classList.contains("scroll-lock")) return;

    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;



    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (currentScroll >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", href === currentSectionId);
    });
  });

  // ========== WISH GROUP Scroll-Activated Drop ==========
  const hero = document.getElementById("hero");
  const brandText = document.getElementById("wishgroupText");
  const spans = brandText.querySelectorAll("span");

  let currentCharIndex = 0;
  let isDropping = false;
  let hasDroppedAll = false;
  let extraScrollCount = 0;
  const unlockAfterScrolls = 10;

  function dropNextChar() {
    if (currentCharIndex < spans.length) {
      spans[currentCharIndex].style.opacity = "1";
      spans[currentCharIndex].style.transform = "translateY(0)";
      currentCharIndex++;
    }

    if (currentCharIndex === spans.length) {
      hasDroppedAll = true;
    }
  }

  function handleDropScroll(e) {
    if (!isDropping) return;
    e.preventDefault();

    if (!hasDroppedAll) {
      dropNextChar();
    } else {
      extraScrollCount++;
      if (extraScrollCount >= unlockAfterScrolls) {
        finishDrop();
      }
    }
  }

  function finishDrop() {
    document.body.classList.remove("scroll-lock");
    hero.classList.add("animate-drop");
    window.removeEventListener("wheel", handleDropScroll, { passive: false });
    window.removeEventListener("touchmove", handleDropScroll, { passive: false });
  }

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const viewportBottom = scrollY + window.innerHeight;

    if (!isDropping && !hasDroppedAll && viewportBottom >= heroBottom - 3) {
      isDropping = true;
      document.body.classList.add("scroll-lock");

      // Lock scroll at hero bottom
      window.scrollTo({ top: heroBottom - window.innerHeight });

      // Start listening for scroll attempts
      window.addEventListener("wheel", handleDropScroll, { passive: false });
      window.addEventListener("touchmove", handleDropScroll, { passive: false });
    }
  });


  // ========== Reveal About Section ==========
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  const aboutSection = document.querySelector(".about-section");
  observer.observe(aboutSection);

  // ========== AOS Init ==========
  if (typeof AOS !== "undefined") {
    AOS.init({ once: true, duration: 800 });
  }

  // ========== Language Dropdown ==========
  const langToggle = document.querySelector(".lang-toggle");
  const langMenu = document.querySelector(".lang-menu");
  const currentLangText = document.getElementById("current-lang-text");

  if (langToggle && langMenu && currentLangText) {
    langToggle.addEventListener("click", () => {
      langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
    });

    document.querySelectorAll(".lang-menu li").forEach((item) => {
      item.addEventListener("click", () => {
        const selectedLang = item.getAttribute("data-lang");
        currentLangText.textContent = selectedLang.toUpperCase();
        langMenu.style.display = "none";
      });
    });

    document.addEventListener("click", (e) => {
      if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.style.display = "none";
      }
    });
  }

  // ========== Back to Top Button ==========
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 200 ? "block" : "none";
    });

    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ========== Story and Intern Video Popup ==========
  const stories = {
    1: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Helping Mr. Lee Retire Early</h3><p>Mr. Lee approached us at age 45 with a dream to retire by 55. Through strategic investment and financial planning, we helped him achieve early retirement, debt-free and with a stable passive income.</p>`
    },
    2: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Rescuing a Family’s Investment Plan</h3><p>This family was trapped in a high-risk scheme. Our advisors helped them exit and restructure their portfolio, resulting in stable growth and financial peace of mind.</p>`
    },
    3: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Building a Safe Future for Kids</h3><p>We helped this young couple set up a long-term savings and protection plan, ensuring education and healthcare for their children, even during economic uncertainty.</p>`
    },
    4: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Guiding Young Advisors</h3><p>Our training program helps fresh graduates gain confidence, build portfolios, and grow into future financial leaders.</p>`
    },
    5: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Financial Freedom for Moms</h3><p>We empower full-time mothers with flexible work options and financial training to achieve independence while raising their children.</p>`
    },
    6: {
      video: "videos/11.mp4",
      poster: "images/office.jpg",
      text: `<h3>Second Career for Retirees</h3><p>Retirees join our community to share experience and continue earning by guiding others in finance and wealth planning.</p>`
    }
  };
  const storyCards = document.querySelectorAll(".story-card");
  const storyVideo = document.getElementById("storyVideo");
  const storyText = document.getElementById("storyText");
  const storyPopup = document.getElementById("storyPopup");
  const closeStory = document.getElementById("closeStory");
  const speedSelect = document.getElementById("speed");

  if (storyCards.length && storyPopup && storyVideo && storyText && closeStory) {
    storyCards.forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.story;
        if (stories[id]) {
          // Ensure no scroll lock is applied
          document.body.classList.remove("scroll-lock");
          document.body.style.overflow = "hidden"; // Keep this if you want to prevent background scroll

          storyVideo.src = stories[id].video;
          storyVideo.poster = stories[id].poster;
          storyText.innerHTML = stories[id].text;
          storyPopup.style.display = "flex";

          // Scroll to top of popup just in case
          storyPopup.scrollTop = 0;
        }
      });
    });


    closeStory.addEventListener("click", () => {
      storyPopup.style.display = "none";
      storyVideo.pause();
      storyVideo.currentTime = 0;
      storyVideo.src = "";
      document.body.style.overflow = ""; // allow scroll again

    });

    if (speedSelect) {
      speedSelect.addEventListener("change", (e) => {
        storyVideo.playbackRate = parseFloat(e.target.value);
      });
    }
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
        content.style.display = "none";
      } else {
        content.classList.add("open");
        btn.classList.add("rotate");
        content.style.display = "block";
      }
    });
  });

  // ========== CV Upload ==========
  const fileInput = document.getElementById("cv");
  const chooseFileBtn = document.getElementById("chooseFileBtn");
  const fileNameDisplay = document.getElementById("fileName");
  const removeFileBtn = document.getElementById("removeFileBtn");
  const form = document.querySelector(".cv-form");

  chooseFileBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      fileNameDisplay.textContent = fileInput.files[0].name;
      removeFileBtn.style.display = "inline";
    } else {
      fileNameDisplay.textContent = "No file chosen";
      removeFileBtn.style.display = "none";
    }
  });

  removeFileBtn.addEventListener("click", () => {
    fileInput.value = "";
    fileNameDisplay.textContent = "No file chosen";
    removeFileBtn.style.display = "none";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("submit_cv.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        alert(result);
        form.reset();
        fileNameDisplay.textContent = "No file chosen";
        removeFileBtn.style.display = "none";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });

  // ========== Event Tab Modal ==========
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

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((btn) => btn.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");

      filteredItems = [...items].filter((item) =>
        item.getAttribute("data-category") === category
      );

      items.forEach((item) => {
        item.style.display =
          item.getAttribute("data-category") === category ? "block" : "none";
      });

      currentIndex = 0;
    });
  });

  window.addEventListener("DOMContentLoaded", () => {
    tabs[0].click();
  });

  function openModal(index) {
    const item = filteredItems[index];
    modalImg.src = item.querySelector("img").src;
    modalDesc.textContent = item.getAttribute("data-description");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    currentIndex = index;
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  function navigateModal(dir) {
    currentIndex += dir;
    if (currentIndex < 0) currentIndex = filteredItems.length - 1;
    if (currentIndex >= filteredItems.length) currentIndex = 0;
    openModal(currentIndex);
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      filteredItems = [...items].filter((i) => i.style.display !== "none");
      currentIndex = filteredItems.indexOf(item);
      openModal(currentIndex);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", () => navigateModal(-1));
  modalNext.addEventListener("click", () => navigateModal(1));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});
