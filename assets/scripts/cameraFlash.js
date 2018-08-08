cc.Class({
  extends: cc.Component,

  properties: {},

  start() {
    this.node.children.forEach((child, index) => {
      let random = cc.random0To1();
      child.opacity = 0;
      const blink = cc.blink(1, 2);
      const delyTime = cc.delayTime(random);
      const scale = cc.scaleTo(2 + random, 2 + random);
      const scale2 = cc.scaleTo(1, 1);
      const action = cc.repeatForever(
        cc.sequence(delyTime, cc.spawn(blink, scale), scale2)
      );
      child.runAction(action);
    });
  }
});
