type TPhysics = {
  gravity: number;
  wind: number;
  yVelocity: number;
  xVelocity: number;
  opacity: number;
  weight: number;
  loopTime: number;
  red: number;
  blue: number;
  green: number;
  isDots: number;
  tunnel: number;
  vortex: number;
  density: number;
};

const state = {
  particleMem: {},
  canvasElement: null,
  canvas2D: null,
};

const clearCanvas = (nextPhysics: TPhysics) => {};

const paintParticles = (nextPhysics: TPhysics) => {
  const document = (window as any).document;

  if ((window as any).RUNNING) {
    return;
  }
  if (!document) {
    return;
  }

  let {
    gravity,
    wind,
    yVelocity,
    xVelocity,
    opacity,
    weight,
    loopTime,
    red,
    blue,
    green,
    isDots,
    tunnel,
    vortex,
    density,
  } = nextPhysics;

  let counter = 0;

  density = 16 - density;
  vortex = 6 - vortex;
  opacity = 1001 - opacity;

  if (weight < 5) {
    weight = weight / 1.5;
  } else if (weight < 10) {
    weight = weight / 1.3;
  }

  const particleMem: any = {};
  const canvas = document.createElement("canvas");
  const twoDCanvas = canvas.getContext("2d");

  let particleIndex = 0;

  document.body.appendChild(canvas);
  canvas.width = (window as any).innerWidth;
  canvas.height = (window as any).innerHeight;
  twoDCanvas.fillStyle = "black";
  twoDCanvas.fillRect(0, 0, canvas.width, canvas.height);

  function newParticle() {
    const _self: any = {};
    _self.radius = weight * Math.random();
    if (tunnel) {
      if (vortex === 1) {
        _self.x = Math.random() * (canvas.width - 170) + 170;
      } else {
        _self.x =
          Math.random() * (canvas.width / vortex - 170) +
          (canvas.width / 2 - canvas.width / (vortex * 2)) +
          170;
      }
    } else {
      _self.x = Math.random() * (canvas.width - 170) + 170;
    }

    _self.y = Math.random() * canvas.height;
    _self.vy = (-yVelocity / 200) * (Math.random() + 0.5);
    _self.vx = (xVelocity / 200) * (Math.random() + 0.5);
    _self.wind = -0.0001 * wind;
    _self.gravity = 0.0001 * gravity;
    _self.ay = _self.gravity;
    _self.ax = _self.gravity;

    _self.alphaRadians = 0;
    _self.alpha = 0;

    _self.life = 0;
    _self.maxLife = Math.floor(800 * Math.random());

    particleMem[particleIndex] = _self;
    particleIndex++;
    _self.id = particleIndex;

    _self.initialAlphaScale = opacity * 0.005;
    if (_self.radius < weight * 0.1) {
      _self.radius += 0.02;
    }

    if (_self.id % loopTime === 0) {
      twoDCanvas.fillStyle = "black";
      twoDCanvas.fillRect(0, 0, canvas.width, canvas.height);
    }

    _self.red =
      Math.floor(red * Math.random()) * (Math.floor(red * Math.random()) / 2);
    _self.green =
      Math.floor(green * Math.random()) *
      (Math.floor(green * Math.random()) / 2);
    _self.blue =
      Math.floor(blue * Math.random()) * (Math.floor(blue * Math.random()) / 2);
    _self.rgb = "rgba(" + _self.red + ", " + _self.green + ", " + _self.blue;

    _self.drawCircle = function () {
      _self.alpha = Math.sin(_self.alphaRadians) / _self.initialAlphaScale;
      _self.alphaRadians += Math.PI / _self.maxLife;
      _self.x += _self.vx * 0.9;
      _self.y += _self.vy * 0.9;
      _self.vy += _self.gravity;
      _self.vx += _self.wind;

      twoDCanvas.beginPath();
      twoDCanvas.arc(_self.x, _self.y, _self.radius, 0, 2 * Math.PI, true);
      twoDCanvas.fill();
      twoDCanvas.fillStyle = _self.rgb + ", " + _self.alpha + ")";

      _self.life++;
      if (_self.life > _self.maxLife) {
        delete particleMem[_self.id];
        delete particleMem[_self.id + 1];
        delete particleMem[_self.id + 2];
        delete particleMem[_self.id + 3];
        delete particleMem[_self.id + 4];
      }

      if (tunnel) {
        if (_self.x < canvas.width + canvas.width / 2 + 85) {
          if (_self.x > canvas.width / 2) {
            _self.vx -= 0.05;
          } else {
            _self.vx += 0.05;
          }
        }
      }
    };
  }

  setInterval(function () {
    if (isDots) {
      twoDCanvas.fillStyle = "black";
      twoDCanvas.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (counter % density === 0) {
      newParticle();
    } // need to add a limiter

    counter += 1;

    for (let i in particleMem) {
      particleMem[i].drawCircle();
    }
  }, 6);

  (window as any).RUNNING = true;
};

export default paintParticles;
