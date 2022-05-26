const ball = document.querySelector(".ball");
const spring = document.querySelector(".spring");
const fill = document.querySelector(".fill");
const btn = document.querySelector(".btn-action");

const stretchSpring = () => {
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
  let ballDistance = (
    parseInt(getComputedStyle(room).width, 10) * percentagePower * 0.8 +
    200
  ).toFixed();

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
};

const resetAnimation = () => {
  console.log("reset");
};

btn.addEventListener("mousedown", stretchSpring);
btn.addEventListener("mouseup", releaseSpring);

btn.addEventListener("touchstart", stretchSpring);
btn.addEventListener("touchend", releaseSpring);
