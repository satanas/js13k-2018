class LevelSelectionScene extends Scene {
  constructor() {
    super();

    this.padding = 5;
    this.topMargin = 30;
    this.auxCtrlBtn = new AuxCtrlBtn();

    this.aeros = new Aeros();

    if ($.data.level === 0) {
      this.auxCtrlBtn.active = true;
      this.aeros.speak([
        //'Text length ---------------------------------------',
        [
          'Hello, Captain. The crash damaged most of our ship',
          'and 90% of the systems are offline.',
        ],
        [
          'We can attempt a reparation but I need you to activate',
          'the auxiliary control sequence, then I will be able',
          'to run an overall diagnostic report.',
        ],
        [
          'Select the blinking area in the screen to start.'
        ]
      ]);
    }
  }

  update() {
    this.aeros.update(this.deltaTime);
    this.auxCtrlBtn.update(this.deltaTime);
  }

  render() {
    $.cam.clear('#00405c');

    $.ctx.save();
    $.ctx.fillStyle = 'black';
    $.ctx.fillRect(this.padding, this.topMargin, $.vw - (this.padding * 2), $.vh - (this.topMargin + this.padding));
    $.ctx.restore();

    $.cam.render(this.auxCtrlBtn);
    $.cam.render(this.aeros);

    $.ctx.drawImage(this.aeros.canvas, this.aeros.x, this.aeros.y, this.aeros.w, this.aeros.h);
  }
}

class AuxCtrlBtn extends UIButton {
  constructor() {
    super(60, 60, 64, 48);
    this.anim = new Animator([0, 1], 200);
    this.active = false;
  }

  onClick() {
    $.scenemng.load(new AuxiliaryScene());
  }

  update(dt) {
    this.checkClick();
    this.anim.update(dt);
  }

  render() {
    if (this.active) {
      if (this.anim.get()) {
        $.ctx.fillStyle = 'white';
        $.ctx.fillRect(this.x, this.y, this.w, this.h);
      }
    } else {
      $.ctx.fillStyle = 'gray';
      $.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
}