import { Component } from '@angular/core';

interface Property {
  title: string;
  description: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: [
  ]
})
export class PropertiesComponent  {
 
  properties: Property[] = [
    {
      title: 'Balcon del rio',
      description: 'Hotel de Campo y Cabañas, Argentina',
      lngLat: [ -65.01072474805378 , -31.731052833044327]
    },
    {
      title: 'Casa de playa, México',
      description: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [ -99.91287720907991, 16.828940930185748]
    },
    {
      title: 'Apartamento, Argentina',
      description: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [ -58.430166677283445, -34.57150108832866 ]
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },
    {
      title: 'Mona Vale Beach, Australia',
      description: 'Hermosa Playa de surf que corre hacia el sureste durante 1 km. Australia',
      lngLat: [ 151.31362720945043, -33.67953387171997 ]
    },
    {
      title: 'Harvard Museum, USA',
      description: 'Amplias colecciones de ciencias naturales, incluidos animales, minerales y flores de vidrio.',
      lngLat: [ -71.11556576063575 , 42.378627620390574 ]
    },
  ]


}
