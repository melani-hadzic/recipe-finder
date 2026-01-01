import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export type Measurement = 'metric' | 'us';

const KEY_MEASUREMENT = 'measurement';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  async getMeasurement(): Promise<Measurement> {
    const { value } = await Preferences.get({ key: KEY_MEASUREMENT });

    if (value === 'us' || value === 'metric') return value;
    return 'metric';
  }

  async setMeasurement(measurement: Measurement): Promise<void> {
    await Preferences.set({ key: KEY_MEASUREMENT, value: measurement });
  }
}
