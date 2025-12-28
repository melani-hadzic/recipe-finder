import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonText } from '@ionic/angular/standalone';

import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

import { FavouritesService } from '../../services/favourites';
import { RecipeSummary } from '../../models/recipe.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonText,
    CommonModule, RouterModule
  ]
})
export class FavouritesPage implements OnInit {

  favourites$: Observable<RecipeSummary[]> = this.favouritesService.favourites$;

  constructor(private favouritesService: FavouritesService) {}

  async ngOnInit() {
    await this.favouritesService.load();
  }

  async ionViewWillEnter() {
    await this.favouritesService.load();
  }

  async remove(id: number) {
    await this.favouritesService.remove(id);
  }
}
