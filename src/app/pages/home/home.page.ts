import { Component, AfterViewInit, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonItem,
  IonList,
  IonSearchbar,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  menuOutline,
  closeOutline,
  searchOutline,
  personCircleOutline,
  homeOutline,
  mapOutline,
  bookmarkOutline,
  personOutline,
  starOutline,
  star,
  settingsOutline,
} from 'ionicons/icons';

interface City {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  rating: number;
  category?: string;
  progress?: number;
}

@Component({
  selector: 'app-home',
  template: `
  <ion-app>
  <!-- Menu latéral -->
  <ion-menu side="start" menuId="main-menu" contentId="main-content">
    <div class="menu-container">
      <div class="menu-header">
        <h2>Menu</h2>
        <ion-icon
          name="close-outline"
          class="close-icon"
          (click)="closeMenu()"
        ></ion-icon>
      </div>

      <div class="menu-content">
        <div class="menu-item active" (click)="navigateTo('/home')">
          <ion-icon name="home-outline"></ion-icon>
          <span>Accueil</span>
        </div>
        <div class="menu-item" (click)="navigateTo('/cities')">
          <ion-icon name="map-outline"></ion-icon>
          <span>Cités</span>
        </div>
        <div class="menu-item" (click)="navigateTo('/map')">
          <ion-icon name="map-outline"></ion-icon>
          <span>Carte</span>
        </div>
        <div class="menu-item" (click)="navigateTo('/reservations')">
          <ion-icon name="bookmark-outline"></ion-icon>
          <span>Mes réservations</span>
        </div>
        <div class="menu-item" (click)="navigateTo('/account')">
          <ion-icon name="person-outline"></ion-icon>
          <span>Mon compte</span>
        </div>
        <div class="menu-item" (click)="navigateTo('/settings')">
          <ion-icon name="settings-outline"></ion-icon>
          <span>Paramètres</span>
        </div>
      </div>

      <div class="menu-footer">
        <button class="disconnect-button" (click)="disconnect()">
          Déconnexion
        </button>
        <p class="version">EyangLess - version 0.1.1</p>
      </div>
    </div>
  </ion-menu>

  <!-- Contenu principal -->
  <div id="main-content" class="main-wrapper">
    <!-- Header -->
    <ion-header class="custom-header">
      <ion-toolbar class="main-toolbar">
        <div class="header-content">
          <div class="menu-icon" (click)="openMenu()">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1 class="brand-title">EyangLess</h1>
          <div class="header-actions">
            <ion-icon
              name="search-outline"
              class="action-icon"
              (click)="toggleSearch()"
            ></ion-icon>
            <div class="profile-icon" (click)="goToProfile()">
              <ion-icon name="person-circle-outline"></ion-icon>
            </div>
          </div>
        </div>

        <!-- Barre de recherche (masquée par défaut) -->
        <div class="search-container" [class.active]="showSearch">
          <ion-searchbar
            (ionInput)="onSearch($event)"
            placeholder="Rechercher une cité..."
            debounce="300"
            show-clear-button="focus"
          >
          </ion-searchbar>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="main-content" [scrollEvents]="true">
      <!-- Section Les cités les plus visitées -->
      <div class="section">
        <div class="section-header">
          <h2>Les cités les plus visitées</h2>
          <span class="voir-plus" (click)="viewMoreMostVisited()">Voir plus ></span>
        </div>

        <!-- Slider horizontal avec Swiper (comme votre ancien projet) -->
        <swiper-container
          [slidesPerView]="1.2"
          [spaceBetween]="16"
          [loop]="true"
          class="most-visited-swiper"
        >
          <swiper-slide *ngFor="let city of mostVisitedCities; trackBy: trackByCity">
            <div class="city-card large" (click)="selectCity(city)">
              <div
                class="city-image"
                [style.background-image]="'url(' + city.image + ')'"
              >
                <div class="city-badge" *ngIf="city.category">
                  {{ city.category }}
                </div>
                <div class="city-rating">
                  <ion-icon name="star"></ion-icon>
                  <span>{{ city.rating }}</span>
                </div>
              </div>
              <div class="city-info">
                <h3>{{ city.name }}</h3>
                <p>{{ city.subtitle }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>

      <!-- Section Les cités achevées -->
      <div class="section">
        <div class="section-header">
          <h2>Les cités achevées</h2>
          <span class="voir-plus" (click)="viewMoreCompleted()">Voir plus ></span>
        </div>

        <swiper-container
          [slidesPerView]="1.5"
          [spaceBetween]="12"
          [loop]="false"
          class="completed-swiper"
        >
          <swiper-slide *ngFor="let city of completedCities; trackBy: trackByCity">
            <div class="city-card" (click)="selectCity(city)">
              <div
                class="city-image"
                [style.background-image]="'url(' + city.image + ')'"
              >
                <div class="city-rating">
                  <ion-icon name="star"></ion-icon>
                  <span>{{ city.rating }}</span>
                </div>
              </div>
              <div class="city-info">
                <h3>{{ city.name }}</h3>
                <p>{{ city.subtitle }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>

      <!-- Section Les cités en cours de construction -->
      <div class="section">
        <div class="section-header">
          <h2>Les cités en cours de construction</h2>
          <span class="voir-plus" (click)="viewMoreConstruction()">Voir plus ></span>
        </div>

        <div class="construction-list">
          <div
            class="construction-item"
            *ngFor="let city of constructionCities; trackBy: trackByCity"
            (click)="selectCity(city)"
          >
            <div class="construction-info">
              <h3>{{ city.name }}</h3>
              <div class="progress-container">
                <span class="progress-text">{{ city.progress }}% terminée</span>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    [style.width.%]="city.progress"
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="construction-image"
              [style.background-image]="'url(' + city.image + ')'"
            ></div>
          </div>
        </div>

        <button class="see-all-button" (click)="viewAllCities()">
          Voir toutes les cités disponibles
        </button>
      </div>
    </ion-content>
  </div>
</ion-app>
  `,
  styles: [
    `
      /* Reset global et variables */
    /* Reset global et variables */
* {
  box-sizing: border-box;
}

:host {
  --primary-color: #1dd1a1;
  --secondary-color: #3b82f6;
  --text-primary: #374151;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --background: #ffffff;
  --border-color: #e5e7eb;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: block;
  height: 100%;
  width: 100%;
}

/* Reset Ionic */
ion-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--background) !important;
  color: var(--text-primary) !important;
}

/* Wrapper principal */
.main-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  background: var(--background);
  overflow: hidden;
}

/* Menu latéral */
ion-menu {
  --width: 300px;
  z-index: 9999;
}

.menu-container {
  height: 100%;
  background: var(--background);
  display: flex;
  flex-direction: column;
}

.menu-header {
  padding: 60px 20px 20px;
  background: var(--background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.menu-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
}

.close-icon {
  font-size: 24px;
  color: var(--primary-color);
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 1000;
}

.close-icon:hover {
  transform: scale(1.1);
}

.menu-content {
  flex: 1;
  padding: 20px 0;
}

.menu-item {
  padding: 16px 20px;
  font-size: 16px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 100;
}

.menu-item ion-icon {
  font-size: 20px;
}

.menu-item.active {
  background: var(--primary-color);
  color: var(--background);
  border-radius: 12px;
  margin: 0 20px;
  font-weight: 600;
}

.menu-item:hover:not(.active) {
  background: #f9f9f9;
  transform: translateX(5px);
}

.menu-footer {
  padding: 20px;
  border-top: 1px solid #f0f0f0;
}

.disconnect-button {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 2px solid #ef4444;
  border-radius: 8px;
  color: #ef4444;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 100;
}

.disconnect-button:hover {
  background: #ef4444;
  color: white;
}

.version {
  text-align: center;
  color: var(--text-muted);
  font-size: 12px;
  margin: 0;
}

/* Header */
.custom-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  --background: var(--background);
  background: var(--background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #f0f0f0;
}

.main-toolbar {
  --background: var(--background);
  --color: var(--text-primary);
  padding: 8px 0;
  --min-height: 60px;
  background: var(--background) !important;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  background: var(--background);
  position: relative;
  z-index: 100;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  width: 24px;
  height: 18px;
  justify-content: space-between;
  transition: transform 0.2s ease;
  position: relative;
  z-index: 101;
}

.menu-icon:hover {
  transform: scale(1.1);
}

.menu-icon span {
  width: 100%;
  height: 2px;
  background: var(--primary-color);
  border-radius: 1px;
  transition: all 0.3s ease;
}

.brand-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
  flex: 1;
  text-align: center;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  position: relative;
  z-index: 100;
}

.action-icon {
  font-size: 24px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 101;
}

.action-icon:hover {
  color: var(--primary-color);
  transform: scale(1.1);
}

.profile-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;
  z-index: 101;
}

.profile-icon:hover {
  transform: scale(1.1);
}

.profile-icon ion-icon {
  font-size: 28px;
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.profile-icon:hover ion-icon {
  color: var(--primary-color);
}

/* Barre de recherche */
.search-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: 0 16px;
  position: relative;
  z-index: 100;
}

.search-container.active {
  max-height: 80px;
  padding: 8px 16px;
}

.search-container ion-searchbar {
  --background: #f8f9fa;
  --border-radius: 12px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Contenu principal */
.main-content {
  --background: var(--background) !important;
  background: var(--background) !important;
  --padding-bottom: 90px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.section {
  padding: 20px 16px;
  background: var(--background);
  position: relative;
  z-index: 10;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
  z-index: 100;
}

.section-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.voir-plus {
  color: var(--secondary-color);
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s ease;
  position: relative;
  z-index: 101;
}

.voir-plus:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

/* Swiper Containers */
.most-visited-swiper,
.completed-swiper {
  width: 100%;
  padding: 10px 0 20px 0;
  position: relative;
  z-index: 10;
}

/* Swiper slides */
swiper-slide {
  height: auto;
  display: flex;
  align-items: stretch;
}

/* Cards des cités */
.city-card {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: var(--background);
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
}

.city-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.city-card.large {
  min-height: 280px;
}

.city-image {
  height: 140px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
}

.city-badge {
  background: #fcd34d;
  color: #92400e;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.city-rating {
  background: rgba(0, 0, 0, 0.6);
  color: var(--background);
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

.city-rating ion-icon {
  font-size: 12px;
  color: #fcd34d;
}

.city-info {
  padding: 12px;
  background: var(--background);
}

.city-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.city-info p {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0;
}

/* Section construction */
.construction-list {
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
}

.construction-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--background);
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
}

.construction-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.construction-info {
  flex: 1;
}

.construction-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.progress-text {
  font-size: 12px;
  color: var(--primary-color);
  font-weight: 600;
}

.progress-bar {
  width: 120px;
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #17b890);
  transition: width 0.3s ease;
  border-radius: 3px;
}

.construction-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.see-all-button {
  width: 100%;
  padding: 16px;
  background: var(--primary-color);
  border: none;
  border-radius: 12px;
  color: var(--background);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
}

.see-all-button:hover {
  background: #17b890;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(29, 209, 161, 0.3);
}

/* Animations et transitions */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section {
  animation: slideIn 0.5s ease-out;
}

/* Media queries */
@media (max-width: 375px) {
  .header-content {
    padding: 0 12px;
  }

  .section {
    padding: 16px 12px;
  }

  .city-card {
    min-width: 180px;
  }

  .city-card.large {
    min-width: 220px;
  }
}

/* Corrections supplémentaires pour l'interactivité */
.scroll-content,
.inner-scroll,
ion-content,
.content-area {
  background: var(--background) !important;
  background-color: var(--background) !important;
}

/* Fixes pour les z-index et pointer-events */
ion-app * {
  pointer-events: auto;
}

/* Loading states */
.loading {
  opacity: 0.7;
  pointer-events: none;
}
    `,
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonMenu,
    IonMenuButton,
    IonApp,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonItem,
    IonList,
    IonSearchbar,
    IonCard,
    IonCardContent,
  ],
})
export class HomePage implements AfterViewInit, OnInit {
  activeTab = 'home';
  showSearch = false;
  searchTerm = '';

  mostVisitedCities: City[] = [
    {
      id: 1,
      name: 'Cité Bévina',
      subtitle: 'Une cité rouge et grise',
      image:
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400',
      rating: 4.1,
      category: '03 Chambres libres',
    },
    {
      id: 2,
      name: 'Mini cité la Grâce',
      subtitle: 'Une cité verte et blanche',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      rating: 4.5,
      category: '02 Chambres libres',
    },
    {
      id: 7,
      name: 'Cité Moderne',
      subtitle: 'Architecture contemporaine',
      image:
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
      rating: 4.3,
      category: '01 Chambre libre',
    },
  ];

  completedCities: City[] = [
    {
      id: 3,
      name: 'Cité RPN 2',
      subtitle: 'Blanche et grise avec un peu de jaune',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      rating: 4.2,
    },
    {
      id: 4,
      name: 'Mini cité la Grâce',
      subtitle: 'Une cité verte et blanche',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      rating: 4.3,
    },
  ];

  constructionCities: City[] = [
    {
      id: 5,
      name: 'Cité GOLDEN BOY',
      subtitle: '',
      image:
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400',
      rating: 0,
      progress: 70,
    },
    {
      id: 6,
      name: 'Cité GOLDEN BOY',
      subtitle: '',
      image:
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400',
      rating: 0,
      progress: 70,
    },
  ];

  // Ajout des tableaux filtrés pour la recherche
  filteredMostVisitedCities: City[] = [];
  filteredCompletedCities: City[] = [];
  filteredConstructionCities: City[] = [];

  constructor(private router: Router, private menuController: MenuController) {
    addIcons({
      menuOutline,
      closeOutline,
      searchOutline,
      personCircleOutline,
      homeOutline,
      mapOutline,
      bookmarkOutline,
      personOutline,
      starOutline,
      star,
      settingsOutline, // Ajout de l'icône
    });
    register(); // Enregistrement du composant Swiper web
  }

  ngOnInit() {
    // Initialiser les tableaux filtrés
    this.filteredMostVisitedCities = this.mostVisitedCities;
    this.filteredCompletedCities = this.completedCities;
    this.filteredConstructionCities = this.constructionCities;
  }

  ngAfterViewInit() {
    // Rien à faire ici pour Swiper web
  }

  async openMenu() {
    await this.menuController.open('main-menu');
  }

  async closeMenu() {
    await this.menuController.close('main-menu');
  }

  async navigateTo(route: string) {
    await this.closeMenu();
    this.router.navigate([route]);
  }

  async disconnect() {
    await this.closeMenu();
    // Logique de déconnexion
    this.router.navigate(['/login']);
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => {
        const searchBar = document.querySelector('ion-searchbar') as any;
        if (searchBar && searchBar.setFocus) {
          searchBar.setFocus();
        }
      }, 100);
    }
  }

  onSearch(event: any) {
    const term = event.target.value?.toLowerCase() || '';
    this.searchTerm = term;
    // Filtrage simple sur le nom de la cité
    this.filteredMostVisitedCities = this.mostVisitedCities.filter(city =>
      city.name.toLowerCase().includes(term)
    );
    this.filteredCompletedCities = this.completedCities.filter(city =>
      city.name.toLowerCase().includes(term)
    );
    this.filteredConstructionCities = this.constructionCities.filter(city =>
      city.name.toLowerCase().includes(term)
    );
  }

  goToProfile() {
    this.router.navigate(['/account']);
  }

  selectCity(city: City) {
    this.router.navigate(['/city-detail', city.id]);
  }

  viewMoreMostVisited() {
    this.router.navigate(['/cities'], {
      queryParams: { filter: 'most-visited' },
    });
  }

  viewMoreCompleted() {
    this.router.navigate(['/cities'], {
      queryParams: { filter: 'completed' },
    });
  }

  viewMoreConstruction() {
    this.router.navigate(['/cities'], {
      queryParams: { filter: 'construction' },
    });
  }

  viewAllCities() {
    this.router.navigate(['/cities']);
  }

  trackByCity(index: number, city: City): number {
    return city.id;
  }
}
