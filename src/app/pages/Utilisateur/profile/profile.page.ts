import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
  
  `,
  styles: [`
    ion-content {
      --background: #ffffff;
    }
    .profile-picture {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin: 20px auto;
    }
  `],
  standalone: true,
})
export class ProfilePage {
  constructor() {}
}
