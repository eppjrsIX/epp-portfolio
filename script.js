// Word Animation ////////////////////////////////////////////////////////////////////////////
const words = document.querySelectorAll(".word");
words.forEach((word) => {
  const letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
const maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

function changeText() {
  const currentWord = words[currentWordIndex];
  const nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
}

changeText();
setInterval(changeText, 3000);

// Mixitup Portfolio ////////////////////////////////////////////////////////////////////////////
const mixer = mixitup(".portfolio-gallery");

// Active Menu ////////////////////////////////////////////////////////////////////////////
const menuLi = document.querySelectorAll("header ul li a");
const sections = document.querySelectorAll("section");

function activeMenu() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
  menuLi.forEach((sec) => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

// Sticky Navbar ////////////////////////////////////////////////////////////////////////////
const header = document.querySelector("header");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
  });
}

// Toggle Icon Navbar ////////////////////////////////////////////////////////////////////////////
const menuIcon = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");
if (menuIcon) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
  };
  window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
  };
}

// Parallax ////////////////////////////////////////////////////////////////////////////
function observeElements(elements) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-items");
      } else {
        entry.target.classList.remove("show-items");
      }
    });
  });

  elements.forEach((el) => observer.observe(el));
}

observeElements(document.querySelectorAll(".scroll-scale"));
observeElements(document.querySelectorAll(".scroll-bottom"));
observeElements(document.querySelectorAll(".scroll-top"));

// Asking Permission When Clicking Links ////////////////////////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", function () {
//   const links = document.querySelectorAll(".contact-links a");

//   links.forEach(function (link) {
//     link.addEventListener("click", function (event) {
//       const confirmNavigation = confirm("Do you want to proceed to this link?");
//       if (!confirmNavigation) {
//         event.preventDefault();
//       }
//     });
//   });
// });
// Code for asking permission on link click

// Show More Buttons ////////////////////////////////////////////////////////////////////////////
document.querySelectorAll(".read-more").forEach((button) => {
  button.addEventListener("click", function () {
    const textBox = this.closest(".text-box");
    const hiddenText = textBox.querySelector(".hidden-text");
    if (hiddenText) {
      hiddenText.style.display =
        hiddenText.style.display === "none" || hiddenText.style.display === ""
          ? "inline"
          : "none";
      this.textContent =
        hiddenText.style.display === "none" ? "Read More" : "Show Less";
    }
  });
});

// Animation on Scroll Logic for About Section ////////////////////////////////////////////////////////////////////////////
const aboutSection = document.getElementById("about-section");
if (aboutSection) {
  window.addEventListener("scroll", () => {
    const aboutSectionPosition = aboutSection.getBoundingClientRect().top;
    const tlContainer = document.querySelector(".tl-container");
    const timelineAfter = document.querySelector(".timeline::after");
    if (aboutSectionPosition < window.innerHeight && aboutSectionPosition > 0) {
      if (tlContainer) tlContainer.classList.add("animate-container");
      if (timelineAfter) timelineAfter.classList.add("animate-line");
    } else {
      if (tlContainer) tlContainer.classList.remove("animate-container");
      if (timelineAfter) timelineAfter.classList.remove("animate-line");
    }
  });
}

// Intersection Observer for About Section Scroll Reveal Effects ////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector("#about");
  const tlContainers = document.querySelectorAll(".tl-container");
  const timeline = document.querySelector(".timeline");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timeline.classList.add("visible");
        tlContainers.forEach((container, index) => {
          setTimeout(() => {
            container.classList.add("visible");
          }, index * 1000); // Staggered delay for each container
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  aboutObserver.observe(aboutSection);
});

// Modal ////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const previewBtns = document.querySelectorAll(".preview-btn");
  const modal = document.getElementById("popup-modal");
  const modalImg = document.getElementById("popup-img");
  const closeModal = document.querySelector(".close");

  previewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Button clicked");
      const imgSrc = btn.getAttribute("data-img");
      console.log("Image source:", imgSrc);
      modalImg.src = imgSrc;
      modal.style.display = "block";
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      if (modal) {
        modal.style.display = "none";
      } else {
        console.error("Modal element not found.");
      }
    });
  } else {
    console.error("Close button element not found.");
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Manage the active state of filter buttons
document.addEventListener("DOMContentLoaded", (event) => {
  // Cache the portfolio gallery element
  const portfolioGallery = document.querySelector(".portfolio-gallery");

  // Function to initialize MixItUp if not already initialized
  const initializeMixItUp = () => {
    if (!portfolioGallery.mixitupInstance) {
      portfolioGallery.mixitupInstance = mixitup(portfolioGallery);
    }
  };

  // Call the function to initialize MixItUp
  initializeMixItUp();

  // Cache the filter buttons
  const buttons = document.querySelectorAll(".filter-buttons .button");

  // Add event listeners to buttons
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to the clicked button
      this.classList.add("active");
    });
  });
});
