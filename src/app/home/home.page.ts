import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonSpinner,
  IonImg,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../services/recipe';
import { RecipeSummary } from '../models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonSpinner,
    IonImg,
    IonCard,
    IonCardContent,
    IonButtons,
    IonIcon
  ],
})

export class HomePage {
  query = '';
  recipes: RecipeSummary[] = []; 
  loading = false; 
  errorMsg = ''; 

  constructor(private recipeService: RecipeService) {}

  // Sends the query to the API and updates the UI with results
  onSearch(): void {
    const q = this.query.trim();

    // Validation to prevent empty searches
    if (!q) {
      this.recipes = [];
      this.errorMsg = 'Please enter at least one ingredient.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.recipeService.searchRecipes(q).subscribe({
      next: (results) => {
        this.recipes = results;
        this.loading = false;

        // Show message if search returns no recipes
        if (results.length === 0) {
          this.errorMsg = 'No recipes found. Try a different search.';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Something went wrong contacting the API.';
      },
    });
  }
}
