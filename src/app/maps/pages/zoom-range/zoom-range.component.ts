import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
      width: 400px;
    } 
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapRange') divMap!: ElementRef;
  map!: mapboxgl.Map;

  zoomLevel: number = 10;
  center: [number, number] = [ -70.583583,-33.568053]

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  ngAfterViewInit(): void {

    //console.log(this.divMap);
      this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //listener
    this.map.on('zoom', (ev) => {
      const actualZoom = this.map.getZoom();
      this.zoomLevel = actualZoom;
      
    });

    this.map.on('zoomend', (ev) => {
     if (this.map.getZoom() > 18 ){
      this.map.zoomTo( 18 );
     }
      
    });

    this.map.on('move', (event) =>{
     const target = event.target;
     const {lng, lat} = target.getCenter();
     this.center = [lng, lat]
      
    });




  }

  zoomOut(){
    this.map.zoomOut(); 
    
  }

  zoomIn(){
    this.map.zoomIn(); 
  }

  zoomChanges(value: string){
    this.map.zoomTo( Number(value) );
    
  }

}
