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
    id?: number;
    name: string;
    nameClean?: string;
    original?: string;
    amount?: number;
    unit?: string;
    measures?: {
      metric?: { amount: number; unitShort: string; unitLong: string };
      us?: { amount: number; unitShort: string; unitLong: string };
    };
  }>;

  instructions?: string;
}

