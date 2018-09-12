class MenuScene extends Scene {
  constructor() {
    super();
    this.speed = 300;
    this.titleY = 100;
    this.transition = false;
    this.startBtn = new MenuButton(0, 380, 'Start', 'purple', this.startTransition.bind(this));
    this.fullScreenBtn = new MenuButton(0, 480, 'Fullscreen', 'blue', goFullscreen);
    this.font = new TextRenderer('monospace', '#fff', 70);
    this.mountains = new Mountains();
    this.timeCounter = 5000;
    this.done = 0;
    this.ship = 0;

    this.explosions = new Group();
  }

  startTransition() {
    this.status = 'in';
  }

  update() {
    $.cam.update(this.deltaTime);
    this.explosions.update(this.deltaTime);

    if (this.status === 'in') {
      this.startBtn.y += this.speed * this.deltaTime / 1000;
      this.fullScreenBtn.y += this.speed * this.deltaTime / 1000;
      this.titleY -= this.speed * this.deltaTime / 1000;
      if (this.startBtn.y > $.vh && this.titleY <= 0) {
        this.status = 'crash';
      }
    } else if (this.status === 'crash') {
      this.ship = new Ship(this.explosions);
      this.status = 'delay';
    } else if (this.status === 'delay') {
      this.ship.update(this.deltaTime);
      this.timeCounter -= this.deltaTime;
      if (this.timeCounter <= 0 && !this.done) {
        this.done = 1;
        $.scenemng.load(LevelSelectionScene);
      }
    }
  }

  render() {
    $.cam.clear('#060608');

    $.ctx.drawImage(this.mountains.canvas, $.cam.offsetX, $.cam.offsetY, $.vw, $.vh);

    this.font.render($.ctx, 'PLANETARY MISSION', 145, this.titleY);
    $.cam.render(this.startBtn);

    if (!isFullscreen()) {
      $.cam.render(this.fullScreenBtn);
    }

    if (this.status === 'delay') {
      $.cam.render(this.ship);
    }
    $.cam.render(this.explosions);
  }
}

class Ship extends Sprite {
  constructor(grp) {
    super(1100, 176, 16, 16);
    this.destX = 135;
    this.destY = 476;
    this.speed = 500;
    this.angle = atan2((this.destY - this.y), (this.x - this.destX))
    this.crashed = false;
    this.expGrp = grp;
  }

  update(dt) {
    if (this.crashed) return;

    this.x -= this.speed * cos(this.angle) * dt / 1000;
    this.y += this.speed * sin(this.angle) * dt / 1000;

    this.x = clamp(this.x, this.destX);
    this.y = clamp(this.y, 0, this.destY);

    if (this.x === this.destX && this.y === this.destY) {
      this.crashed = true;
      this.expGrp.add(new Explosion(this));
      $.cam.shake(6, 200);
    }
  }

  render(r) {
    $.ctx.restore();
    $.ctx.fillStyle = '#fff';
    $.ctx.fillRect(r.x, r.y, this.w, this.h);
    $.ctx.save();
  }
}

class MenuButton extends UIButton {
  constructor(x, y, text, color, cb) {
    super(x, y, 210, 60);
    this.x = ($.vw - this.w) / 2;
    this.cb = cb;
    this.color = color || 'purple';
    this.text = text;
    this.font = new TextRenderer('monospace', '#fff', 30);
  }

  onClick() {
    this.cb();
  }

  render(rect) {
    $.ctx.save();
    $.ctx.fillStyle = this.color;
    $.ctx.fillRect(rect.x, rect.y, this.w, this.h);
    this.font.render($.ctx, this.text, rect.x + (this.w - (18 * this.text.length)) / 2, rect.y + 38);
    $.ctx.restore();
  }
}

class Explosion extends Sprite {
  constructor(obj) {
    super(obj.center().x, obj.center().y, 64, 64);
    this.radius = 50;
    this.life = 100;
  }

  update(dt) {
    this.life -= dt;
    if (this.life < 0) this.alive = 0;
  }

  render(r) {
    $.ctx.fillStyle = rnda(['yellow', 'white', 'red', 'orange']);
    $.ctx.beginPath();
    $.ctx.arc(r.x, r.y, this.radius, 0, 2 * PI);
    $.ctx.fill();
  }
}

class Mountains {
  constructor() {
    this.canvas = $.canvas.create($.vw, $.vh);
    this.ctx = this.canvas.getContext('2d');

    //181715
    //this.ctx.fillStyle = '#473a41';
    // TODO: drawPoints method that receives an array of points
    this.ctx.fillStyle = '#171518';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 576);
    this.ctx.lineTo(159, 284);
    this.ctx.lineTo(195, 276);
    this.ctx.lineTo(214, 262);
    this.ctx.lineTo(242, 276);
    this.ctx.lineTo(304, 290);
    this.ctx.lineTo(355, 320);
    this.ctx.lineTo(423, 305);
    this.ctx.lineTo(497, 300);
    this.ctx.lineTo(564, 284);
    this.ctx.lineTo(638, 306);
    this.ctx.lineTo(750, 290);
    this.ctx.lineTo(821, 310);
    this.ctx.lineTo(911, 280);
    this.ctx.lineTo(943, 244);
    this.ctx.lineTo(986, 248);
    this.ctx.lineTo(1024, 264);
    this.ctx.lineTo(1024, 576);
    this.ctx.lineTo(0, 576);
    this.ctx.fill();

    this.ctx.fillStyle = '#253326';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 576);
    this.ctx.lineTo(0, 326);
    this.ctx.lineTo(24, 333);
    this.ctx.lineTo(56, 316);
    this.ctx.lineTo(82, 284);
    this.ctx.lineTo(126, 273);
    this.ctx.lineTo(185, 290);
    this.ctx.lineTo(245, 326);
    this.ctx.lineTo(382, 369);
    this.ctx.lineTo(466, 373);
    this.ctx.lineTo(523, 353);
    this.ctx.lineTo(584, 365);
    this.ctx.lineTo(616, 347);
    this.ctx.lineTo(655, 361);
    this.ctx.lineTo(723, 350);
    this.ctx.lineTo(788, 376);
    this.ctx.lineTo(902, 352);
    this.ctx.lineTo(944, 324);
    this.ctx.lineTo(987, 333);
    this.ctx.lineTo(1024, 357);
    this.ctx.lineTo(1024, 576);
    this.ctx.lineTo(0, 576);
    this.ctx.fill();

  }
}
