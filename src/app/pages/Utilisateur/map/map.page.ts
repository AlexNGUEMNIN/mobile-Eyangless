import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  template: `
   
  `,
  styles: [`
    ion-content {
      --background: #e0e0e0;
    }
    #map-container {
      height: 100%;
      width: 100%;
    }
  `],
  standalone: true,
})
export class MapPage {
  constructor() {}
}
