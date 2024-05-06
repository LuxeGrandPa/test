const headerContainer = document.getElementById("header-container"); // header container
const header = document.getElementById("header"); // header
window.addEventListener("scroll", activeHeader); // change header class on scroll

function activeHeader() {
  let headerContainerTop = headerContainer.getBoundingClientRect().top; // get header distance from top
  // add "active" class if user scrolls down on page to the header
  if (headerContainerTop < 0) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

const menuContainer = document.getElementById("menu-container");
let menuActivators = document.querySelectorAll(".menu-activator");

menuActivators.forEach((activator) => {
  activator.addEventListener("click", () => {
    menuActivators.forEach((el) => el.classList.toggle("active"));
    menuContainer.classList.toggle("active");
  });
});

const submenuContainers = document.querySelectorAll(".sm-sub-container");
const submenuActivator = document.querySelectorAll(".sm-sub-activator");
const submenu = document.querySelectorAll(".sub-menu");

submenuActivator.forEach((el, index) => {
  el.addEventListener("click", function () {
    submenuContainers[index].classList.toggle("active");
    let selected = submenu[index];
    let buttonsCount = selected.childElementCount;
    let submittedHeight = 27 * (buttonsCount - 1) + 32;
    let currentHeight = selected.getBoundingClientRect().height;

    if (currentHeight == submittedHeight) {
      let tempHeight = submittedHeight;
      while (tempHeight > 0) {
        tempHeight--;
        selected.style.height = tempHeight + "px";
      }
    } else {
      let tempHeight = 0;
      while (tempHeight < submittedHeight) {
        tempHeight++;
        selected.style.height = tempHeight + "px";
      }
    }
  });
});

let isDraggingMenu = false;
let movement;

menuContainer.addEventListener("touchstart", function (event) {
  let firstPos = event.touches[0].clientX;
  isDraggingMenu = true;
  this.style.transition = "none";

  this.addEventListener("touchmove", function (e) {
    movement = e.touches[0].clientX - firstPos;
    if (isDraggingMenu && movement > 0) {
      this.style.transform = `translateX(${movement}px)`;
    }
  });
});

window.addEventListener("touchend", () => {
  if (movement > 150) {
    menuActivators.forEach((el) => el.classList.remove("active"));
    menuContainer.classList.remove("active");
  }
  isDraggingMenu = false;
  menuContainer.removeAttribute("style");
});
