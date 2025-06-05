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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  timeOutline,
  bedOutline,
  wifiOutline,
  tvOutline,
  carOutline
} from 'ionicons/icons';

interface CityDetail {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
  rating: number;
  location: string;
  amenities: string[];
  host: {
    name: string;
    image: string;
    rating: number;
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
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="city-image">
        <ion-img [src]="city?.image"></ion-img>
        <div class="price-tag">{{ city?.price }}</div>
      </div>

      <div class="content-container">
        <h1>{{ city?.name }}</h1>

        <div class="rating">
  <span *ngFor="let star of [1,2,3,4,5]"
        [class.filled]="star <= (city?.rating ?? 0)">★</span>
  <span class="reviews">(127 avis)</span>
</div>

        <div class="location">
          <ion-icon name="location-outline"></ion-icon>
          <span>{{ city?.location }}</span>
        </div>

        <div class="section">
          <h2>Description</h2>
          <p>{{ city?.description }}</p>
        </div>

        <div class="section">
          <h2>Équipements</h2>
          <div class="amenities-grid">
            <div class="amenity" *ngFor="let amenity of city?.amenities">
              <ion-icon [name]="getAmenityIcon(amenity)"></ion-icon>
              <span>{{ amenity }}</span>
            </div>
          </div>
        </div>

        <div class="section host-section">
  <h2>Votre hôte</h2>
  <div class="host-info">
    <img [src]="city?.host?.image" alt="Host">
    <div class="host-details">
      <h3>{{ city?.host?.name }}</h3>
      <div class="rating">
  <span *ngFor="let star of [1,2,3,4,5]"
        [class.filled]="star <= (city?.rating ?? 0)">★</span>
  <span class="reviews">(127 avis)</span>
</div>
    </div>
  </div>
</div>

        <ion-button expand="block" class="book-button">
          Réserver maintenant
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-header {
      ion-toolbar {
        --background: #ffffff;
      }
    }

    .city-image {
      position: relative;

      ion-img {
        height: 250px;
        object-fit: cover;
      }

      .price-tag {
        position: absolute;
        bottom: 16px;
        right: 16px;
        background: #10B981;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
      }
    }

    .content-container {
      padding: 20px;

      h1 {
        font-size: 24px;
        margin: 0 0 8px;
        color: #333;
      }

      .rating {
        font-size: 18px;
        color: #ffd700;
        margin-bottom: 12px;

        .filled {
          color: #ffd700;
        }

        .reviews {
          color: #666;
          font-size: 14px;
          margin-left: 8px;
        }
      }

      .location {
        display: flex;
        align-items: center;
        color: #666;
        margin-bottom: 20px;

        ion-icon {
          margin-right: 8px;
          color: #10B981;
        }
      }

      .section {
        margin-bottom: 24px;

        h2 {
          font-size: 18px;
          color: #333;
          margin-bottom: 12px;
        }

        p {
          color: #666;
          line-height: 1.6;
          margin: 0;
        }
      }

      .amenities-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;

        .amenity {
          display: flex;
          align-items: center;
          color: #666;

          ion-icon {
            color: #10B981;
            margin-right: 8px;
            font-size: 20px;
          }
        }
      }

      .host-section {
        .host-info {
          display: flex;
          align-items: center;

          img {
            width: 60px;
            height: 60px;
            border-radius: 30px;
            margin-right: 16px;
          }

          .host-details {
            h3 {
              margin: 0 0 4px;
              font-size: 16px;
              color: #333;
            }

            .host-rating {
              color: #ffd700;
              font-size: 14px;

              .filled {
                color: #ffd700;
              }

              .reviews {
                color: #666;
                margin-left: 4px;
              }
            }
          }
        }
      }

      .book-button {
        --background: #10B981;
        --border-radius: 8px;
        --padding-top: 20px;
        --padding-bottom: 20px;
        margin-top: 24px;
        text-transform: none;
        font-weight: 500;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton
  ]
})
export class CityDetailsPage implements OnInit {
  city?: CityDetail;

  constructor(private route: ActivatedRoute) {
    addIcons({
      locationOutline,
      timeOutline,
      bedOutline,
      wifiOutline,
      tvOutline,
      carOutline
    });
  }

  ngOnInit() {
    const cityId = this.route.snapshot.paramMap.get('id');
    // Simulated city data
    this.city = {
      id: 1,
      name: 'Appartement au cœur de Paris',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      description: 'Magnifique appartement situé en plein cœur de Paris, à deux pas des Champs-Élysées. Vue imprenable sur la Tour Eiffel, intérieur moderne et chaleureux.',
      price: '180€/nuit',
      rating: 4,
      location: 'Paris, France',
      amenities: ['Wifi', 'TV', 'Parking', 'Climatisation', 'Cuisine', 'Balcon'],
      host: {
        name: 'Marie Dubois',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        rating: 5
      }
    };
  }

  getAmenityIcon(amenity: string): string {
    const icons: { [key: string]: string } = {
      'Wifi': 'wifi-outline',
      'TV': 'tv-outline',
      'Parking': 'car-outline',
      'Climatisation': 'thermometer-outline',
      'Cuisine': 'restaurant-outline',
      'Balcon': 'home-outline'
    };
    return icons[amenity] || 'checkmark-outline';
  }
}
