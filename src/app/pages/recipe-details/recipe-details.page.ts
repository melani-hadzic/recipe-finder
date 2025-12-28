import { Component, OnInit } from '@angular/core';
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

export class RecipeDetailsPage implements OnInit {
  recipe?: RecipeDetails;
  loading = true;
  errorMsg = '';
  isFav = false;

  constructor(
  private route: ActivatedRoute,
  private recipeService: RecipeService,
  private favouritesService: FavouritesService
) {}


  ngOnInit() {
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
  
}

