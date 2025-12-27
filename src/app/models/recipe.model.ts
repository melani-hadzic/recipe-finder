export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;

  readyInMinutes?: number;
  servings?: number;
  summary?: string;

  extendedIngredients?: Array<{
    id: number;
    original: string;
  }>;

  instructions?: string;
}

