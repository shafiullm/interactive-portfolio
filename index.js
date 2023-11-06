let character = document.getElementById("character");
let clouds = document.getElementById("clouds");
let houses = document.getElementById("buildingSmall");
let housesBack = document.getElementById("buildingLarge");
let platform = document.getElementById("platform");
let mainLayer = document.getElementById("main-layer");
let position = 50;
const step = 100;
let blinkText = true;
let timeout;
const isMobile =
  /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

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
        entry.target.classList.contains("skill1-observer")
      ) {
        animateSkillsTree("design");
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("skill2-observer")
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
observer.observe(document.querySelector(".skill1-observer"));
observer.observe(document.querySelector(".skill2-observer"));
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
  let timeout;
  anime({
    targets: `#${name}-tree`,
    translateY: -670,
    delay: anime.stagger(150, { direction: "normal" }),
    complete: function (anim) {
      anime({
        targets: `#${name}-tree`,
        scale: 1.1,
        duration: 1000,
        easing: "easeInOutSine",
        complete: function (anim) {
          anime({
            targets: `#${name}-tree`,
            scale: 1,
            duration: 800,
            easing: "easeInOutSine",
            complete: function (anim) {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                animateDashLines(name);
              }, 500);
            },
          });
        },
      });
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
    opacity: 1,
    easing: "linear",
    duration: 2000,
  });

  setTimeout(() => {
    anime({
      targets: `.${name}`,
      translateY: 0,
      opacity: 0,
      easing: "linear",
      duration: 2000,
    });
  }, 15000);
}

const flashLight = document.querySelector(".flashLight");
flashLight.style.opacity = 0;
function animateHobbies() {
  anime({
    targets: ".hobbies",
    translateY: -402,
    delay: 250,
    easing: "easeOutQuad",
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

function stopBlinkText() {
  const blinkTextDiv = document.querySelector("#instruction-text");
  const tapToMoveDiv = document.querySelector("#tapToMove-container");
  blinkTextDiv.classList.remove("blink");
  blinkTextDiv.style.opacity = 0;
  tapToMoveDiv.classList.remove("blink");
  blinkText = false;
}

animateOpeningBoard = () => {
  anime({
    targets: "#signboard",
    translateY: -425,
    delay: anime.stagger(100, { start: 500 }),
  });
};

var cInterval;
var characterAnimationPosition = 320;
var characterAnimationImages = [];
var characterAnimationImageURLs = [
  "./assets/character/scooter-left.png",
  "./assets/character/scooter-right.png",
];
characterAnimationImageURLs.forEach((url) => {
  var img = new Image();
  img.src = url;
  characterAnimationImages.push(img);
});

function stopCharacterAnimation() {
  clearInterval(cInterval);
}

function animateCharacter(side) {
  const interval = 170;
  const diff = 320;

  cInterval = setInterval(() => {
    character = document.getElementById("character");
    character.style.backgroundImage = `url("${
      characterAnimationImages[side === "left" ? 0 : 1].src
    }")`;
    character.style.backgroundPosition = `-${characterAnimationPosition}px 0px`;

    if (characterAnimationPosition < 960) {
      characterAnimationPosition = characterAnimationPosition + diff;
    } else {
      stopCharacterAnimation();
      characterAnimationPosition = 320;
    }
  }, interval);
}

function moveCharacter(direction) {
  console.log("Position:", position);
  if (blinkText) {
    stopBlinkText();
  }
  if (direction === "left") {
    if (position < 10) {
      return;
    }
    stopCharacterAnimation();
    animateCharacter("left");
    position -= step;
  } else if (direction === "right") {
    if (position > 10250) {
      return;
    }
    stopCharacterAnimation();
    animateCharacter("right");
    position += step;
  }

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

function navigateTV(option) {
  document.querySelector(".instruction-tv").style.visibility = "hidden";
  if (option === "design") {
    document.querySelector(".developer-box-bg").style.visibility = "hidden";
    document.querySelector(".design-box-bg").style.visibility = "visible";
  } else if (option === "developer") {
    document.querySelector(".developer-box-bg").style.visibility = "visible";
    document.querySelector(".design-box-bg").style.visibility = "hidden";
  }
}

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

let holdTimeout = null;
let isHolding = false;

document
  .querySelector(".left-arrow")
  .addEventListener("touchstart", function (event) {
    event.preventDefault();
    isHolding = true;
    holdTimeout = setTimeout(continuousMove.bind(null, "left"), 200);
  });

document
  .querySelector(".right-arrow")
  .addEventListener("touchstart", function (event) {
    event.preventDefault();
    isHolding = true;
    holdTimeout = setTimeout(continuousMove.bind(null, "right"), 200);
  });

document.querySelector(".left-arrow").addEventListener("touchend", function () {
  isHolding = false;
  clearTimeout(holdTimeout);
});

document
  .querySelector(".right-arrow")
  .addEventListener("touchend", function () {
    isHolding = false;
    clearTimeout(holdTimeout);
  });

function continuousMove(direction) {
  if (isHolding) {
    moveCharacter(direction);
    holdTimeout = setTimeout(continuousMove.bind(null, direction), 200);
  }
}

function detectMobileDevice() {
  if (isMobile) {
    document.getElementById("instruction-text").textContent =
      "Tap on Left or Right Side of the Platform to Move";
    document.querySelector("#tapToMove-container").style.opacity = 1;
  }
}

window.addEventListener("load", (event) => {
  setTimeout(function () {
    document.getElementById("preloader").style.display = "none";
  }, 1000);

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

  setTimeout(() => {
    animateOpeningBoard();
  }, 1000);

  detectMobileDevice();
});

function openHobbiesText(type) {
  const textBox = document.querySelector(".hobbies-text-box");
  const paragraph = document.querySelector(".hobbies-paragraph");
  textBox.style.opacity = 0;
  textBox.style.visibility = "visible";
  textBox.style.transform = "translateY(100px)";
  if (type === "photography") {
    paragraph.textContent =
      "Ah, Shafi, the photographic prodigy, has been perfecting his craft since the dawn of time. Only a mere 5% (also only the edited and manipulated ones) of his otherworldly shots grace his Instagram. And just when you thought he was a one-trick pony, brace yourself for his epic videography skills, where only a few edited ones are showcased in those Instagram stories.";
  } else if (type === "crafting") {
    paragraph.textContent =
      "Shafi, the creative maestro, soaked up Art Attack and MAD since childhood. Despite deviating from his dream of architecture (thanks to endless hours spent on playing SimCity, Cities XL, and RollerCoaster Tycoon) to pursue computer science, his love for crafting remains unwavering. With popsicles and glue guns in hand, he's all set to dive back into his artistic escapades.";
  } else if (type === "travelling") {
    paragraph.textContent =
      "Shafi, the perpetual explorer, thrives on capturing the world through his lens while journeying across landscapes. Despite limited childhood travels, he's been uncovering the beauty of his own country lately. Yet, the allure of global adventure tugs at his soul, urging him to break free from the confines of his hometown. Fingers crossed for that opportunity to explore the uncharted corners of the world!";
  } else if (type === "gaming") {
    paragraph.textContent =
      "Shafi, the born gamer, started conquering pixels at the age of 3, from DX Ball to Call of Duty 4, FIFA, and NFS Most Wanted 2005 at age 9 in Gameranger. After a detour in competitive League of Legends and CS:GO, he's now ruling Valorant with his crew, proving that some things just never change, even as an adult. He's also invested in his sim racing wheel and the VR world.";
  } else if (type === "cooking") {
    paragraph.textContent =
      "Ah, the kitchen prodigy, Shafi, started his culinary adventures at a ripe 7 as he remembers, conjuring up memories of whipping ravioli for his dear nanu. From his humble microwave oven cakes to his triumph in mastering Italian delicacies, he's now the ultimate maestro, effortlessly maneuvering through the realms of pizza, ramen, and beyond. Watch out, Gordon Ramsay!";
  }

  anime({
    targets: ".hobbies-text-box",
    translateY: 0,
    opacity: 1,
    visibility: "visible",
    easing: "linear",
    duration: 1000,
    delay: 0,
  });

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    anime({
      targets: ".hobbies-text-box",
      translateY: 100,
      opacity: 0,
      visibility: "hidden",
      easing: "linear",
      duration: 500,
      delay: 0,
    });
  }, 15000);
}

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

function redirect(type) {
  var targetURL;
  if (type === "browse-all") openBehance();
  else if (type === "uiux")
    targetURL = "https://www.behance.net/gallery/182786365/UIUX-Design";
  else if (type === "animated")
    targetURL = "https://www.behance.net/gallery/110075935/Promotional-Videos";
  else if (type === "graphics")
    targetURL =
      "https://www.behance.net/gallery/89831675/Flyers-Banners-Cards-Others";
  else if (type === "promos")
    targetURL = "https://www.behance.net/gallery/85478355/Portfolio-Video";
  else if (type === "logos")
    targetURL = "https://www.behance.net/gallery/85479043/Logo-Designs";
  window.open(targetURL, "_blank");
}
