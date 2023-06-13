const button = document.getElementById("fullscreen-button");
const blankPage = document.getElementById("blank-page");
const blankPageText = document.getElementById("blank-page-text");
let isBlankPageVisible = false;

button.addEventListener("click", toggleBlankPage);

function toggleBlankPage() {
  if (isBlankPageVisible) {
    hideBlankPage();
  } else {
    showBlankPage();
  }
}

function showBlankPage() {
  blankPage.style.display = "flex";
  isBlankPageVisible = true;
  button.removeEventListener("click", toggleBlankPage);
  button.addEventListener("click", hideBlankPage);

  gsap.to(blankPage, { height: "100%", duration: 0.5, ease: "power2.out" });
}

function hideBlankPage() {
  gsap.to(blankPage, {
    height: 1.5,
    duration: 0.5,
    ease: "power2.in",
    onComplete: resetBlankPage,
  });

  isBlankPageVisible = false;
  button.removeEventListener("click", hideBlankPage);
  button.addEventListener("click", showBlankPage);
}

function resetBlankPage() {
  blankPage.style.display = "none";
  blankPage.style.height = 0;
}

// Masquer la page blanche au chargement du site
window.addEventListener("DOMContentLoaded", function () {
  blankPage.style.display = "none";
});

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollTrigger.normalizeScroll(true);

// create the smooth scroller FIRST!
let smoother = ScrollSmoother.create({
  smooth: 2,
  effects: true,
});

// pin box-c when it reaches the center of the viewport, for 300px
ScrollTrigger.create({
  trigger: ".box-c",
  pin: true,
  start: "center center",
  end: "+=300",
  markers: true,
});

document.querySelector("button").addEventListener("click", (e) => {
  // scroll to the spot where .box-c is in the center.
  // parameters: element, smooth, position
  smoother.scrollTo(".box-c", true, "center center");

  // or you could animate the scrollTop:
  // gsap.to(smoother, {
  // 	scrollTop: smoother.offset(".box-c", "center center"),
  // 	duration: 1
  // });
});
