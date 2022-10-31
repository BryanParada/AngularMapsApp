import { Component, ElementRef,  ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

interface bookmarkColor {
  color: string,
  marker?: mapboxgl.Marker,
  center?: [number, number]
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

    this.readBookmarkLocalStorage()

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola';

    // new mapboxgl.Marker({
    //   //element: markerHtml // para personalizar icono
    // })
    //    .setLngLat(this.center)
    //    .addTo( this.map );
 
    

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

    this.saveBookmarksLocalStorage();

    //grabar posicion marcador al soltar marcador - Este marcador no se ejecuta inmediatamente puesto que es un listener
    newBookmark.on('dragend', () => {
      console.log('dragEnd BookMark saved from addBookmark()'); 
      this.saveBookmarksLocalStorage(); 
    })

    
  }

  goToBM( BM: mapboxgl.Marker){
 
    this.map.flyTo({
      //center: this.center
      center: BM.getLngLat()
    })
  }

  saveBookmarksLocalStorage(){
    
    const lngLatArr: bookmarkColor[] = [];

    this.bookmarks.forEach( m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        center: [lng, lat]
      }); 
    });

    localStorage.setItem('bookmarks', JSON.stringify(lngLatArr) )

  }

  readBookmarkLocalStorage(){
    if (!localStorage.getItem('bookmarks')) {
      return ;
    }

    const lngLatArr: bookmarkColor[] = JSON.parse(  localStorage.getItem('bookmarks')! ); //"!" siempre tendremos "bookmarks" ya que ya hicimos la validacion previa

    lngLatArr.forEach( m => {

        const newMarker = new mapboxgl.Marker({
          color: m.color,
          draggable: true
        })
        .setLngLat( m.center! ) //"!" siempre tendremos "m.center" en localstorage ya que ya hicimos la validacion previa
        .addTo( this.map)

        this.bookmarks.push({
          marker: newMarker,
          color: m.color
        })

        //grabar posicion marcador al soltar marcador
        newMarker.on('dragend', () => {
          console.log('dragEnd BookMark saved from readBookmarkLocalStorage()');
          
          this.saveBookmarksLocalStorage(); 
        })
    })
    
  }

  deleteBookmark(index: number){
    this.bookmarks[index].marker?.remove(); //Este .remove() es un método que trae el propio marker y se encarga de borrarlo del mapa. Pero ese .remove() en ningún momento elimina el marker de nuestro array.
    this.bookmarks.splice(index, 1); //se encarga de borrarlo de nuestro array ya que en el mapa ese market ya no existe.
    this.saveBookmarksLocalStorage();

    //Notas:
    // Con la línea this.markers[i].marker?.remove(); no, solo lo estamos eliminando del mapa, solo estamos interactuando con la propia librería.
    // Con la línea this.markers.splice(i, 1); sí lo estamos borrando de nuestro array de marcadores, pero no estamos notificándole al mapa que 
    // ese marker ya no existe y tiene que borrarlo.
    // En este caso la librería funciona así y no se actualiza automáticamente si desaparece del array (realmente el array de marcadores es
    //  para nosotros poder tener referencia a los mismos, trabajar con ellos, y poder guardarlos para persistencia, pero para el mapa no es necesario), 
    //  por lo que tenemos que manualmente realizar los dos pasos.
  }

 

}
