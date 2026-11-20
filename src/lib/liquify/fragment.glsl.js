const fragmentShader = `
uniform sampler2D uTrail;
uniform vec2 uResolution;

varying vec2 vUv;

float blurTrail(vec2 uv){

    vec2 texel = 1.0 / uResolution;

    float sum = 0.0;

    sum += texture2D(uTrail, uv).r * 4.0;

    sum += texture2D(uTrail, uv + vec2(texel.x,0.0)).r;
    sum += texture2D(uTrail, uv - vec2(texel.x,0.0)).r;
    sum += texture2D(uTrail, uv + vec2(0.0,texel.y)).r;
    sum += texture2D(uTrail, uv - vec2(0.0,texel.y)).r;

    return sum / 8.0;

}

void main() {

    vec2 uv = vUv;

    // How far to sample neighbouring pixels
    vec2 texel = vec2(1.0) / 256.0;

    // Sample neighbouring pixels
    float left = blurTrail(uv - vec2(texel.x,0.0));
    float right = blurTrail(uv + vec2(texel.x,0.0));

    float top = blurTrail(uv + vec2(0.0,texel.y));
    float bottom = blurTrail(uv - vec2(0.0,texel.y));

    float center = blurTrail(uv);

    // Compute surface slope
    vec3 normal = normalize(vec3(
    (left - right) * 2.0,
    (bottom - top) * 2.0,
    0.15
    ));

    // Fake light direction
    vec3 light = normalize(vec3(
        -0.4,
        0.5,
        1.0
    ));

    // Diffuse lighting
    float diffuse = max(dot(normal, light), 0.0);

    // View direction (camera looking straight at screen)
    vec3 view = vec3(0.0, 0.0, 1.0);

    // Fresnel - brighter at glancing angles
    float fresnel = pow(
        1.0 - max(dot(normal, view), 0.0),
        3.0
    );

    // Combine
    float intensity =
        diffuse * 0.35 +
        fresnel * 0.9;


    // White highlight
    vec3 color = mix(
    vec3(0.82, 0.88, 1.0),
    vec3(1.0),
    diffuse
    );

    color *= intensity;

    gl_FragColor = vec4(
        color,
        smoothstep(0.08, 0.6, intensity) * 0.18
    );

    vec3 halfVector = normalize(light + view);

    float specular = pow(
        max(dot(normal, halfVector), 0.0),
        64.0
    );

    color += specular * 0.8;

}
`;

export default fragmentShader;
