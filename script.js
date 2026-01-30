const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = (index) =>
  `images/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

const images = [];
let img = new Image();
img.src = currentFrame(1);

/* Set canvas size */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* Preload images */
for (let i = 1; i <= frameCount; i++) {
  const image = new Image();
  image.src = currentFrame(i);
  images.push(image);
}

/* Draw image */
function drawImage(img) {
  const canvasAspect = canvas.width / canvas.height;
  const imageAspect = img.width / img.height;

  let drawWidth, drawHeight;

  if (imageAspect > canvasAspect) {
    drawHeight = canvas.height;
    drawWidth = img.width * (canvas.height / img.height);
  } else {
    drawWidth = canvas.width;
    drawHeight = img.height * (canvas.width / img.width);
  }

  const x = (canvas.width - drawWidth) / 2;
  const y = (canvas.height - drawHeight) / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, y, drawWidth, drawHeight);
}

/* Scroll-based animation */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScrollTop =
    document.body.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => {
    drawImage(images[frameIndex]);
  });
});

/* Initial render */
img.onload = () => {
  drawImage(img);
};

/* Handle resize */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawImage(images[0]);
});
