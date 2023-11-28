let character = document.getElementById("character");
let clouds = document.getElementById("clouds");
let houses = document.getElementById("buildingSmall");
let housesBack = document.getElementById("buildingLarge");
let platform = document.getElementById("platform");
let mainLayer = document.getElementById("main-layer");
let tapToMove = document.querySelector(".tapToMove-container");
let position = 50;
const step = 100;
let hasReachedEnd = false;
let blinkText = true;
let catStep = 0;
const endPosition = 9750;
let atEndPosition = false;
let timeout;

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
        animateEducation("education1", education1Animated);
        animateYellowBird();
      }
      if (entry.isIntersecting && entry.target.classList.contains("brac")) {
        animateEducation("education2", education2Animated);
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
        entry.target.classList.contains("portfolio-observer")
      ) {
        if (catStep == 0) animateCat();
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("work1-observer")
      ) {
        animateWorkExperience("1", work1Animated);
        animateBlueBird();
        if (catStep == 1) animateCat();
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("work2-observer")
      ) {
        animateYellowBird();
        animateWorkExperience("2", work2Animated);
        if (catStep == 2) animateCat();
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("work3-observer")
      ) {
        animateWorkExperience("3", work3Animated);
        if (catStep == 3) animateCat();
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("work4-observer")
      ) {
        animateWorkExperience("4", work4Animated);
      }
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("findMe-observer")
      ) {
        // animateFindMe();
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
observer.observe(document.querySelector(".portfolio-observer"));
observer.observe(document.querySelector(".work1-observer"));
observer.observe(document.querySelector(".work2-observer"));
observer.observe(document.querySelector(".work3-observer"));
observer.observe(document.querySelector(".work4-observer"));
observer.observe(document.querySelector(".findMe-observer"));

let work1Animated = false;
let work2Animated = false;
let work3Animated = false;
let work4Animated = false;

function animateWorkExperience(number, alreadyAnimatedFlag) {
  if (alreadyAnimatedFlag) {
    return;
  }

  if (number === "1") {
    work1Animated = true;
    animateSecondWorkAnimationFirst(number);
  } else if (number === "2") {
    work2Animated = true;
    animateSecondWorkAnimationFirst(number);
  } else if (number === "3") {
    work3Animated = true;
    animateSecondWorkAnimationFirst(number);
  } else if (number === "4") {
    work4Animated = true;
    animateSecondWorkAnimationFirst(number);
  }

  anime({
    targets: `.work-experience-${number}`,
    translateY: -500,
    endDelay: 10000,
    direction: "alternate",
    complete: function (anim) {
      animateSecondWorkAnimation(number);
    },
  });
}

function animateSecondWorkAnimationFirst(number) {
  anime({
    targets: [`#wbb-${number}`, `#wbf-${number}`],
    translateY: [
      { value: -150, duration: 200, easing: "easeInOutQuad" },
      { value: 0, duration: 175, easing: "easeInOutQuad" },
    ],
  });
}

function animateSecondWorkAnimation(number) {
  anime({
    targets: [`#wbb-${number}`, `#wbf-${number}`],
    translateY: [
      { value: -150, duration: 200, easing: "easeInOutQuad" },
      { value: 0, duration: 175, easing: "easeInOutQuad" },
    ],
    complete: function () {
      if (number === "1") {
        work1Animated = false;
      } else if (number === "2") {
        work2Animated = false;
      } else if (number === "3") {
        work3Animated = false;
      } else if (number === "4") {
        work4Animated = false;
      }
    },
  });
}

function animateSkillsTree(name) {
  let timeout;
  anime({
    targets: `#${name}-tree`,
    translateY: -670,
    delay: anime.stagger(200, { direction: "normal" }),
    // complete: function (anim) {
    //   anime({
    //     targets: `#${name}-tree`,
    //     filter: "hue-rotate(360deg)",
    //     duration: 1000,
    //     easing: "easeInOutSine",
    complete: function (anim) {
      anime({
        targets: `#${name}-tree`,
        filter: "hue-rotate(360deg)",
        duration: 2000,
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
}
//   });
// }

function animateDashLines(name) {
  anime({
    targets: `#dash-lines-${name}`,
    opacity: 1,
    duration: 150,
    easing: "linear",
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

let education1Animated = false;
let education2Animated = false;

function animateEducation(name, alreadyAnimatedFlag) {
  if (alreadyAnimatedFlag) {
    return; // Don't run the animation if it has already been animated
  }

  anime({
    targets: `.${name}`,
    translateY: -1029,
    opacity: 1,
    easing: "linear",
    duration: 2000,
    complete: function () {
      // Set the flag to indicate that the animation has completed
      if (name === "education1") {
        education1Animated = true;
      } else if (name === "education2") {
        education2Animated = true;
      }
    },
  });

  setTimeout(() => {
    anime({
      targets: `.${name}`,
      translateY: 0,
      opacity: 0,
      easing: "linear",
      duration: 2000,
      complete: function () {
        // Set the flag to indicate that the animation has completed
        if (name === "education1") {
          education1Animated = false;
        } else if (name === "education2") {
          education2Animated = false;
        }
      },
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
    complete: function (anim) {
      anime({
        targets: ".hobbies-instruction",
        opacity: 1,
        duration: 500,
        easing: "easeInQuad",
      });
    },
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
  const arrow = document.querySelectorAll(".arrow");
  // const swipeToMoveDiv = document.querySelector("#swipeToMove-container");
  arrow.forEach((arrows) => {
    arrows.classList.remove("blink");
    arrows.style.opacity = 0;
  });
  blinkTextDiv.classList.remove("blink");
  blinkTextDiv.style.opacity = 0;
  // swipeToMoveDiv.classList.remove("blink");
  tapToMove.blinkText = false;
}

animateOpeningBoard = () => {
  anime({
    targets: "#signboard",
    translateY: -425,
    delay: anime.stagger(200, { start: 500 }),
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

const totalFramesCat = 48;
const frameWidthCat = 228;
const frameIntervalCat = 25;
let currentFrameCat = 0;
let catWalk = false;
let catStopping = false; // New flag to indicate if the cat is stopping
const cat = document.getElementById("cat");

function animateCatWalk(currentFrame) {
  if (!catStopping) {
    cat.style.display = "block";
    const positionCat = -currentFrame * frameWidthCat;
    cat.style.backgroundPosition = `${positionCat}px 0`;
    currentFrame = (currentFrame + 1) % totalFramesCat;

    if (catWalk) {
      setTimeout(() => animateCatWalk(currentFrame), frameIntervalCat);
    }
  }
}

function animateCat() {
  if (!catWalk && catStep < 4) {
    catWalk = true;
    animateCatWalk(currentFrameCat);

    const targetLeft = 3200 + catStep * 1000;
    anime({
      targets: "#cat",
      left: targetLeft,
      easing: "linear",
      duration: 5000,
      complete: function (anim) {
        catStopping = true; // Set the flag to indicate that the cat is stopping
        anime({
          targets: "#cat",
          duration: 300,
          complete: function (anim) {
            anim.reset();
            setTimeout(() => {
              anime({ targets: "#cat", left: targetLeft, duration: 1 });
              cat.style.display = "none";
              catWalk = false;
              catStopping = false; // Reset the flag when the stopping is complete
              catStep++;
            }, 100);
          },
        });
      },
    });
  }
}

const birdBlue = document.getElementById("bird-blue");
const birdYellow = document.getElementById("bird-yellow");
let birdBlueFly = false;
let birdYellowFly = false;
const totalFrames = 30;
const frameWidth = 240;
let currentFrameBlue = 0;
let currentFrameYellow = 0;
const frameInterval = 20;

function animateBird(bird, currentFrame) {
  bird.style.display = "block";
  const position = -currentFrame * frameWidth;
  bird.style.backgroundPosition = `${position}px 0`;
  currentFrame = (currentFrame + 1) % totalFrames;

  // Continue the animation only if it's flagged to run
  if (birdBlueFly && bird === birdBlue) {
    setTimeout(() => animateBird(bird, currentFrame), frameInterval);
  }
  if (birdYellowFly && bird === birdYellow) {
    setTimeout(() => animateBird(bird, currentFrame), frameInterval);
  }
}

function animateBlueBird() {
  // Check if the animation is already running
  if (!birdBlueFly) {
    birdBlueFly = true; // Set the flag to indicate the animation is running
    currentFrameBlue = 0; // Reset the frame counter

    animateBird(birdBlue, currentFrameBlue);
    anime({
      targets: "#bird-blue",
      right: "500%",
      easing: "linear",
      duration: 20000,
      complete: function (anim) {
        anim.reset();
        anime({ targets: "#bird-blue", right: "-200%", duration: 1 });
        birdBlue.style.display = "none";
        birdBlueFly = false;
      },
    });
  }
}

function animateYellowBird() {
  if (!birdYellowFly) {
    birdYellowFly = true;
    currentFrameYellow = 0;

    animateBird(birdYellow, currentFrameYellow);
    anime({
      targets: "#bird-yellow",
      right: "500%",
      easing: "linear",
      duration: 20000,
      complete: function (anim) {
        anim.reset();
        anime({ targets: "#bird-yellow", right: "-200%", duration: 1 });
        birdYellow.style.display = "none";
        birdYellowFly = false;
      },
    });
  }
}

const totalFramesFirework = 90;
const frameWidthFirework = 600;
const frameIntervalFirework = 40;
let currentFrameFirework = 0;

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function animateFirework(currentFrame, color, left, top) {
  const firework = document.getElementById(`firework-${color}`);
  firework.style.display = "block";
  firework.style.left = `${left}px`;
  firework.style.top = `${top}px`;

  const positionFirework = -currentFrame * frameWidthFirework;
  firework.style.backgroundPosition = `${positionFirework}px 0`;

  currentFrame = (currentFrame + 1) % totalFramesFirework;

  if (currentFrame !== 0) {
    requestAnimationFrame(() =>
      animateFirework(currentFrame, color, left, top)
    );
  } else {
    firework.style.display = "none";
  }
}

function launchFirework(color, left, top) {
  animateFirework(currentFrameFirework, color, left, top);
}

function launchRandomFirework() {
  const startTime = performance.now();
  const duration = 3000; // 3 seconds

  function launchRandomFireworkIteration() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;

    if (elapsed < duration) {
      const colors = ["red", "green", "blue", "orange"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const left = getRandomValue(-700, 900);
      const top = getRandomValue(-2500, -2000);

      launchFirework(randomColor, left, top);

      setTimeout(launchRandomFireworkIteration, 1000);
    }
  }

  launchRandomFireworkIteration();
}

const fireworkOrangeButton = document.getElementById("tree-5");
const fireworkRedButton = document.getElementById("tree-6");
const fireworkGreenButton = document.getElementById("tree-8");
const fireworkBlueButton = document.getElementById("tree-9");

fireworkOrangeButton.addEventListener("click", () => {
  launchRandomFirework();
});

fireworkRedButton.addEventListener("click", () => {
  launchRandomFirework();
});

fireworkGreenButton.addEventListener("click", () => {
  launchRandomFirework();
});

fireworkBlueButton.addEventListener("click", () => {
  launchRandomFirework();
});

let findMeAnimated = false;

function animateFindMe() {
  if (!findMeAnimated) {
    findMeAnimated = true;

    anime
      .timeline({
        targets: [".find-me-container .find-me-item", ".social-link-container"],
      })
      // First 2 seconds
      .add({
        translateY: -1000,
        delay: anime.stagger(200, { direction: "normal" }),
        easing: "easeInOutQuad",
      })
      // Next 1 second
      .add({
        targets: ".social-link-container",
        opacity: [0, 1],
        scale: [1, 1.3],
        easing: "easeInOutQuad",
        duration: 1000,
        complete: function () {
          animateEndMessage();
        },
      })
      // Next 3 seconds
      .add({
        complete: function () {
          launchRandomFirework();
          setTimeout(() => {
            launchRandomFirework();
          }, 1500);
          setTimeout(() => {
            launchRandomFirework();
          }, 3000);
        },
      })
      // Additional segment
      .add({
        complete: function () {
          setTimeout(() => {
            animateEndCharacter();
          }, 3000);
          setTimeout(() => {
            animateEndCharacter();
          }, 6000);
        },
      });
  }
}

// function closeEndMessage() {
//   document.querySelector(".endMessage").style.display = "none";
// }

const endCharacter = document.getElementById("endCharacterAnimation");
let currentFrameECA = 0;
const totalFramesECA = 119;
const frameWidthECA = 320;
const frameIntervalECA = 25;

function animateEndCharacter() {
  endCharacter.style.visibility = "visible";
  character.style.visibility = "hidden";

  const position = -currentFrameECA * frameWidthECA;
  endCharacter.style.backgroundPosition = `${position}px 0`;

  currentFrameECA = (currentFrameECA + 1) % totalFramesECA;

  if (currentFrameECA !== 0) {
    setTimeout(animateEndCharacter, frameIntervalECA);
  } else {
    endCharacter.style.visibility = "hidden";
    character.style.visibility = "visible";
  }
}

function animateEndMessage() {
  document.querySelector(".endMessage").style.display = "block";
  anime({
    targets: ".endMessage",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 500,
  });

  setTimeout(() => {
    anime({
      targets: ".endMessage",
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 1500,
    });
  }, 15000);
}

function animateStartCharacter() {
  atEndPosition = true;
  setTimeout(() => {
    atEndPosition = false;
  }, 2000);
  anime({
    targets: "#character",
    translateY: [-4000, 0],
    easing: "easeInOutBounce",
    duration: 2000,
  });
}

function moveCharacter(direction) {
  if (atEndPosition) {
    // Character is at the end position, do nothing
    return;
  }

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
    if (position > endPosition) {
      if (!hasReachedEnd) {
        hasReachedEnd = true;
        atEndPosition = true;
        //fix this
        stopCharacterAnimation();
        animateFindMe();
        setTimeout(() => {
          atEndPosition = false;
        }, 15000);

        return;
      }
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

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let accelerationInterval; // Variable to store the interval for acceleration

// Function to move character with acceleration
function moveCharacterWithAcceleration(direction) {
  moveCharacter(direction); // Initial move

  // Set up acceleration interval
  accelerationInterval = setInterval(() => {
    moveCharacter(direction);
  }, 100); // Adjust the interval duration as needed
}

// Add touchstart and touchend event listeners
leftArrow.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveCharacterWithAcceleration("left");
});

rightArrow.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveCharacterWithAcceleration("right");
});

// Stop acceleration when touch is released
document.addEventListener("touchend", () => {
  clearInterval(accelerationInterval);
});

// const swipeToMoveContainer = document.getElementById("swipeToMove-container");
// const hammer = new Hammer(swipeToMoveContainer);

// hammer.on("swipeleft", function () {
//   moveCharacter("right");
// });

// hammer.on("swiperight", function () {
//   moveCharacter("left");
// });

function detectMobileDevice() {
  const isMobile =
    /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    const instructionText = document.getElementById("instruction-text");
    // instructionText.textContent = "Tap Left or Right on the Platform to Move";
    instructionText.style.visibility = "hidden";
    tapToMove.style.opacity = 1;
  } else {
    tapToMove.style.display = "none";
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
  }, 1500);

  animateStartCharacter();

  detectMobileDevice();
});

function openHobbiesText(type) {
  const textBox = document.querySelector(".hobbies-text-box");
  const paragraph = document.querySelector(".hobbies-paragraph");
  const hobbiesInstruction = document.querySelector(".hobbies-instruction");
  hobbiesInstruction.style.visibility = "hidden";
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
  else if (type === "webdev")
    targetURL =
      "https://www.behance.net/gallery/184956777/Web-Design-and-Development";
  window.open(targetURL, "_blank");
}
