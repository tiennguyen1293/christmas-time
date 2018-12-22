const polyfillRequestAnimationFrame = callback => {
  window.setTimeout(callback, 1000 / 60);
};

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  polyfillRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

const flakes = [];

const reset = (canvas, flake) => {
  const value = flake;
  value.x = Math.floor(Math.random() * canvas.width);
  value.y = 0;
  value.size = Math.random() * 3 + 2;
  value.speed = Math.random() * 1 + 0.5;
  value.velY = value.speed;
  value.velX = 0;
  value.opacity = Math.random() * 0.5 + 0.3;
};

export const updateSnow = (canvas, mX, mY, flakeCount) => {
  if (typeof canvas !== 'object') {
    return;
  }
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < flakeCount; i += 1) {
    const flake = flakes[i];

    const x = mX;

    const y = mY;

    const minDist = 150;

    const x2 = flake.x;

    const y2 = flake.y;

    const dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

    if (dist < minDist) {
      const force = minDist / (dist * dist);

      const xcomp = (x - x2) / dist;

      const ycomp = (y - y2) / dist;

      const deltaV = force / 2;

      flake.velX -= deltaV * xcomp;
      flake.velY -= deltaV * ycomp;
    }

    ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
    flake.y += flake.velY;
    flake.x += flake.velX;

    if (flake.y >= canvas.height || flake.y <= 0) {
      reset(canvas, flake);
    }

    if (flake.x >= canvas.width || flake.x <= 0) {
      reset(canvas, flake);
    }

    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(updateSnow);
};

export const initSnow = (canvas, flakeCount) => {
  const variableCanvas = canvas;
  const ctx = canvas.getContext('2d');

  variableCanvas.width = window.innerWidth;
  variableCanvas.height = window.innerHeight;

  function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < flakeCount; i += 1) {
      const flake = flakes[i];

      flake.velX *= 0.98;
      if (flake.velY <= flake.speed) {
        flake.velY = flake.speed;
      }
      flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;

      ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
      flake.y += flake.velY;
      flake.x += flake.velX;

      if (flake.y >= canvas.height || flake.y <= 0) {
        reset(canvas, flake);
      }

      if (flake.x >= canvas.width || flake.x <= 0) {
        reset(canvas, flake);
      }

      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(snow);
  }

  for (let i = 0; i < flakeCount; i += 1) {
    const x = Math.floor(Math.random() * canvas.width);

    const y = Math.floor(Math.random() * canvas.height);

    const size = Math.random() * 3 + 2;

    const speed = Math.random() * 1 + 0.2;

    const opacity = Math.random() * 0.5 + 0.3;

    flakes.push({
      speed,
      velY: speed,
      velX: 0,
      x,
      y,
      size,
      stepSize: Math.random() / 20,
      step: 0,
      opacity,
    });
  }

  snow();
};
