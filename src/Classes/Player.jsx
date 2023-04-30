import * as THREE from "three";
import Model3D from "./importModels.jsx";

export default class PlayerClass{
    constructor(scene){
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.cdist = 20;
        this.cameraOffset = new THREE.Vector3(this.cdist, this.cdist, this.cdist);
        this.setup();

        // Movement Configurations
        this.movementSpeed = 0.5;
        this.cameraTween = 0.2;

        // Player Configurations
        this.playerHeight = 4;
        this.playerRadius = 2;
        this.playerGeometry = new THREE.CapsuleGeometry(this.playerRadius, this.playerHeight, 10, 20);
        this.playerMaterial = new THREE.MeshStandardMaterial({color: "#ffffff"});
        this.playerMesh = new THREE.Mesh(this.playerGeometry, this.playerMaterial);
        // this.playerModel = new Model3D('./src/assets/models/characterSKIN/amongUS.gltf', scene, 10);
        // this.playerMesh = this.playerModel.loadedModel
        this.playerMesh.position.set(0, this.playerHeight, 0);
        scene.add(this.playerMesh);

        this.setCameraTargetPosition(this.playerMesh.position + new THREE.Vector3(this.cdist, this.cdist, this.cdist));
    }

    setup(){
        // Requires: this.cdist;
        this.camera.position.x = this.cdist;
        this.camera.position.y = this.cdist;
        this.camera.position.z = this.cdist;
        this.camera.targetPosition = this.camera.position;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0) );
    }

    // Camera Functions
    setCameraPosition(newPosition){
        this.camera.position.set(newPosition.x, newPosition.y, newPosition.z);
    }

    setCameraTargetPosition(newPosition){
        this.targetPosition = newPosition;
    }

    getCameraPosition(){
        return this.camera.position;
    }

    setCameraLookAt(lookAtPos){
        this.camera.lookAt(lookAtPos);
    }

    // Player Functions
    getPlayerMesh(){
        return this.playerMesh;
    }

    updateMovement(movementDirection){
        this.playerMesh.position.x += movementDirection.x * this.movementSpeed;
        this.playerMesh.position.z += movementDirection.z * this.movementSpeed;
    }

    updateCamera(){
        this.setCameraPosition(new THREE.Vector3(
            this.playerMesh.position.x + this.cdist, 
            this.playerMesh.position.y + this.cdist, 
            this.playerMesh.position.z + this.cdist));
    }
}

// module.exports = { CameraClass };