document.addEventListener("DOMContentLoaded", () => {
  // ========== Sticky Header & Active Section Highlight ==========
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // Sticky hide/show logic
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    // Active link highlight
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


  // ========== Wish Group Text Animation ==========
  const spans = document.querySelectorAll("#wishgroupText span");
  let scrollTicks = 0;
  let index = 0;
  let lockScroll = true;

  // Set up: hide all letters
  spans.forEach(span => span.classList.remove("visible"));

  // Lock page scroll
  document.body.style.overflow = "hidden";

  // Scroll listener
  window.addEventListener("wheel", function (e) {
    if (!lockScroll) return;

    e.preventDefault();

    if (e.deltaY > 0) {
      scrollTicks++;
      if (scrollTicks >= 2 && index < spans.length) {
        spans[index].classList.add("visible");
        index++;
        scrollTicks = 0;
      }
    } else {
      scrollTicks++;
      if (scrollTicks >= 2 && index > 0) {
        index--;
        spans[index].classList.remove("visible");
        scrollTicks = 0;
      }
    }

    // Unlock scroll if all dropped
    if (index === spans.length) {
      lockScroll = false;
      document.body.style.overflow = "auto";
    }
  }, { passive: false });

  // ========== AOS Init ==========
  if (typeof AOS !== "undefined") {
    AOS.init({
      once: true,
      duration: 800,
    });
  }

  // ========== Language Dropdown ==========
  const langToggle = document.querySelector(".lang-toggle");
  const langMenu = document.querySelector(".lang-menu");
  const currentLangText = document.getElementById("current-lang-text");

  if (langToggle && langMenu && currentLangText) {
    langToggle.addEventListener("click", () => {
      langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
    });

    document.querySelectorAll(".lang-menu li").forEach(item => {
      item.addEventListener("click", () => {
        const selectedLang = item.getAttribute("data-lang");
        currentLangText.textContent = selectedLang.toUpperCase();
        langMenu.style.display = "none";
        // updateI18n(selectedLang); // hook into i18n if needed
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
        storyVideo.src = stories[id].video;
        storyVideo.poster = stories[id].poster;
        storyText.innerHTML = stories[id].text;
        storyPopup.style.display = "flex";
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

  // ========== CV Upload Functionality ==========
  const fileInput = document.getElementById("cv");
  const chooseFileBtn = document.getElementById("chooseFileBtn");
  const fileNameDisplay = document.getElementById("fileName");
  const removeFileBtn = document.getElementById("removeFileBtn");
  const form = document.querySelector(".cv-form");

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

// Filtering
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

    // Reset index
    currentIndex = 0;
  });
});

// Show only first category on load
window.addEventListener("DOMContentLoaded", () => {
  tabs[0].click();
});

// Modal logic
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

// Event listeners
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    filteredItems = [...items].filter(
      (i) => i.style.display !== "none"
    );
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
