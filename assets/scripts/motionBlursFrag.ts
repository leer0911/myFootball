export default class BlursFrag {
  static blurs_vert = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    attribute vec4 a_color;
    varying vec2 v_texCoord;
    varying vec4 v_fragmentColor;
    void main()
    {
        gl_Position = CC_PMatrix * a_position;
        v_fragmentColor = a_color;
        v_texCoord = a_texCoord;
    }
    `;
  static blurs_frag = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying lowp vec2 v_texCoord;
    uniform sampler2D u_texture;
    uniform float time;
    float rand(vec2 co)
    {
        return fract(cos(dot(co.xy ,vec2(0,1000))));
    }
    void main()
    {
        vec2 rnd = vec2(0.0);
        rnd = vec2(rand(v_texCoord),0);
        gl_FragColor = texture2D(u_texture, v_texCoord+rnd*0.017*time);
    }
    `;
}
