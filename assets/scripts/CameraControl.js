cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      default: null,
      type: cc.Node
    },
    camera: cc.Camera,
    //Smooth Follow
    smoothFollow: true,
    followX: {
      default: 0
    },
    followY: {
      default: 0
    },
    minFollowDist: {
      default: 0
    },
    followRatio: {
      default: 0
    },
    //Boundaries in world position
    useBoundaries: true,
    topBound: {
      default: 0
    },
    bottomBound: {
      default: 0
    },
    leftBound: {
      default: 0
    },
    rightBound: {
      default: 0
    }
  },

  // use this for initialization
  onLoad() {
    this.startFollow = false;
    this.visibleSize = cc.view.getVisibleSize();
    this.initZoomRatio = this.camera.zoomRatio;
  },

  // called every frame, uncomment this function to activate update callback
  lateUpdate(dt) {
    let targetPos = this.target.parent.convertToWorldSpaceAR(
      this.target.position
    );
    this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);

    //smooth follow
    if (this.smoothFollow) {
      // if (
      //   Math.abs(targetPos.x - this.node.x) >= this.followX ||
      //   Math.abs(targetPos.y - this.node.y) >= this.followY
      // ) {
      //   //when camera and target distance is larger than max distance
      //   this.startFollow = true;
      // }
      // if (this.startFollow) {
      //   this.node.position = this.node.position.lerp(
      //     targetPos,
      //     this.followRatio
      //   );
      //   if (cc.pDistance(targetPos, this.node.position) <= this.minFollowDist) {
      //     this.startFollow = false;
      //   }
      // }
    }

    // console.log(this.node.position);
    //boundaries
    if (this.useBoundaries) {
      let width = this.visibleSize.width / 2 / this.camera.zoomRatio;
      let height = this.visibleSize.height / 2 / this.camera.zoomRatio;
      console.log(width);
      console.log(this.node.y);
      // if (this.node.x < -2000) {
      //   this.node.x = -2000;
      // }
      // if (this.node.y < -800) {
      //   this.node.y = -800;
      // }
      // if (this.node.x > 1200) {
      //   this.node.x = 1400;
      // }
      // let minX = this.node.x - width;
      // let maxX = this.node.x + width;
      // let minY = this.node.y - height;
      // let maxY = this.node.y + height;
      // if (minX < this.leftBound) {
      //   this.node.x = this.leftBound + width;
      // }
      // if (minY < this.bottomBound) {
      //   this.node.y = this.bottomBound + height;
      // }
      // if (maxX > this.rightBound) {
      //   this.node.x = this.rightBound - width;
      // }
      // if (maxY > this.topBound) {
      //   this.node.y = this.topBound - height;
      // }
    }
  }
});
