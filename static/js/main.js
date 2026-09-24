// =====================================================
// RackSim 3D
// Server Rack Cabinet - Cabinet Design Only
// Three.js r128
// =====================================================


// =====================================================
// 1. Scene
// =====================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xffffff);


// =====================================================
// 2. Camera
// =====================================================

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(5.5, 3.2, 8);

camera.lookAt(0, 0.2, 0);


// =====================================================
// 3. Renderer
// =====================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

document.body.appendChild(
    renderer.domElement
);


// =====================================================
// 4. Lighting
// =====================================================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.8
    );

scene.add(ambientLight);


const mainLight =
    new THREE.DirectionalLight(
        0xffffff,
        2.5
    );

mainLight.position.set(
    5,
    8,
    8
);

mainLight.castShadow = true;

scene.add(mainLight);


const frontLight =
    new THREE.PointLight(
        0xffffff,
        1.5,
        15
    );

frontLight.position.set(
    0,
    2,
    7
);

scene.add(frontLight);


const sideLight =
    new THREE.PointLight(
        0xcceeff,
        1.5,
        15
    );

sideLight.position.set(
    -5,
    2,
    3
);

scene.add(sideLight);


// =====================================================
// 5. Floor
// =====================================================

const floorGeometry =
    new THREE.PlaneGeometry(
        30,
        30
    );


const floorMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xf1f3f5,

        roughness: 0.8,

        metalness: 0

    });


const floor =
    new THREE.Mesh(
        floorGeometry,
        floorMaterial
    );

floor.rotation.x =
    -Math.PI / 2;

floor.position.y =
    -4.55;

floor.receiveShadow = true;

scene.add(floor);


// =====================================================
// 6. Rack Group
// =====================================================

const rackGroup =
    new THREE.Group();

scene.add(rackGroup);


// =====================================================
// 7. Rack Dimensions
// =====================================================

const rackWidth = 3.2;

const rackHeight = 8.4;

const rackDepth = 3.0;


// =====================================================
// 8. Materials
// =====================================================

const frameMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x263238,

        metalness: 0.8,

        roughness: 0.28

    });


const panelMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x37474f,

        metalness: 0.7,

        roughness: 0.32

    });


const darkMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x172027,

        metalness: 0.75,

        roughness: 0.3

    });


const glassMaterial =
    new THREE.MeshPhysicalMaterial({

        color: 0xb8dce8,

        transparent: true,

        opacity: 0.18,

        roughness: 0.08,

        metalness: 0.05,

        transmission: 0.05,

        side: THREE.DoubleSide

    });


// =====================================================
// 9. Helper Function
// =====================================================

function addBox(
    width,
    height,
    depth,
    material,
    x,
    y,
    z
) {

    const geometry =
        new THREE.BoxGeometry(
            width,
            height,
            depth
        );


    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );


    mesh.position.set(
        x,
        y,
        z
    );


    mesh.castShadow = true;

    mesh.receiveShadow = true;


    rackGroup.add(mesh);


    return mesh;
}


// =====================================================
// 10. Main Vertical Frame
// =====================================================

const columnWidth = 0.18;


// Front Left
addBox(
    columnWidth,
    rackHeight,
    columnWidth,
    frameMaterial,

    -1.51,
    0,
    1.38
);


// Front Right
addBox(
    columnWidth,
    rackHeight,
    columnWidth,
    frameMaterial,

    1.51,
    0,
    1.38
);


// Back Left
addBox(
    columnWidth,
    rackHeight,
    columnWidth,
    frameMaterial,

    -1.51,
    0,
    -1.38
);


// Back Right
addBox(
    columnWidth,
    rackHeight,
    columnWidth,
    frameMaterial,

    1.51,
    0,
    -1.38
);


// =====================================================
// 11. Top
// =====================================================

addBox(
    rackWidth,
    0.22,
    rackDepth,

    panelMaterial,

    0,
    4.21,
    0
);


// =====================================================
// 12. Bottom
// =====================================================

addBox(
    rackWidth,
    0.25,
    rackDepth,

    panelMaterial,

    0,
    -4.21,
    0
);


// =====================================================
// 13. Left Side Panel
// =====================================================

addBox(
    0.14,
    8.15,
    2.72,

    panelMaterial,

    -1.55,
    0,
    0
);


// =====================================================
// 14. Right Side Panel
// =====================================================

addBox(
    0.14,
    8.15,
    2.72,

    panelMaterial,

    1.55,
    0,
    0
);


// =====================================================
// 15. Back Panel
// =====================================================

addBox(
    2.95,
    8.15,
    0.14,

    darkMaterial,

    0,
    0,
    -1.45
);


// =====================================================
// 16. Front Door Frame
// =====================================================

const doorWidth = 3.0;

const doorHeight = 7.9;


// Left Door Frame
addBox(
    0.16,
    doorHeight,
    0.16,

    frameMaterial,

    -1.42,
    0,
    1.52
);


// Right Door Frame
addBox(
    0.16,
    doorHeight,
    0.16,

    frameMaterial,

    1.42,
    0,
    1.52
);


// Top Door Frame
addBox(
    doorWidth,
    0.16,
    0.16,

    frameMaterial,

    0,
    3.88,
    1.52
);


// Bottom Door Frame
addBox(
    doorWidth,
    0.16,
    0.16,

    frameMaterial,

    0,
    -3.88,
    1.52
);


// =====================================================
// 17. Glass Door
// =====================================================

const glassGeometry =
    new THREE.BoxGeometry(
        2.72,
        7.55,
        0.035
    );


const glassDoor =
    new THREE.Mesh(
        glassGeometry,
        glassMaterial
    );


glassDoor.position.set(
    0,
    0,
    1.50
);


glassDoor.castShadow = false;

glassDoor.receiveShadow = true;

rackGroup.add(
    glassDoor
);


// =====================================================
// 18. Door Handle
// =====================================================

const handleMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x111820,

        metalness: 0.9,

        roughness: 0.18

    });


addBox(
    0.12,
    1.1,
    0.12,

    handleMaterial,

    1.20,
    0,
    1.67
);


addBox(
    0.25,
    0.12,
    0.12,

    handleMaterial,

    1.08,
    0.52,
    1.67
);


addBox(
    0.25,
    0.12,
    0.12,

    handleMaterial,

    1.08,
    -0.52,
    1.67
);


// =====================================================
// 19. Door Hinges
// =====================================================

const hingeMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x607d8b,

        metalness: 0.8,

        roughness: 0.25

    });


for (
    let i = 0;
    i < 3;
    i++
) {

    const hinge =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.07,
                0.07,
                0.32,
                16
            ),

            hingeMaterial
        );


    hinge.rotation.z =
        Math.PI / 2;


    hinge.position.set(
        -1.43,
        2.6 - (i * 2.6),
        1.62
    );


    rackGroup.add(hinge);
}


// =====================================================
// 20. Internal Rack Rails
// =====================================================

const railMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x111820,

        metalness: 0.85,

        roughness: 0.25

    });


// Left rail
addBox(
    0.12,
    7.8,
    0.12,

    railMaterial,

    -1.28,
    0,
    1.20
);


// Right rail
addBox(
    0.12,
    7.8,
    0.12,

    railMaterial,

    1.28,
    0,
    1.20
);


// =====================================================
// 21. Rack Rail Holes
// =====================================================

const holeMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x78909c

    });


const unitHeight =
    rackHeight / 42;


for (
    let i = 0;
    i < 42;
    i++
) {

    const y =
        -3.95 +
        (i * unitHeight);


    // Left hole
    const leftHole =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.025,
                0.035,
                0.025
            ),

            holeMaterial
        );


    leftHole.position.set(
        -1.28,
        y,
        1.28
    );


    rackGroup.add(
        leftHole
    );


    // Right hole
    const rightHole =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.025,
                0.035,
                0.025
            ),

            holeMaterial
        );


    rightHole.position.set(
        1.28,
        y,
        1.28
    );


    rackGroup.add(
        rightHole
    );
}


// =====================================================
// 22. Top Ventilation
// =====================================================

const ventMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x101820,

        metalness: 0.7,

        roughness: 0.4

    });


for (
    let i = 0;
    i < 5;
    i++
) {

    addBox(
        0.35,
        0.04,
        1.0,

        ventMaterial,

        -0.85 + (i * 0.42),
        4.34,
        0
    );
}


// =====================================================
// 23. Bottom Feet
// =====================================================

const footMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x111820,

        metalness: 0.85,

        roughness: 0.3

    });


const footPositions = [
    [-1.25, -4.45, 1.1],
    [1.25, -4.45, 1.1],
    [-1.25, -4.45, -1.1],
    [1.25, -4.45, -1.1]
];


footPositions.forEach(
    function (position) {

        addBox(
            0.35,
            0.35,
            0.35,

            footMaterial,

            position[0],
            position[1],
            position[2]
        );

    }
);


// =====================================================
// 24. Front Status Light
// =====================================================

const statusLight =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            0.07,
            16,
            16
        ),

        new THREE.MeshBasicMaterial({
            color: 0x00cc88
        })
    );


statusLight.position.set(
    -1.18,
    3.65,
    1.64
);


rackGroup.add(
    statusLight
);


// =====================================================
// 25. Mouse Rotation
// =====================================================

let isDragging = false;

let hasDragged = false;


let previousMousePosition = {
    x: 0,
    y: 0
};


window.addEventListener(
    "mousedown",
    function (event) {

        isDragging = true;

        hasDragged = false;

        previousMousePosition.x =
            event.clientX;

        previousMousePosition.y =
            event.clientY;

    }
);


window.addEventListener(
    "mousemove",
    function (event) {

        if (!isDragging) {
            return;
        }


        const deltaX =
            event.clientX -
            previousMousePosition.x;


        const deltaY =
            event.clientY -
            previousMousePosition.y;


        if (
            Math.abs(deltaX) > 2 ||
            Math.abs(deltaY) > 2
        ) {

            hasDragged = true;

        }


        rackGroup.rotation.y +=
            deltaX * 0.006;


        rackGroup.rotation.x +=
            deltaY * 0.004;


        const maxRotation =
            Math.PI / 5;


        rackGroup.rotation.x =
            Math.max(
                -maxRotation,
                Math.min(
                    maxRotation,
                    rackGroup.rotation.x
                )
            );


        previousMousePosition.x =
            event.clientX;

        previousMousePosition.y =
            event.clientY;

    }
);


window.addEventListener(
    "mouseup",
    function () {

        isDragging = false;

    }
);


window.addEventListener(
    "blur",
    function () {

        isDragging = false;

    }
);


// =====================================================
// 26. Animation
// =====================================================

let time = 0;


function animate() {

    requestAnimationFrame(
        animate
    );


    time += 0.03;


    // Status light pulse
    const pulse =
        0.8 +
        Math.sin(time * 2) * 0.2;


    statusLight.scale.set(
        pulse,
        pulse,
        pulse
    );


    renderer.render(
        scene,
        camera
    );

}


animate();


// =====================================================
// 27. Resize
// =====================================================

window.addEventListener(
    "resize",
    function () {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);