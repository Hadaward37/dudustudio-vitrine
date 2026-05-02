import { useEffect, useRef } from 'react';

export default function LiquidBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    const vertexSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float blob(vec2 uv, vec2 center, float radius) {
        float d = length(uv - center);
        return 1.0 - smoothstep(0.0, radius, d);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        float aspect = u_resolution.x / u_resolution.y;
        uv.x *= aspect;

        float t = u_time * 0.3;

        vec2 mouse = u_mouse;
        mouse.x *= aspect;

        vec2 c1 = vec2(
          0.4 * aspect + sin(t * 0.7) * 0.15 * aspect + (mouse.x - 0.5 * aspect) * 0.05,
          0.5 + cos(t * 0.6) * 0.12 + (mouse.y - 0.5) * 0.05
        );
        vec2 c2 = vec2(
          0.6 * aspect + cos(t * 0.5) * 0.12 * aspect + (mouse.x - 0.5 * aspect) * 0.05,
          0.4 + sin(t * 0.8) * 0.15 + (mouse.y - 0.5) * 0.05
        );
        vec2 c3 = vec2(
          0.5 * aspect + sin(t * 0.9 + 1.0) * 0.1 * aspect + (mouse.x - 0.5 * aspect) * 0.05,
          0.6 + cos(t * 0.4 + 2.0) * 0.1 + (mouse.y - 0.5) * 0.05
        );

        float n = snoise(uv * 2.0 + t * 0.1) * 0.03;

        float b1 = blob(uv + n, c1, 0.35);
        float b2 = blob(uv + n, c2, 0.30);
        float b3 = blob(uv + n, c3, 0.25);

        vec3 color1 = vec3(0.788, 0.584, 0.424);
        vec3 color2 = vec3(0.831, 0.686, 0.216);
        vec3 color3 = vec3(0.910, 0.769, 0.722);
        vec3 bg = vec3(0.980, 0.969, 0.949);

        vec3 col = bg;
        col = mix(col, color1, b1 * 0.7);
        col = mix(col, color2, b2 * 0.6);
        col = mix(col, color3, b3 * 0.5);

        float totalBlob = max(max(b1, b2), b3);
        col = mix(bg, col, smoothstep(0.0, 0.3, totalBlob));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vertexSource);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let raf = 0;
    const render = () => {
      timeRef.current += 0.016;
      gl.uniform1f(uTime, timeRef.current);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}
