cc.Class({
  extends: cc.Component,

  properties: {
    maxSpeed: 500,
    acceleration: 1500
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.body = this.getComponent(cc.RigidBody);
    this.speed = cc.p(0, 0);
  },

  //   start() {},

  update(dt) {
    // this.speed = this.body.linearVelocity;
    // if (this.node.scaleX > 0) {
    //   this.node.scaleX *= -1;
    // }
    // this.speed.x -= this.acceleration * dt;
    // if (this.speed.x < -this.maxSpeed) {
    //   this.speed.x = -this.maxSpeed;
    // }
    // this.body.linearVelocity = this.speed;
  }
});
//
