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
    IonSpinner
  ],
})
export class RecipeDetailsPage implements OnInit {
  recipe?: RecipeDetails;
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
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
      next: (data) => {
        this.recipe = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load recipe details.';
        this.loading = false;
      },
    });
  }
}

