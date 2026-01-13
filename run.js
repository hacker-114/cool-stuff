const LAYERS = 1000;
const FLAKES_PER_LAYER = 500;

function startSnowLoop(loopId, flakesPerLoop) {
  const canvas = document.createElement('canvas');
  canvas.className = 'snow';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < flakesPerLoop; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 4 + 1,
      d: Math.random() * flakesPerLoop
    });
  }

  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();

    for (let i = 0; i < flakesPerLoop; i++) {
      const p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    }

    ctx.fill();
    update();
    requestAnimationFrame(draw);
  }

  function update() {
    angle += 0.01;

    for (let i = 0; i < flakesPerLoop; i++) {
      const p = particles[i];

      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;

      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        particles[i] = {
          x: Math.random() * W,
          y: -10,
          r: p.r,
          d: p.d
        };
      }
    }
  }

  draw();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

for (let k = 0; k < LAYERS; k++) {
  startSnowLoop(k, FLAKES_PER_LAYER);
}
