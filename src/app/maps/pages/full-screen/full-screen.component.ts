import { Component, OnInit } from '@angular/core';
// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js'); <--importacion require de Mapbox
// se debe instalar "npm i --save-dev @types/mapbox-gl" y dejar como abajo:
import * as mapboxgl from "mapbox-gl";


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapContainer{
      width: 100%;
      height: 100%;
    }
  `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
 
  var map = new mapboxgl.Map({
    container: 'mapContainer',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ -70.583583,-33.568053],
    zoom: 15
  });

  }



}
