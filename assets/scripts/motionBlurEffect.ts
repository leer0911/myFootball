import BlursFrag from './motionBlursFrag';
const { ccclass, property } = cc._decorator;

@ccclass
export default class GaussBlurEffect extends cc.Component {
  program: cc.GLProgram;
  @property time: number = 3;

  onLoad() {
    this.useBlur();
  }

  start() {}

  useBlur() {
    this.program = new cc.GLProgram();

    this.program.initWithVertexShaderByteArray(
      BlursFrag.blurs_vert,
      BlursFrag.blurs_frag
    );
    this.program.addAttribute(
      cc.macro.ATTRIBUTE_NAME_POSITION,
      cc.macro.VERTEX_ATTRIB_POSITION
    );
    this.program.addAttribute(
      cc.macro.ATTRIBUTE_NAME_COLOR,
      cc.macro.VERTEX_ATTRIB_COLOR
    );
    this.program.addAttribute(
      cc.macro.ATTRIBUTE_NAME_TEX_COORD,
      cc.macro.VERTEX_ATTRIB_TEX_COORDS
    );
    this.program.link();
    this.program.updateUniforms();
    this.program.use();

    this.setProgram(this.node.getComponent(cc.Sprite)._sgNode, this.program);
    let ct = this.program.getUniformLocationForName('time');
    this.program.setUniformLocationWith1f(ct, this.time);
  }
  update(dt) {
    // 溶解速度
    this.time -= 0.04;
    if (this.program) {
      this.program.use();
      let ct = this.program.getUniformLocationForName('time');
      if (this.time > 0) {
        this.program.setUniformLocationWith1f(ct, this.time);
      } else {
        this.program.setUniformLocationWith1f(ct, 0);
      }
    }
  }
  setProgram(node: any, program: any) {
    node.setShaderProgram(program);
  }
}
