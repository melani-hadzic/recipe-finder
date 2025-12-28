import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FavouritesService } from './services/favourites';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private favouritesService: FavouritesService) {}

  async ionViewDidEnter() {
    await this.favouritesService.load();
  }
}
