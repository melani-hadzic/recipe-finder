import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { RecipeSummary } from '../models/recipe.model';

const KEY = 'favourites';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private favouritesSubject = new BehaviorSubject<RecipeSummary[]>([]);
  favourites$ = this.favouritesSubject.asObservable();

  async load(): Promise<void> {
    const { value } = await Preferences.get({ key: KEY });
    const favs: RecipeSummary[] = value ? JSON.parse(value) : [];
    this.favouritesSubject.next(favs);
  }

  getSnapshot(): RecipeSummary[] {
    return this.favouritesSubject.value;
  }

  isFavourite(id: number): boolean {
    return this.getSnapshot().some(r => r.id === id);
  }

  private async save(list: RecipeSummary[]): Promise<void> {
    await Preferences.set({ key: KEY, value: JSON.stringify(list) });
    this.favouritesSubject.next(list);
  }

  async add(recipe: RecipeSummary): Promise<void> {
    const current = this.getSnapshot();
    if (current.some(r => r.id === recipe.id)) return;
    await this.save([recipe, ...current]);
  }

  async remove(id: number): Promise<void> {
    const updated = this.getSnapshot().filter(r => r.id !== id);
    await this.save(updated);
  }

  async toggle(recipe: RecipeSummary): Promise<void> {
    if (this.isFavourite(recipe.id)) {
      await this.remove(recipe.id);
    } else {
      await this.add(recipe);
    }
  }

  async clear(): Promise<void> {
    await Preferences.remove({ key: KEY });
    this.favouritesSubject.next([]);
  }
}

