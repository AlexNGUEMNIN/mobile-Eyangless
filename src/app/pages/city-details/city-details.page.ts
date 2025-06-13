import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonButton,
  IonBadge,
  IonList,
  IonItem,
  IonImg,
  IonChip,
  IonCard,
  IonCardContent,
  IonNote,
  IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  starOutline,
  star,
  locationOutline,
  callOutline,
  mailOutline,
  chatbubbleOutline,
  bedOutline,
  tvOutline,
  wifiOutline,
  restaurantOutline,
  gameControllerOutline,
  businessOutline,
  chevronDownOutline,
  chevronUpOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

interface CityDetail {
  id: number;
  name: string;
  image: string;
  rating: number;
  verified: boolean;
  description: string;
  availableRooms: number;
  price: {
    amount: number;
    period: string;
    yearlyAmount: number;
  };
  caution: number;
  bankDetails: {
    accountNumber: string;
    bank: string;
  };
  characteristics: {
    rooms: number;
    roomSize: string;
    furnished: boolean;
    floors: number;
    water: string;
    electricity: string;
    group: boolean;
    parking: boolean;
    security: boolean;
    guardian: boolean;
  };
  amenities: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  comments: Array<{
    author: string;
    text: string;
    anonymous?: boolean;
  }>;
  roomDetails: {
    rooms: number;
    size: string;
    furnished: boolean;
    bathroom: string;
    furniture: string[];
  };
}

@Component({
  selector: 'app-city-details',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ city?.name }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" name="star-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Image principale -->
      <div class="main-image">
        <ion-img [src]="city?.image" alt="City view"></ion-img>
      </div>

      <!-- Segments de navigation -->
      <ion-segment [(ngModel)]="selectedSegment" class="custom-segment">
        <ion-segment-button value="description">
          <ion-label>Description</ion-label>
        </ion-segment-button>
        <ion-segment-button value="rooms">
          <ion-label>Chambres</ion-label>
        </ion-segment-button>
        <ion-segment-button value="gallery">
          <ion-label>Galerie</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- Contenu Description -->
      <div *ngIf="selectedSegment === 'description'" class="segment-content">
        <div class="city-header">
          <h1>{{ city?.name }}</h1>
          <div class="rating">
            <ion-icon
              *ngFor="let i of [1, 2, 3, 4, 5]"
              [name]="getStarIcon(i)"
            ></ion-icon>
            <span>{{ city?.rating }}</span>
            <ion-badge *ngIf="city?.verified" color="success"
              >Vérifié</ion-badge
            >
          </div>
        </div>

        <div class="availability-card">
          <h3>{{ city?.availableRooms }} chambres disponibles</h3>
          <ion-button expand="block" (click)="reserve()">Réserver</ion-button>
        </div>

        <div class="section">
          <h3>Caractéristiques</h3>
          <ion-list lines="none">
            <ion-item>
              <ion-label>Prix de la chambre</ion-label>
              <ion-note slot="end"
                >{{ city?.price?.amount }} FCFA/{{
                  city?.price?.period
                }}</ion-note
              >
            </ion-item>
            <ion-item>
              <ion-label>Caution</ion-label>
              <ion-note slot="end">{{ city?.caution }} FCFA</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Numéro de compte</ion-label>
              <ion-note slot="end">{{
                city?.bankDetails?.accountNumber
              }}</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Banque</ion-label>
              <ion-note slot="end">{{ city?.bankDetails?.bank }}</ion-note>
            </ion-item>
          </ion-list>
        </div>

        <div class="section">
          <h3>Autres Caractéristiques</h3>
          <ion-list lines="none">
            <ion-item *ngFor="let item of characteristicsList">
              <ion-label>{{ item.label }}</ion-label>
              <ion-note slot="end">{{ item.value }}</ion-note>
            </ion-item>
          </ion-list>
        </div>

        <div class="section">
          <h3>Suppléments</h3>
          <div class="amenities">
            <ion-chip *ngFor="let amenity of city?.amenities">
              {{ amenity }}
            </ion-chip>
          </div>
        </div>

        <div class="section">
          <h3>Contacts</h3>
          <ion-list lines="none">
            <ion-item>
              <ion-icon name="person-outline" slot="start"></ion-icon>
              <ion-label>{{ city?.contact?.name }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon name="mail-outline" slot="start"></ion-icon>
              <ion-label>{{ city?.contact?.email }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon name="call-outline" slot="start"></ion-icon>
              <ion-label>{{ city?.contact?.phone }}</ion-label>
            </ion-item>
          </ion-list>
        </div>

        <div class="section">
          <h3>Carte</h3>
          <div class="map-container">
            <!-- Intégration de la carte ici -->
          </div>
        </div>

        <div class="section">
          <h3>Commentaires ({{ city?.comments?.length }})</h3>
          <ion-list lines="none">
            <ion-item *ngFor="let comment of city?.comments">
              <ion-label>
                <h3>{{ comment.anonymous ? 'Anonyme' : comment.author }}</h3>
                <p>{{ comment.text }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-button expand="block" fill="clear">
            Laisser un commentaire
          </ion-button>
        </div>
      </div>

      <!-- Contenu Chambres -->
      <div *ngIf="selectedSegment === 'rooms'" class="segment-content">
        <div class="room-details">
          <h3>Détails de la chambre</h3>
          <ion-list lines="none">
            <ion-item>
              <ion-label>Pièces</ion-label>
              <ion-note slot="end">{{ city?.roomDetails?.rooms }}</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Dimension</ion-label>
              <ion-note slot="end">{{ city?.roomDetails?.size }}</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Meublée</ion-label>
              <ion-note slot="end">{{
                city?.roomDetails?.furnished ? 'Oui' : 'Non'
              }}</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Toilettes</ion-label>
              <ion-note slot="end">{{ city?.roomDetails?.bathroom }}</ion-note>
            </ion-item>
          </ion-list>

          <div class="furniture-section">
            <h3>Meubles</h3>
            <div class="furniture-chips">
              <ion-chip *ngFor="let item of city?.roomDetails?.furniture">
                {{ item }}
              </ion-chip>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu Galerie -->
      <div *ngIf="selectedSegment === 'gallery'" class="segment-content">
        <div class="gallery-grid">
          <!-- Galerie d'images ici -->
        </div>
      </div>

      <!-- Bouton de réservation fixe en bas -->
      <ion-footer class="ion-no-border">
        <ion-toolbar>
          <div class="footer-content">
            <div class="price-info">
              <span class="price">{{ city?.price?.amount }} FCFA</span>
              <span class="period">/{{ city?.price?.period }}</span>
            </div>
            <ion-button expand="block" (click)="reserve()">
              Réserver
            </ion-button>
          </div>
        </ion-toolbar>
      </ion-footer>
    </ion-content>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      ion-header ion-toolbar {
        --background: transparent;
        --border-width: 0;
      }

      .main-image {
        width: 100%;
        height: 250px;
        overflow: hidden;

        ion-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .custom-segment {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: white;
        --background: white;
        padding: 8px 0;
        border-bottom: 1px solid #eee;

        ion-segment-button {
          --color: #666;
          --color-checked: #10b981;
          --indicator-color: #10b981;
          text-transform: none;
          font-size: 14px;
          min-height: 40px;
        }
      }

      .segment-content {
        padding: 16px;
      }

      .city-header {
        margin-bottom: 20px;

        h1 {
          margin: 0 0 8px;
          font-size: 24px;
          font-weight: 600;
          color: #333;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;

          ion-icon {
            color: #ffd700;
            font-size: 18px;
          }

          span {
            margin-left: 4px;
            color: #666;
          }

          ion-badge {
            margin-left: 8px;
            --padding-start: 8px;
            --padding-end: 8px;
            --padding-top: 4px;
            --padding-bottom: 4px;
          }
        }
      }

      .availability-card {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 24px;

        h3 {
          margin: 0 0 16px;
          color: #10b981;
          font-weight: 600;
        }

        ion-button {
          --background: #10b981;
          margin: 0;
        }
      }

      .section {
        margin-bottom: 24px;

        h3 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 16px;
        }
      }

      ion-list {
        background: transparent;
        padding: 0;

        ion-item {
          --padding-start: 0;
          --inner-padding-end: 0;
          --background: transparent;

          ion-label {
            color: #666;
          }

          ion-note {
            color: #333;
            font-weight: 500;
          }
        }
      }

      .amenities {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        ion-chip {
          --background: #f0f9f6;
          --color: #10b981;
          font-size: 12px;
        }
      }

      .map-container {
        height: 200px;
        background: #f8f9fa;
        border-radius: 12px;
        overflow: hidden;
      }

      .room-details {
        .furniture-section {
          margin-top: 24px;
        }

        .furniture-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
      }

      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        padding: 16px;
      }

      ion-footer {
        background: white;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);

        .footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;

          .price-info {
            .price {
              font-size: 20px;
              font-weight: 600;
              color: #10b981;
            }

            .period {
              color: #666;
              font-size: 14px;
            }
          }

          ion-button {
            --background: #10b981;
            margin: 0;
            width: 140px;
          }
        }
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Ajouté pour ngModel
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonIcon,
    IonButton,
    IonBadge,
    IonList,
    IonItem,
    IonImg,
    IonChip,
    IonCard,
    IonCardContent,
    IonNote, // Ajouté pour <ion-note>
    IonFooter, // Ajouté pour <ion-footer>
  ],
})
export class CityDetailsPage implements OnInit {
  city?: CityDetail;
  selectedSegment = 'description';

  constructor(private route: ActivatedRoute) {
    addIcons({
      starOutline,
      star,
      locationOutline,
      callOutline,
      mailOutline,
      chatbubbleOutline,
      bedOutline,
      tvOutline,
      wifiOutline,
      restaurantOutline,
      gameControllerOutline,
      businessOutline,
      chevronDownOutline,
      chevronUpOutline,
    });
  }

  ngOnInit() {
    // Simuler les données de la cité
    this.city = {
      id: 1,
      name: 'Cité Bévina',
      image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
      rating: 4.5,
      verified: true,
      description: 'Une cité moderne avec portail',
      availableRooms: 4,
      price: {
        amount: 55000,
        period: 'mois',
        yearlyAmount: 660000,
      },
      caution: 110000,
      bankDetails: {
        accountNumber: '00 35 25 17 27 26 02 929',
        bank: 'UBA',
      },
      characteristics: {
        rooms: 28,
        roomSize: '5m²',
        furnished: true,
        floors: 2,
        water: 'Gratuite',
        electricity: 'Compteur pré-payé',
        group: true,
        parking: true,
        security: true,
        guardian: true,
      },
      amenities: ['Salle de jeux', 'Restaurant', 'Salle des fêtes', 'Boutique'],
      contact: {
        name: 'M. Anatole Guérin',
        email: 'anatole@gmail.com',
        phone: '+237 673 58 96 00',
      },
      location: {
        address: 'Yaoundé, Cameroun',
        coordinates: {
          lat: 3.8667,
          lng: 11.5167,
        },
      },
      comments: [
        {
          author: 'Roy',
          text: 'Je ne sais même pas ce que je peux dire sur cette cité pour que je ne tombe pas vraiment',
        },
        {
          author: 'Anonyme',
          text: 'Anonymement, je laisse une bonne note à cette cité pour son libertinage olalal.',
          anonymous: true,
        },
      ],
      roomDetails: {
        rooms: 2,
        size: '5m²',
        furnished: true,
        bathroom: 'Interne',
        furniture: ['Lit', 'Table de travail', 'Chaise', 'Frigo', 'Télévision'],
      },
    };
  }

  get characteristicsList() {
    return [
      { label: 'Chambres', value: this.city?.characteristics.rooms },
      {
        label: 'Taille par chambre',
        value: this.city?.characteristics.roomSize,
      },
      {
        label: 'Meublée',
        value: this.city?.characteristics.furnished ? 'Oui' : 'Non',
      },
      { label: 'Étages', value: this.city?.characteristics.floors },
      { label: 'Eau', value: this.city?.characteristics.water },
      { label: 'Électricité', value: this.city?.characteristics.electricity },
      {
        label: 'Groupe',
        value: this.city?.characteristics.group ? 'Oui' : 'Non',
      },
      {
        label: 'Forage',
        value: this.city?.characteristics.parking ? 'Oui' : 'Non',
      },
      {
        label: 'Sécurité',
        value: this.city?.characteristics.security ? 'Oui' : 'Non',
      },
      {
        label: 'Gardien',
        value: this.city?.characteristics.guardian ? 'Oui' : 'Non',
      },
    ];
  }

  getStarIcon(i: number): string {
    if (!this.city) return 'star-outline';
    return this.city.rating >= i ? 'star' : 'star-outline';
  }

  reserve() {
    console.log('Réservation en cours...');
  }
}
