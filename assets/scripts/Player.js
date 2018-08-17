import character from 'aniConfig';
cc.Class({
  extends: cc.Component,

  // use this for initialization
  onLoad: function() {
    const animation = this.getComponent(cc.Animation);
    const { finn_red } = character;
    cc.loader.loadRes('assets/finn_red', cc.SpriteAtlas, (err, atlas) => {
      const spriteFrames = atlas.getSpriteFrames();
      for (const key in finn_red) {
        const element = finn_red[key];
        let aniFrames = [];
        spriteFrames.forEach(frame => {
          const name = frame.name;
          if (element.indexOf(name) !== -1) {
            aniFrames.push(frame);
          }
        });
        const clip = cc.AnimationClip.createWithSpriteFrames(aniFrames, 20);
        clip.name = key;
        clip.wrapMode = cc.WrapMode.Loop;
        animation.addClip(clip);
      }
      animation.play('stand');
    });
    this.node.touchBOXingPosition = cc.p(0, 0);
  },
  play() {
    const animation = this.getComponent(cc.Animation);
    animation.play('tackle');
    if (this.node.scaleX > 0) {
      this.node.x += 100;
    } else {
      this.node.x -= 100;
    }

    setTimeout(() => {
      animation.play('run');
    }, 500);
  },
  onBeginContact(contact, selfCollider, otherCollider) {
    this.node.touchBOXingPosition = this.node.position;
  }
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
