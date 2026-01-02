import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
  IonText
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FavouritesService } from '../../services/favourites';
import { RecipeSummary } from '../../models/recipe.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonButton,
    IonText,
    CommonModule,
    RouterModule
  ]
})

export class FavouritesPage implements OnInit {

  favourites$: Observable<RecipeSummary[]> = this.favouritesService.favourites$;

  constructor(private favouritesService: FavouritesService) {}

  ngOnInit(): void {
    // Keep empty - favourites are reloaded when the page becomes active
  }

  // Runs every time the user opens this page
  async ionViewWillEnter(): Promise<void> {
    await this.favouritesService.load();
  }

  // Remove a recipe from favourites
  async remove(id: number): Promise<void> {
    await this.favouritesService.remove(id);
  }
}
