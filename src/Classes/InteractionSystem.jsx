
import * as THREE from "three";

import { TestBuilding } from "./testBuilding";

export class InteractionSystem{
    constructor(scene){
        this.buildings = [];
        this.scene = scene;
    }

    setup_buildings(){
        let b1p = new THREE.Vector3(-30, 10, -30);
        let b1 = new TestBuilding(
            this.scene, "Wind Turbine", 
            {radius:5, height:20}, 
            "#ff1fa9", 
            b1p, 20);
        b1.buildMesh.visible = false;
        b1.info = "This is a sustainable energy source that works by using the power of the wind to turn the blades of a turbine, which in turn powers a generator to produce electricity.";
        

        let b2p = new THREE.Vector3(60, 10, -40);
        let b2 = new TestBuilding(
            this.scene, "Geothermal Power Plant", 
            {radius:5, height:20}, 
            "#9c4a2f", 
            b2p, 20);
        b2.buildMesh.visible = false;
        b2.info = "This is a sustainable energy source that works by harnessing heat from the Earth's core to create steam, which then drives a turbine that powers a generator to produce electricity.";

        let b3p = new THREE.Vector3(-20, 10, 50);
        let b3 = new TestBuilding(
            this.scene, "Nuclear Power Plant", 
            {radius:5, height:20}, 
            "#03fc1c", 
            b3p, 40);
        b3.buildMesh.visible = false;
        b3.info = "This is a sustainable energy source that works by using nuclear reactions to heat water and create steam, which in turn powers a turbine to generate electricity.";

        let b4p = new THREE.Vector3(-20, 10, -80);
        let b4 = new TestBuilding(
            this.scene, "Solar Panels", 
            {radius:5, height:20}, 
            "#ffee00", 
        b4p, 20);
        b4.buildMesh.visible = false;
        b4.info = "This is a sustainable energy source that works by capturing the energy from the sun using solar panels or solar cells, which convert the energy into electricity.";

        
        this.buildings.push(b1);
        this.buildings.push(b2);
        this.buildings.push(b3);
        this.buildings.push(b4);
    }



    checkBuildingProximity(playerPosition){
        for (let i = 0; i < this.buildings.length; i++){
            if (this.buildings[i].checkPosition(playerPosition)){
                console.log("PROXIMITY: ", this.buildings[i].buildingName);
                // setShowText(this.buildings[i].info);
                // setText(true);
                console.log("prox info:", this.buildings[i].info);
                return [true, this.buildings[i].info];
            }
        }
        // setText(false);
        return [false, ""];
    }
}