const menu = document.querySelector(".navbar div:has(ul)");
const toggleMenuButton = document.querySelector("#toggle-menu-button");

toggleMenuButton.addEventListener("click", () => {
  menu.classList.toggle("toggle-menu");
});

window.addEventListener("resize", function () {
  if (window.innerWidth >= 992) {
    menu.classList.remove("toggle-menu");
  }
});
