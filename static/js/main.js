// ==========================================
// RackSim 3D - Rack Cabinet
// ==========================================

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// ==========================================
// Camera
// ==========================================

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const defaultCameraPosition = new THREE.Vector3(5.5, 3.2, 8);

camera.position.copy(defaultCameraPosition);
camera.lookAt(0, 0.2, 0);

// ==========================================
// Renderer
// ==========================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

// ==========================================
// Lights
// ==========================================

const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
mainLight.position.set(5, 10, 8);
mainLight.castShadow = true;

mainLight.shadow.mapSize.width = 2048;
mainLight.shadow.mapSize.height = 2048;

scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-6, 5, 3);
scene.add(fillLight);

// ==========================================
// Floor
// ==========================================

const floorGeometry = new THREE.PlaneGeometry(30, 30);

const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xf4f4f4,
    roughness: 0.8,
    metalness: 0
});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.rotation.x = -Math.PI / 2;
floor.position.y = -4.25;
floor.receiveShadow = true;

scene.add(floor);

// ==========================================
// Rack Group
// ==========================================

const rackGroup = new THREE.Group();

scene.add(rackGroup);

// ==========================================
// Rack Dimensions
// ==========================================

const rackWidth = 3.2;
const rackHeight = 8.4;
const rackDepth = 3.0;

const rackFrontZ = rackDepth / 2;
const rackBackZ = -rackDepth / 2;

// ==========================================
// Materials
// ==========================================

const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.85,
    roughness: 0.3
});

const metal = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.8,
    roughness: 0.35
});

const blackMetal = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.9,
    roughness: 0.25
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x9fd4e8,
    transparent: true,
    opacity: 0.16,
    roughness: 0.05,
    metalness: 0.1
});

// ==========================================
// Helper: Create Box
// ==========================================

function createBox(
    width,
    height,
    depth,
    material,
    x,
    y,
    z
) {

    const geometry = new THREE.BoxGeometry(
        width,
        height,
        depth
    );

    const mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    rackGroup.add(mesh);

    return mesh;
}

// ==========================================
// Rack Main Frame
// ==========================================

// Left vertical frame
createBox(
    0.22,
    rackHeight,
    0.25,
    darkMetal,
    -rackWidth / 2,
    0,
    rackFrontZ
);

// Right vertical frame
createBox(
    0.22,
    rackHeight,
    0.25,
    darkMetal,
    rackWidth / 2,
    0,
    rackFrontZ
);

// Back vertical supports
createBox(
    0.18,
    rackHeight,
    0.18,
    darkMetal,
    -rackWidth / 2,
    0,
    rackBackZ
);

createBox(
    0.18,
    rackHeight,
    0.18,
    darkMetal,
    rackWidth / 2,
    0,
    rackBackZ
);

// ==========================================
// Top / Bottom
// ==========================================

createBox(
    rackWidth,
    0.25,
    rackDepth,
    blackMetal,
    0,
    rackHeight / 2,
    0
);

createBox(
    rackWidth,
    0.25,
    rackDepth,
    blackMetal,
    0,
    -rackHeight / 2,
    0
);

// ==========================================
// Side Panels
// ==========================================

createBox(
    0.12,
    rackHeight - 0.4,
    rackDepth - 0.35,
    darkMetal,
    -rackWidth / 2 + 0.08,
    0,
    0
);

createBox(
    0.12,
    rackHeight - 0.4,
    rackDepth - 0.35,
    darkMetal,
    rackWidth / 2 - 0.08,
    0,
    0
);

// ==========================================
// Back Panel
// ==========================================

createBox(
    rackWidth - 0.3,
    rackHeight - 0.4,
    0.12,
    darkMetal,
    0,
    0,
    rackBackZ
);

// ==========================================
// Front Door Frame
// ==========================================

const doorWidth = rackWidth - 0.18;
const doorHeight = rackHeight - 0.18;

createBox(
    0.12,
    doorHeight,
    0.16,
    blackMetal,
    -doorWidth / 2,
    0,
    rackFrontZ + 0.1
);

createBox(
    0.12,
    doorHeight,
    0.16,
    blackMetal,
    doorWidth / 2,
    0,
    rackFrontZ + 0.1
);

createBox(
    doorWidth,
    0.12,
    0.16,
    blackMetal,
    0,
    doorHeight / 2,
    rackFrontZ + 0.1
);

createBox(
    doorWidth,
    0.12,
    0.16,
    blackMetal,
    0,
    -doorHeight / 2,
    rackFrontZ + 0.1
);

// ==========================================
// Glass Door
// ==========================================

const glassGeometry = new THREE.BoxGeometry(
    doorWidth - 0.15,
    doorHeight - 0.15,
    0.035
);

const glassDoor = new THREE.Mesh(
    glassGeometry,
    glassMaterial
);

glassDoor.position.set(
    0,
    0,
    rackFrontZ + 0.08
);

rackGroup.add(glassDoor);

// ==========================================
// Door Handle
// ==========================================

createBox(
    0.08,
    1.0,
    0.10,
    metal,
    doorWidth / 2 - 0.18,
    0,
    rackFrontZ + 0.22
);

// Handle supports

createBox(
    0.16,
    0.08,
    0.12,
    metal,
    doorWidth / 2 - 0.18,
    0.5,
    rackFrontZ + 0.22
);

createBox(
    0.16,
    0.08,
    0.12,
    metal,
    doorWidth / 2 - 0.18,
    -0.5,
    rackFrontZ + 0.22
);

// ==========================================
// Hinges
// ==========================================

function createHinge(y) {

    const geometry = new THREE.CylinderGeometry(
        0.09,
        0.09,
        0.45,
        16
    );

    const hinge = new THREE.Mesh(
        geometry,
        metal
    );

    hinge.rotation.z = Math.PI / 2;

    hinge.position.set(
        -doorWidth / 2 - 0.04,
        y,
        rackFrontZ + 0.15
    );

    hinge.castShadow = true;

    rackGroup.add(hinge);
}

createHinge(2.8);
createHinge(-2.8);

// ==========================================
// Internal Rack Rails
// ==========================================

const railX = 1.22;

createBox(
    0.12,
    rackHeight - 0.6,
    0.18,
    metal,
    -railX,
    0,
    rackFrontZ - 0.15
);

createBox(
    0.12,
    rackHeight - 0.6,
    0.18,
    metal,
    railX,
    0,
    rackFrontZ - 0.15
);

// Back rails

createBox(
    0.10,
    rackHeight - 0.6,
    0.15,
    metal,
    -railX,
    0,
    rackBackZ + 0.15
);

createBox(
    0.10,
    rackHeight - 0.6,
    0.15,
    metal,
    railX,
    0,
    rackBackZ + 0.15
);

// ==========================================
// Rack U Positions
// ==========================================

const units = 42;

const usableHeight = 7.65;
const unitHeight = usableHeight / units;

const firstU = -usableHeight / 2 + unitHeight / 2;

// ==========================================
// U Holes
// ==========================================

const holeMaterial = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.7,
    roughness: 0.35
});

for (let i = 0; i < units; i++) {

    const y = firstU + i * unitHeight;

    for (const x of [-1.22, 1.22]) {

        const geometry = new THREE.BoxGeometry(
            0.07,
            0.035,
            0.025
        );

        const hole = new THREE.Mesh(
            geometry,
            holeMaterial
        );

        hole.position.set(
            x,
            y,
            rackFrontZ + 0.16
        );

        rackGroup.add(hole);
    }
}

// ==========================================
// U Number Labels
// ==========================================

function createTextSprite(text) {

    const canvas = document.createElement("canvas");

    canvas.width = 128;
    canvas.height = 64;

    const context = canvas.getContext("2d");

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    context.font = "bold 28px Arial";
    context.fillStyle = "#222222";
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillText(
        text,
        canvas.width / 2,
        canvas.height / 2
    );

    const texture = new THREE.CanvasTexture(canvas);

    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true
    });

    const sprite = new THREE.Sprite(material);

    sprite.scale.set(0.42, 0.21, 1);

    return sprite;
}

// ==========================================
// Add U labels
// ==========================================

for (let i = 0; i < units; i++) {

    const uNumber = i + 1;

    const y = firstU + i * unitHeight;

    // Left label
    const leftLabel = createTextSprite("U" + uNumber);

    leftLabel.position.set(
        -1.48,
        y,
        rackFrontZ + 0.22
    );

    rackGroup.add(leftLabel);

    // Right label
    const rightLabel = createTextSprite("U" + uNumber);

    rightLabel.position.set(
        1.48,
        y,
        rackFrontZ + 0.22
    );

    rackGroup.add(rightLabel);
}

// ==========================================
// Top Ventilation
// ==========================================

for (let i = -5; i <= 5; i++) {

    createBox(
        0.16,
        0.08,
        1.8,
        blackMetal,
        i * 0.22,
        rackHeight / 2 + 0.14,
        0
    );
}

// ==========================================
// Feet
// ==========================================

const feetPositions = [
    [-1.25, -4.45, 1.1],
    [1.25, -4.45, 1.1],
    [-1.25, -4.45, -1.1],
    [1.25, -4.45, -1.1]
];

feetPositions.forEach(position => {

    createBox(
        0.45,
        0.35,
        0.45,
        blackMetal,
        position[0],
        position[1],
        position[2]
    );

});

// ==========================================
// Status Light
// ==========================================

const statusGeometry = new THREE.SphereGeometry(
    0.07,
    16,
    16
);

const statusMaterial = new THREE.MeshStandardMaterial({
    color: 0x00c853,
    emissive: 0x00c853,
    emissiveIntensity: 2
});

const statusLight = new THREE.Mesh(
    statusGeometry,
    statusMaterial
);

statusLight.position.set(
    -1.2,
    3.75,
    rackFrontZ + 0.25
);

rackGroup.add(statusLight);

// ==========================================
// Mouse Controls
// ==========================================

let isDragging = false;

let previousMouseX = 0;
let previousMouseY = 0;

let rotationVelocityX = 0;
let rotationVelocityY = 0;

const minVerticalRotation = -Math.PI / 5;
const maxVerticalRotation = Math.PI / 5;

renderer.domElement.addEventListener(
    "pointerdown",
    function(event) {

        isDragging = true;

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;

        rotationVelocityX = 0;
        rotationVelocityY = 0;

        renderer.domElement.setPointerCapture(
            event.pointerId
        );
    }
);

renderer.domElement.addEventListener(
    "pointermove",
    function(event) {

        if (!isDragging) return;

        const deltaX =
            event.clientX - previousMouseX;

        const deltaY =
            event.clientY - previousMouseY;

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;

        // Horizontal = 360°
        rackGroup.rotation.y += deltaX * 0.008;

        // Vertical
        rackGroup.rotation.x += deltaY * 0.005;

        rackGroup.rotation.x = Math.max(
            minVerticalRotation,
            Math.min(
                maxVerticalRotation,
                rackGroup.rotation.x
            )
        );

        rotationVelocityX = deltaX * 0.008;
        rotationVelocityY = deltaY * 0.005;
    }
);

renderer.domElement.addEventListener(
    "pointerup",
    function(event) {

        isDragging = false;

        try {
            renderer.domElement.releasePointerCapture(
                event.pointerId
            );
        } catch (error) {
            // Ignore
        }
    }
);

renderer.domElement.addEventListener(
    "pointerleave",
    function() {

        isDragging = false;
    }
);

// ==========================================
// Zoom
// ==========================================

renderer.domElement.addEventListener(
    "wheel",
    function(event) {

        event.preventDefault();

        const zoomSpeed = 0.6;

        camera.position.z +=
            event.deltaY * 0.002 * zoomSpeed;

        camera.position.z = Math.max(
            4.5,
            Math.min(14, camera.position.z)
        );

    },
    { passive: false }
);

// ==========================================
// Reset View Button
// ==========================================

const resetButton = document.createElement("button");

resetButton.innerText = "↻ Reset View";

resetButton.style.position = "absolute";
resetButton.style.left = "20px";
resetButton.style.top = "20px";

resetButton.style.padding = "10px 16px";

resetButton.style.background = "#ffffff";
resetButton.style.border = "2px solid #00bfa5";

resetButton.style.borderRadius = "8px";

resetButton.style.color = "#008f7c";

resetButton.style.fontSize = "14px";

resetButton.style.fontWeight = "bold";

resetButton.style.cursor = "pointer";

resetButton.style.zIndex = "20";

resetButton.style.boxShadow =
    "0 3px 12px rgba(0,0,0,0.12)";

document.body.appendChild(resetButton);

// ==========================================
// Reset Function
// ==========================================

resetButton.addEventListener(
    "click",
    function() {

        rackGroup.rotation.set(
            0,
            0,
            0
        );

        camera.position.copy(
            defaultCameraPosition
        );

        camera.lookAt(
            0,
            0.2,
            0
        );
    }
);

// ==========================================
// Resize
// ==========================================

window.addEventListener(
    "resize",
    function() {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);

// ==========================================
// Animation
// ==========================================

function animate() {

    requestAnimationFrame(animate);

    // Small inertia after dragging
    if (!isDragging) {

        rackGroup.rotation.y +=
            rotationVelocityX * 0.05;

        rackGroup.rotation.x +=
            rotationVelocityY * 0.05;

        rackGroup.rotation.x = Math.max(
            minVerticalRotation,
            Math.min(
                maxVerticalRotation,
                rackGroup.rotation.x
            )
        );

        rotationVelocityX *= 0.92;
        rotationVelocityY *= 0.92;
    }

    renderer.render(
        scene,
        camera
    );
}

animate();