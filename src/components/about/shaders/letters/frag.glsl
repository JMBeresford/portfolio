uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying float vRand;
varying float vSize;
varying float vFade;

#define S smoothstep

vec3 getColor(void) {
    float progress = (sin((uTime + vRand * 1000.0) * 0.2) + 1.0) * 0.5;

    vec3 c = mix(uColor1, uColor2, S(0.0, 0.33, progress));
    c = mix(c, uColor3, S(0.33, 0.66, progress));
    c = mix(c, vec3(1.0), S(0.66, 1.0, progress));

    return c;
}

void main() {
    vec2 st = (gl_PointCoord - 0.5) * 2.0;

    float d = length(st);

    float fade = S(5.0, 8.0, vSize) * vFade;

    float opacity = S(0.1, 0.75, 0.1 / d) * fade;

    vec3 color = getColor() * opacity;

    gl_FragColor = vec4(color, opacity);
}