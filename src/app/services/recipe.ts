import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecipeSummary, RecipeDetails } from '../models/recipe.model';
import { SettingsService } from './settings';


type ComplexSearchResponse = {
  results: RecipeSummary[];
  offset: number;
  number: number;
  totalResults: number;
};

@Injectable({
  providedIn: 'root',
})

export class RecipeService {
  private readonly baseUrl = environment.spoonacular.baseUrl;
  private readonly apiKey = environment.spoonacular.apiKey;

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }


  // Search recipes using Spoonacular
  searchRecipes(query: string): Observable<RecipeSummary[]> {
    const url = `${this.baseUrl}/recipes/complexSearch`;

    const params = new HttpParams()
      .set('query', query.trim())
      .set('apiKey', this.apiKey);

    return this.http.get<ComplexSearchResponse>(url, { params }).pipe(
      map((res) => res.results ?? [])
    );
  }

  // Get full recipe details for the details page
  getRecipeDetails(id: number): Observable<RecipeDetails> {
    return new Observable<RecipeDetails>((observer) => {
      this.settings.getMeasurement().then((measurement) => {
        const url = `${this.baseUrl}/recipes/${id}/information`;

        const params = new HttpParams()
          .set('apiKey', this.apiKey)
          .set('includeNutrition', 'false')
          .set('units', measurement);

        this.http.get<RecipeDetails>(url, { params }).subscribe({
          next: (data) => observer.next(data),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      });
    });
  }
}
