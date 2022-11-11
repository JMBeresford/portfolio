uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying float vRand;
varying float vSize;
varying vec3 vPos;

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

    st.x *= ((sin((uTime + vRand * 500.0) * 0.1) + 1.0) * 0.35) + 1.0;
    st.y *= ((cos((uTime + vRand * -420.0) * 0.1) + 1.0) * 0.35) + 1.0;

    float d = length(st);

    float fade = S(0.0, 8.0, vSize);
    float distanceFade = S(2.5, 0.5, distance(cameraPosition, vPos));

    float opacity = S(0.01, 1.0, pow(0.1 / d, 2.0)) * fade * distanceFade;

    vec3 color = getColor() * opacity;

    gl_FragColor = vec4(color, opacity);
}