const button = document.getElementById("fullscreen-button");
button.addEventListener("click", toggleFullScreen);

let isBlankPageVisible = false;
let blankPage = null;

function toggleFullScreen() {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      hideBlankPage();
    } else {
      element.requestFullscreen();
      showBlankPage();
    }
  } else if (element.mozRequestFullScreen) {
    if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();
      hideBlankPage();
    } else {
      element.mozRequestFullScreen();
      showBlankPage();
    }
  } else if (element.webkitRequestFullscreen) {
    if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
      hideBlankPage();
    } else {
      element.webkitRequestFullscreen();
      showBlankPage();
    }
  } else if (element.msRequestFullscreen) {
    if (document.msFullscreenElement) {
      document.msExitFullscreen();
      hideBlankPage();
    } else {
      element.msRequestFullscreen();
      showBlankPage();
    }
  }
}

function showBlankPage() {
  if (!isBlankPageVisible) {
    blankPage = document.createElement("div");
    blankPage.classList.add("blank-page");
    document.body.appendChild(blankPage);

    gsap.fromTo(
      blankPage,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.5, ease: "power2.out" }
    );

    isBlankPageVisible = true;
    button.removeEventListener("click", toggleFullScreen);
    button.addEventListener("click", hideBlankPage);
  }
}

function hideBlankPage() {
  if (isBlankPageVisible) {
    gsap.to(blankPage, {
      scaleY: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: removeBlankPage,
    });

    isBlankPageVisible = false;
    button.removeEventListener("click", hideBlankPage);
    button.addEventListener("click", toggleFullScreen);
  }
}

function removeBlankPage() {
  if (blankPage && blankPage.parentNode) {
    blankPage.parentNode.removeChild(blankPage);
    blankPage = null;
  }
}
