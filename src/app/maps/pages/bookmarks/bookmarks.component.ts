import { Component, ElementRef,  ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

interface bookmarkColor {
  color: string,
  marker: mapboxgl.Marker
}
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styles: [
    ` 
     .mapContainer{
      width: 100%;
      height: 100%; 
      }

      .list-group{
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li{
        cursor: pointer;
      }
    `
  ]
})
export class BookmarksComponent implements AfterViewInit {

  @ViewChild('mapBookmark') divMap!: ElementRef;
  map!: mapboxgl.Map;

  zoomLevel: number = 15;
  center: [number, number] = [ -70.583583,-33.568053]

  //Arreglo de marcadores
  bookmarks: bookmarkColor[] = [];
  
  constructor() { }
  ngAfterViewInit(): void {
   
    //inicializa mapa
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola';

    // new mapboxgl.Marker({
    //   //element: markerHtml // para personalizar icono
    // })
    //    .setLngLat(this.center)
    //    .addTo( this.map );

    this.map.on('moveend', (event) =>{
      const target = event.target;
       console.log(target);
      
       
     });
                      

  }
 
  addBookmark(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newBookmark = new mapboxgl.Marker({ 
                        draggable: true,
                        color})
                            .setLngLat( this.center )
                            .addTo( this.map );

    this.bookmarks.push(
      {
      color,
      marker: newBookmark
      }
    );
 
    //console.log(this.bookmarks);
    
  }

  goToBM( BM: mapboxgl.Marker){
 
    this.map.flyTo({
      //center: this.center
      center: BM.getLngLat()
    })
  }

}
