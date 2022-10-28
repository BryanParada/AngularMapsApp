import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapContainer{
      width: 100%;
      height: 100%;
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position:fixed;
      z-index: 999;
    }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapRange') divMap!: ElementRef;
  map!: mapboxgl.Map;

  zoomLevel: number = 10;

  constructor() { }

  ngAfterViewInit(): void {

    //console.log(this.divMap);
      this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -70.583583,-33.568053],
      zoom: this.zoomLevel
    });


  }

  zoomOut(){
    this.map.zoomOut();
    this.zoomLevel = this.map.getZoom();
    console.log(this.zoomLevel);
    
  }

  zoomIn(){
    this.map.zoomIn();

    this.zoomLevel = this.map.getZoom();
    console.log(this.zoomLevel);
  }

}
