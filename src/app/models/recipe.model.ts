export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
}


// Represents one recipe; contains only fields that we need
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

