const ball = document.querySelector(".ball");
const spring = document.querySelector(".spring");
const fill = document.querySelector(".fill");
const btn = document.querySelector(".btn-action");

const stretchSpring = () => {
  fill.style.animationName = "fill";
  fill.style.animationPlayState = "running";
  spring.style.animationPlayState = "running";
  btn.textContent = "Puść sprężynę";
};

const releaseSpring = () => {
  const maxFill = parseInt(getComputedStyle(btn).width, 10);

    const fillStyles = parseInt(getComputedStyle(fill).width, 10);


  const percentagePower = (fillStyles / maxFill).toFixed(2);
  // console.log(fillStyles);
  // console.log(maxFill);
  // console.log(percentagePower);

  btn.textContent = `Moc uderzenia ${(percentagePower * 100).toFixed()} %`;

  const room = document.querySelector(".room");
  const roomWidth = parseInt(getComputedStyle(room).width, 10);

  let ballDistance;
  if (roomWidth >= 1900) {
    ballDistance = (roomWidth * percentagePower * 0.75 + 300).toFixed();
  } else if (roomWidth >= 1300 && roomWidth < 1900) {
    ballDistance = (roomWidth * percentagePower * 0.75 + 250).toFixed();
  } else if (roomWidth >= 800 && roomWidth < 1299) {
    ballDistance = (roomWidth * percentagePower * 0.75 + 200).toFixed();
  } else if (roomWidth < 799 && roomWidth >= 500) {
    ballDistance = (roomWidth * percentagePower * 0.6 + 170).toFixed();
  } else if (roomWidth < 499) {
    ballDistance = (roomWidth * percentagePower * 0.5 + 100).toFixed();
  }

  document.documentElement.style.setProperty("--power-x", `${ballDistance}px`);
  ball.style.animation =
    "fly-ball-x .8s .1s cubic-bezier(.17,.67,.6,1) forwards , fly-ball-y .8s .1s linear  forwards";

  document.documentElement.style.setProperty(
    "--spring-left",
    getComputedStyle(spring).left
  );

  //   spring.style.animationPlayState = "spring 1.5s infinite alternate paused ";

  spring.style.animation = "release-spring 0.12s forwards linear";

  fill.style.animationPlayState = "paused";

  btn.removeEventListener("mousedown", stretchSpring);
  btn.removeEventListener("mouseup", releaseSpring);

  btn.removeEventListener("touchstart", stretchSpring);
  btn.removeEventListener("touchend", releaseSpring);

  ball.addEventListener("animationend", resetAnimation);
};

const resetAnimation = () => {
  ball.removeEventListener("animationend", resetAnimation);

  setTimeout(() => {
    btn.addEventListener("mousedown", stretchSpring);
    btn.addEventListener("mouseup", releaseSpring);
    btn.addEventListener("touchstart", stretchSpring);
    btn.addEventListener("touchend", releaseSpring);
    btn.textContent = "Naciągnij sprężynę";

    spring.style.animation = "";
    ball.style.animation = "";
    fill.style.animationName = "none";
    // fill.style.animation = "fill 1.5s infinite alternate ease-out";
  }, 1000);
};

btn.addEventListener("mousedown", stretchSpring);
btn.addEventListener("mouseup", releaseSpring);

btn.addEventListener("touchstart", stretchSpring);
btn.addEventListener("touchend", releaseSpring);
