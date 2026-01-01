import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonSpinner
} from '@ionic/angular/standalone';

import { RecipeService } from '../../services/recipe';
import { RecipeDetails } from '../../models/recipe.model';
import { IonButton } from '@ionic/angular/standalone';
import { FavouritesService } from '../../services/favourites';
import { RecipeSummary } from '../../models/recipe.model';
import { SettingsService, Measurement } from '../../services/settings';



@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText,
    IonSpinner,
    IonButton
  ],
})

export class RecipeDetailsPage {
  recipe?: RecipeDetails;
  loading = true;
  errorMsg = '';
  isFav = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private favouritesService: FavouritesService,
    private settings: SettingsService
  ) { }


  units: Measurement = 'metric';

  private async loadUnits() {
    this.units = await this.settings.getMeasurement();
  }




  async ionViewWillEnter() {
    await this.loadUnits();


    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.errorMsg = 'Invalid recipe id.';
      this.loading = false;
      return;
    }

    this.recipeService.getRecipeDetails(id).subscribe({
      next: async (data) => {
        this.recipe = data;
        await this.favouritesService.load();
        this.isFav = this.favouritesService.isFavourite(this.recipe.id);
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load recipe details.';
        this.loading = false;
      },
    });
  }

  async toggleFavourite() {
    if (!this.recipe) return;

    const summary: RecipeSummary = {
      id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image
    };

    await this.favouritesService.toggle(summary);
    this.isFav = this.favouritesService.isFavourite(this.recipe.id);
  }

  formatIngredientMeasure(ing: any): string {
    const measure = ing?.measures?.[this.units];

    const amount = measure?.amount ?? ing?.amount;
    const unit = measure?.unitShort ?? ing?.unit ?? '';

    if (amount == null) return ing?.original || '';

    return `${this.formatAmount(amount)} ${unit}`.trim();
  }

  private formatAmount(n: number): string {
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }



}

