document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const sideMenu = document.querySelector("#sideMenu");
  const sideMenuOverlay = document.querySelector("#sideMenuOverlay");
  const sideMenuClose = document.querySelector(".side-menu-close");
  const sideMenuLinks = document.querySelectorAll(".side-menu-link");

  if (!menuToggle || !sideMenu || !sideMenuOverlay || !sideMenuClose) return;

  function openMenu() {
    menuToggle.classList.add("is-active");
    menuToggle.setAttribute("aria-expanded", "true");
    sideMenu.classList.add("is-open");
    sideMenuOverlay.classList.add("is-open");
    sideMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
    sideMenu.classList.remove("is-open");
    sideMenuOverlay.classList.remove("is-open");
    sideMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = sideMenu.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  sideMenuClose.addEventListener("click", closeMenu);
  sideMenuOverlay.addEventListener("click", closeMenu);

  sideMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sideMenu.classList.contains("is-open")) {
      closeMenu();
    }
  });
});


const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function scrambleText(element, finalText, duration = 4000) {
  let iteration = 0;
  const length = finalText.length;
  const intervalTime = duration / length;

  // show something immediately before scrambling starts
  element.innerText = finalText;

  const interval = setInterval(() => {
    element.innerText = finalText
      .split("")
      .map((char, index) => {
        if (char === " ") return " ";
        if (index < iteration) return finalText[index];
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    iteration += 1;

    if (iteration > length) {
      clearInterval(interval);
      element.innerText = finalText;
    }
  }, intervalTime);
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".scramble");

  elements.forEach((el) => {
    const text = el.getAttribute("data-text");
    el.innerText = text; // all appear first
  });

  setTimeout(() => {
    elements.forEach((el) => {
      const text = el.getAttribute("data-text");
      scrambleText(el, text, 4000);
    });
  }, 200);
});


const nav = document.querySelector(".site-nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    nav.classList.add("is-sticky");
  } else {
    nav.classList.remove("is-sticky");
  }
});

const scrollbarThumb = document.querySelector(".custom-scrollbar-thumb");

function updateCustomScrollbar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;

  const scrollable = docHeight - winHeight;

  if (scrollable <= 0) {
    scrollbarThumb.style.height = "0px";
    return;
  }

  const thumbHeight = Math.max((winHeight / docHeight) * winHeight, 40);
  const maxThumbMove = winHeight - thumbHeight;
  const thumbTop = (scrollTop / scrollable) * maxThumbMove;

  scrollbarThumb.style.height = `${thumbHeight}px`;
  scrollbarThumb.style.transform = `translateY(${thumbTop}px)`;
}

window.addEventListener("scroll", updateCustomScrollbar);
window.addEventListener("resize", updateCustomScrollbar);
window.addEventListener("load", updateCustomScrollbar);
updateCustomScrollbar();
