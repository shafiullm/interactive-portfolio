let character = document.getElementById("character");
let clouds = document.getElementById("clouds");
let houses = document.getElementById("buildingSmall");
let housesBack = document.getElementById("buildingLarge");
let platform = document.getElementById("platform");
let mainLayer = document.getElementById("main-layer");
let position = 50;
const step = 50;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.classList.contains("hobbies")) {
        animateHobbies();
      }
      if (entry.isIntersecting && entry.target.classList.contains("rumc")) {
        animateEducation("education1");
      }
      if (entry.isIntersecting && entry.target.classList.contains("brac")) {
        animateEducation("education2");
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("skill-trees")
      ) {
        animateSkillsTree();
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(document.querySelector(".hobbies"));
observer.observe(document.querySelector(".rumc"));
observer.observe(document.querySelector(".brac"));
observer.observe(document.querySelector(".skill-trees"));

function animateSkillsTree() {
  anime({
    targets: "#design-tree",
    translateX: 670,
    delay: anime.stagger(150, { direction: "normal" }),
  });
}

function animateEducation(name) {
  anime({
    targets: `.${name}`,
    translateY: -1029,
    easing: "linear",
  });
}

const flashLight = document.querySelector(".flashLight");
flashLight.style.opacity = 0;
const shutterSound = "./assets/cameraShutter.mp3";
function playSound() {
  const sound = new Audio(shutterSound);
  sound.play();
}
function animateHobbies() {
  anime({
    targets: ".hobbies",
    translateY: -402,
    opacity: 1,
    easing: "easeOutQuad",
    complete: playSound,
  });

  const flashLight = document.querySelector(".flashLight");
  flashLight.style.opacity = 0;

  anime({
    targets: ".flashLight",
    opacity: 1,
    duration: 500,
    delay: 1000,
    easing: "linear",
  });

  setTimeout(() => {
    anime({
      targets: ".flashLight",
      opacity: 0,
      duration: 250,
      easing: "linear",
    });
  }, 1500);
}

animateOpeningBoard = () => {
  anime({
    targets: "#signboard",
    translateY: -425,
    delay: anime.stagger(100, { start: 500 }),
  });
};

function moveCharacter(direction) {
  if (direction === "left") {
    if (position < 10) {
      return;
    }
    position -= step;
  } else if (direction === "right") {
    if (position > 10250) {
      return;
    }
    position += step;
  }
  console.log(position);

  anime({
    targets: houses,
    backgroundPositionX: -position * 2 + "px",
    easing: "easeOutQuad",
  });

  anime({
    targets: housesBack,
    backgroundPositionX: -position * 1.8 + "px",
    easing: "easeOutQuad",
  });

  anime({
    targets: platform,
    backgroundPositionX: -position * 2 + "px",
    easing: "easeOutQuad",
  });

  anime({
    targets: mainLayer,
    translateX: -position * 2 + "px",
    easing: "easeOutQuad",
  });
}

document.getElementById("designer-btn").addEventListener("click", function () {
  let url = "https://www.behance.net/shafiullm";
  let win = window.open(url, "_blank");
  win.opener = null;
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveCharacter("left");
  } else if (event.key === "ArrowRight") {
    moveCharacter("right");
  }
});

window.addEventListener("wheel", function (event) {
  if (event.deltaY < 0) {
    moveCharacter("right");
  } else {
    moveCharacter("left");
  }
});

// Mobile Swipe Support
let initialX = null;

document.addEventListener("touchstart", function (event) {
  initialX = event.touches[0].clientX;
});

document.addEventListener("touchmove", function (event) {
  if (initialX === null) {
    return;
  }

  let currentX = event.touches[0].clientX;

  let diffX = initialX - currentX;

  if (diffX > 0) {
    moveCharacter("left");
  } else {
    moveCharacter("right");
  }

  initialX = null;
});

window.addEventListener("load", (event) => {
  animateOpeningBoard();
});
