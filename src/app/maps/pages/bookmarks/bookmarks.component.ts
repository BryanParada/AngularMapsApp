import { Component, ElementRef,  ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styles: [
    `
     .mapContainer{
      width: 100%;
      height: 100%;
    }
    `
  ]
})
export class BookmarksComponent implements AfterViewInit {

  @ViewChild('mapBookmark') divMap!: ElementRef;
  map!: mapboxgl.Map;

  zoomLevel: number = 15;
  center: [number, number] = [ -70.583583,-33.568053]
  
  constructor() { }
  ngAfterViewInit(): void {
   
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Hola';

    new mapboxgl.Marker({
      //element: markerHtml // para personalizar icono
    })
       .setLngLat(this.center)
       .addTo( this.map );
                      

  }

  ngOnInit(): void {
  }

}
