cc.Class({
  extends: cc.Component,

  properties: {
    distanceX: 400,
    distanceY: 50,
    delayTime: 200
  },

  onLoad() {
    const move = cc
      .moveBy(0.75, cc.p(this.distanceX, 0),1000)
      .easing(cc.easeQuadraticActionInOut());
    const finished = cc.callFunc(function() {
      setTimeout(() => {
        const startBtnAction = cc
          .moveBy(0.6, cc.p(0, -this.distanceY))
          .easing(cc.easeQuadraticActionInOut());
        const endBtnAction = cc
          .moveBy(0.6, cc.p(0, this.distanceY))
          .easing(cc.easeQuadraticActionInOut());
        const step2 = cc.repeatForever(
          cc.sequence(startBtnAction, endBtnAction)
        );
        this.node.runAction(step2);
      }, this.delayTime);
    }, this);
    const step1 = cc.sequence(move, finished);

    this.node.runAction(step1);
  }
});
