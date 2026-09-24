// =====================================================
// RackSim 3D
// Improved Visibility Version
// =====================================================


// =====================================================
// 1. Scene
// =====================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x0b0d14);


// =====================================================
// 2. Camera
// =====================================================

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(4, 2.2, 7);

// مهم جداً: توجيه الكاميرا إلى منتصف الـ Rack
camera.lookAt(0, 0, 0);


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

document.body.appendChild(
    renderer.domElement
);


// =====================================================
// 4. Lighting
// =====================================================

// إضاءة عامة
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.0
);

scene.add(ambientLight);


// إضاءة رئيسية من الأمام
const frontLight = new THREE.DirectionalLight(
    0xffffff,
    2.0
);

frontLight.position.set(
    4,
    6,
    8
);

frontLight.castShadow = true;

scene.add(frontLight);


// إضاءة من اليسار
const leftLight = new THREE.PointLight(
    0x00ccff,
    3,
    12
);

leftLight.position.set(
    -4,
    2,
    5
);

scene.add(leftLight);


// إضاءة من اليمين
const rightLight = new THREE.PointLight(
    0x00ffcc,
    2.5,
    12
);

rightLight.position.set(
    4,
    1,
    4
);

scene.add(rightLight);


// إضاءة خلفية
const blueLight = new THREE.PointLight(
    0x0066ff,
    2,
    10
);

blueLight.position.set(
    0,
    0,
    -4
);

scene.add(blueLight);


// =====================================================
// 5. Rack Group
// =====================================================

const rackGroup = new THREE.Group();

scene.add(rackGroup);


// =====================================================
// 6. Rack Frame
// =====================================================

const frameGeometry = new THREE.BoxGeometry(
    2.4,
    4.4,
    2.4
);

const frameMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    wireframe: true,
    transparent: true,
    opacity: 0.45
});

const frame = new THREE.Mesh(
    frameGeometry,
    frameMaterial
);

rackGroup.add(frame);


// =====================================================
// 7. Servers
// =====================================================

const servers = [];

const serverGeometry = new THREE.BoxGeometry(
    2.05,
    0.38,
    2.05
);


for (let i = 0; i < 6; i++) {

    // -------------------------------------------------
    // Server Material
    // -------------------------------------------------

    const serverMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x596273,

            metalness: 0.65,

            roughness: 0.28

        });


    // -------------------------------------------------
    // Server
    // -------------------------------------------------

    const server = new THREE.Mesh(
        serverGeometry,
        serverMaterial
    );

    server.castShadow = true;

    server.receiveShadow = true;


    // Position
    server.position.y =
        -1.5 + (i * 0.6);


    // -------------------------------------------------
    // Server Data
    // -------------------------------------------------

    server.userData.serverNumber =
        i + 1;

    server.userData.unit =
        i + 1;

    server.userData.status =
        "Active";

    server.userData.temperature =
        24;

    server.userData.power =
        420;


    // -------------------------------------------------
    // Front Panel
    // -------------------------------------------------

    const panelGeometry =
        new THREE.BoxGeometry(
            1.85,
            0.28,
            0.04
        );

    const panelMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x252a36,

            metalness: 0.5,

            roughness: 0.35

        });

    const frontPanel =
        new THREE.Mesh(
            panelGeometry,
            panelMaterial
        );

    frontPanel.position.set(
        0,
        0,
        1.04
    );

    server.add(frontPanel);


    // -------------------------------------------------
    // LED
    // -------------------------------------------------

    const ledGeometry =
        new THREE.SphereGeometry(
            0.065,
            16,
            16
        );


    const ledMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x00ff33
        });


    const led =
        new THREE.Mesh(
            ledGeometry,
            ledMaterial
        );


    led.position.set(
        0.82,
        0,
        1.08
    );


    server.add(led);


    server.userData.led =
        led;


    // -------------------------------------------------
    // Second LED
    // -------------------------------------------------

    const networkLedMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x0088ff
        });


    const networkLed =
        new THREE.Mesh(
            ledGeometry,
            networkLedMaterial
        );


    networkLed.position.set(
        0.62,
        0,
        1.08
    );


    server.add(networkLed);


    server.userData.networkLed =
        networkLed;


    // -------------------------------------------------
    // Add Server
    // -------------------------------------------------

    rackGroup.add(server);

    servers.push(server);
}


// =====================================================
// 8. Rack Rotation
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


        // دوران أفقي
        rackGroup.rotation.y +=
            deltaX * 0.008;


        // دوران رأسي
        rackGroup.rotation.x +=
            deltaY * 0.008;


        // منع الانقلاب
        const maxRotation =
            Math.PI / 3;


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
// 9. Raycaster
// =====================================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


window.addEventListener(
    "click",
    function (event) {

        // لا تعتبر السحب Click
        if (hasDragged) {

            hasDragged = false;

            return;

        }


        // Mouse coordinates
        mouse.x =
            (event.clientX /
                window.innerWidth) * 2 - 1;


        mouse.y =
            -(event.clientY /
                window.innerHeight) * 2 + 1;


        // Ray
        raycaster.setFromCamera(
            mouse,
            camera
        );


        // البحث عن السيرفر
        const intersects =
            raycaster.intersectObjects(
                servers,
                false
            );


        if (intersects.length === 0) {

            return;

        }


        const clickedServer =
            intersects[0].object;


        // -------------------------------------------------
        // Reset
        // -------------------------------------------------

        servers.forEach(
            function (server) {

                server.material.color.setHex(
                    0x596273
                );

            }
        );


        // -------------------------------------------------
        // Highlight
        // -------------------------------------------------

        clickedServer.material.color.setHex(
            0x00ffcc
        );


        // -------------------------------------------------
        // Information
        // -------------------------------------------------

        const serverNumber =
            clickedServer.userData.serverNumber;

        const unit =
            clickedServer.userData.unit;

        const status =
            clickedServer.userData.status;

        const temperature =
            clickedServer.userData.temperature;

        const power =
            clickedServer.userData.power;


        const desc =
            document.getElementById(
                "desc"
            );


        if (desc) {

            desc.innerHTML =
                "<strong>Server " +
                serverNumber +
                "</strong><br>" +

                "Rack Unit: " +
                unit +
                "U<br>" +

                "الحالة: " +
                status +
                "<br>" +

                "الحرارة: " +
                temperature +
                "°C<br>" +

                "الطاقة: " +
                power +
                "W";

        }

    }
);


// =====================================================
// 10. LED Animation
// =====================================================

let ledTime = 0;


function animateLEDs() {

    ledTime += 0.05;


    servers.forEach(
        function (server, index) {

            const led =
                server.userData.led;


            const networkLed =
                server.userData.networkLed;


            if (led) {

                const pulse =
                    0.85 +
                    Math.sin(
                        ledTime * 2 +
                        index
                    ) * 0.15;


                led.scale.set(
                    pulse,
                    pulse,
                    pulse
                );

            }


            if (networkLed) {

                const networkPulse =
                    0.75 +
                    Math.sin(
                        ledTime * 3 +
                        index
                    ) * 0.25;


                networkLed.scale.set(
                    networkPulse,
                    networkPulse,
                    networkPulse
                );

            }

        }
    );

}


// =====================================================
// 11. Animation
// =====================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    animateLEDs();


    renderer.render(
        scene,
        camera
    );

}


animate();


// =====================================================
// 12. Resize
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