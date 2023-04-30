import * as THREE from "three";

import "../styles/App.css";
import { setup_renderer } from "../Classes/Settings.jsx";

import PlayerClass from "../Classes/Player.jsx";

import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";

// [[ MARIO 4 IMPORTS ]]
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js";
import { VOXLoader} from "three/addons/loaders/VOXLoader.js";
import { GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

import Model3D from "../Classes/importModels.jsx";

import { TestBuilding } from "../Classes/testBuilding";

import { InteractionSystem } from "../Classes/InteractionSystem";

import TextBox from "../components/TextBox";

// Constant Variable Settings
const playerMovespeed = 1;
// ------------------------------------------------------------------------------------------
// [[ HELPER FUNCTIONS ]]
function setup_map(scene){
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.castShadow = true;
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.castShadow = true;
  spotLight.position.set(0, 64, 32);
  scene.add(spotLight);

  // Baseplate
  const baseplateGeometry = new THREE.BoxGeometry(500, 1, 500);
  const baseplateMaterial = new THREE.MeshStandardMaterial({color: "#00b84c"});
  const baseplateMesh = new THREE.Mesh(baseplateGeometry, baseplateMaterial);
  baseplateMesh.position.set(0, -1, 0);
  scene.add(baseplateMesh);
}

function createInputListenerEvents(document, keysPressed){
  document.addEventListener('keydown', (event) => {
    keysPressed[event.key.toLowerCase()] = true;
  });


  document.addEventListener('keyup', (event) => {
    keysPressed[event.key.toLowerCase()] = false;
  });
}

function getMovementDirection(keysPressed) {
  var movementDirection = new THREE.Vector3(0, 0, 0);
  if (keysPressed["w"]) {
    movementDirection.x -= playerMovespeed;
  }
  if (keysPressed["a"]) {
    movementDirection.z += playerMovespeed;
  }
  if (keysPressed["s"]) {
    movementDirection.x += playerMovespeed;
  }
  if (keysPressed["d"]) {
    movementDirection.z -= playerMovespeed;
  }
  // Rotate to compensate for the Camera's angle
  var axis = new THREE.Vector3(0, 1, 0); // Normalized Vector
  var angle = -Math.PI / 4;
  movementDirection.applyAxisAngle(axis, angle);
  movementDirection.normalize();

  return movementDirection;
}

// ------------------------------------------------------------------------------------------


function Home() {
  const [showModal, setShowModal] = useState(false); // set true for testing, false for production
  const [showText, setShowText] = useState("");
  
  useEffect(() => {
    const scene = new THREE.Scene();

    let PlayerController = new PlayerClass(scene);
    // Input Controller

    // [[ MARIO 1 ]]
    const scene2 = new THREE.Scene();
    const cam2 = new THREE.PerspectiveCamera(5, 1, 0.1, 1000);
    cam2.position.z = 30;
    const canvas2 = document.getElementById("globe-3js");
    const renderer2 = new THREE.WebGLRenderer({
      canvas: canvas2,
      antialias: true,
    });
    renderer2.setSize(60, 60);
    renderer2.setClearColor( 0x000000, 0 );
    // canvas2_container.appendChild(renderer2.domElement);

    // [[ MARIO 2 ]]
    // initializes into the scene
    let logoModel = new Model3D('src/assets/models/low_poly_earth.gltf', scene2, 10);
    const light = new THREE.PointLight(0xffffff, 2, 200);
    light.position.set(4.5, 10, 4.5)
    scene2.add(light)
    // [[ END OF MARIO 2 ]]

    //nuclear plant model
    let nuclearModel = new Model3D('src/assets/models/scene.gltf', scene, 20, -20, -1.2, 50);
    let windTurbine = new Model3D('src/assets/models/windTurbine.gltf', scene, 20, -30, 0, -30);

    //solar panels
    const sp = new THREE.Vector3(-20, 10, -80);
    for (let i = 0; i < 5; i++) {
      new Model3D('src/assets/models/soler_panel_setup/scene.gltf', scene, 10, sp.x,0,sp.z + (i*6))
    }
    for (let i = 0; i < 5; i++) {
      new Model3D('src/assets/models/soler_panel_setup/scene.gltf', scene, 10, sp.x + 8 ,0,sp.z + (i*6))
    }
    for (let i = 0; i < 5; i++) {
      new Model3D('src/assets/models/soler_panel_setup/scene.gltf', scene, 10, sp.x + 8*2, 0, sp.z + (i*6))
    }

    const canvas = document.getElementById("myThreeJsCanvas");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    setup_renderer(renderer);

    // Baseplate
    const baseplateGeometry = new THREE.BoxGeometry(100, 1, 100);
    const baseplateMaterial = new THREE.MeshStandardMaterial({
      color: "#00b84c",
    });
    const baseplateMesh = new THREE.Mesh(baseplateGeometry, baseplateMaterial);
    baseplateMesh.position.set(0, -1, 0);
    scene.add(baseplateMesh);

    setup_map(scene);

    // Input Event Listener
    let keysPressed = {};
    createInputListenerEvents(document, keysPressed);

    // Buildings + Interaction System 
    
    // System Building Check
    // let building1Position = new THREE.Vector3(-40, 10, -40);
    // let building1 = new TestBuilding(scene, "Wind Turbine", {radius:5, height:20}, "#ff1fa9", building1Position, 10);
    // scene.add(building1.buildMesh);

    let system = new InteractionSystem(scene);
    system.setup_buildings();


    let count = 0;
    let countMax = 20;

    // Animate    
    const animate = () => {
      logoModel.rotate_y(0.02);
      
      // Player Movement Update
      let movementDirection = getMovementDirection(keysPressed);
      PlayerController.updateMovement(movementDirection);
      PlayerController.updateCamera();

      if (count > countMax){
        let proximityResponse = system.checkBuildingProximity(PlayerController.playerMesh.position);
        console.log('PR:', proximityResponse[0], "\n", proximityResponse[1]);
        console.log(showText);
        if (proximityResponse[0]){
          // change the text here:
          setShowText(proximityResponse[1]);
        }
        count = 0;
      }
      else{
        count += 1;
      }
      // Render into the scene
      renderer.render(scene, PlayerController.camera);
      renderer2.render(scene2, cam2);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <Nav
        canvas={
          <div id="canvas2-container" className="logo">
            <canvas id="globe-3js" />
          </div>
        }
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <canvas id="myThreeJsCanvas" />

      <AnimatePresence>
        {showModal && <Modal setShowModal={setShowModal} />}
      </AnimatePresence>
    </>
  );
}

export default Home;
