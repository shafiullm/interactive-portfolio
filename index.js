let character = document.getElementById("character");
let clouds = document.getElementById("clouds");
let houses = document.getElementById("buildingSmall");
let housesBack = document.getElementById("buildingLarge");
let platform = document.getElementById("platform");
let mainLayer = document.getElementById("main-layer");
let position = 50;
const step = 200;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("hobbies-observer")
      ) {
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
        entry.target.classList.contains("skill-category-design")
      ) {
        animateSkillsTree("design");
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("skill-category-code")
      ) {
        animateSkillsTree("code");
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("work1-observer")
      ) {
        animateWorkExperience("1");
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("work2-observer")
      ) {
        animateWorkExperience("2");
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("work3-observer")
      ) {
        animateWorkExperience("3");
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("work4-observer")
      ) {
        animateWorkExperience("4");
      }
    });
  },
  { threshold: 0.1 }
);

observer.observe(document.querySelector(".hobbies-observer"));
observer.observe(document.querySelector(".rumc"));
observer.observe(document.querySelector(".brac"));
observer.observe(document.querySelector(".skill-category-design"));
observer.observe(document.querySelector(".skill-category-code"));
observer.observe(document.querySelector(".work1-observer"));
observer.observe(document.querySelector(".work2-observer"));
observer.observe(document.querySelector(".work3-observer"));
observer.observe(document.querySelector(".work4-observer"));

function animateWorkExperience(number) {
  anime({
    targets: `.work-experience-${number}`,
    translateY: -500,
    endDelay: 5000,
    direction: "alternate",
  });
}

function animateSkillsTree(name) {
  anime({
    targets: `#${name}-tree`,
    translateY: -670,
    delay: anime.stagger(150, { direction: "normal" }),
    complete: function (anim) {
      animateDashLines(name);
    },
  });
}

function animateDashLines(name) {
  anime({
    targets: `#dash-lines-${name}`,
    opacity: 1,
    duration: 150,
    easing: "linear",
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

function openGmail() {
  var email = "shafiullm@gmail.com";
  var subject = "[From Interactive Resume Website]";
  var body = "Your message here";
  window.open(
    "mailto:" + email + "?subject=" + subject + "&body=" + body,
    "_blank"
  );
}

function openInstagram() {
  var instagramURL = "https://www.instagram.com/shafiullm";
  window.open(instagramURL, "_blank");
}

function openFacebook() {
  var instagramURL = "https://facebook.com/shafiullm";
  window.open(instagramURL, "_blank");
}

function openGithub() {
  var instagramURL = "https://github.com/shafiullm";
  window.open(instagramURL, "_blank");
}

function openLinkedIn() {
  var instagramURL = "https://www.instagram.com/shafiullm";
  window.open(instagramURL, "_blank");
}

function openBehance() {
  var instagramURL = "https://www.behance.net/shafiullm";
  window.open(instagramURL, "_blank");
}
