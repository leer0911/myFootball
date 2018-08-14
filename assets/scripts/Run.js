import character from 'aniConfig';
cc.Class({
  extends: cc.Component,

  // use this for initialization
  onLoad: function() {
    var animation = this.getComponent(cc.Animation);
    const {
      finn_red: { run }
    } = character;
    cc.loader.loadRes('assets/finn_red', cc.SpriteAtlas, (err, atlas) => {
      const spriteFrames = atlas.getSpriteFrames();
      let aniFrames = [];
      spriteFrames.forEach(frame => {
        const name = frame.name;
        if (run.indexOf(name) !== -1) {
          aniFrames.push(frame);
        }
      });
      const clip = cc.AnimationClip.createWithSpriteFrames(aniFrames, 20);
      clip.name = 'run';
      clip.wrapMode = cc.WrapMode.Loop;
      animation.addClip(clip);
      animation.play('run');
    });
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
