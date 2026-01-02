import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio
} from '@ionic/angular/standalone';
import { SettingsService, Measurement } from '../../services/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonRadioGroup,
    IonRadio,
    CommonModule,
    FormsModule,
  ]
})

export class SettingsPage implements OnInit {

  // Default to metric 
  measurement: Measurement = 'metric';

  constructor(private settings: SettingsService) { }

  async ngOnInit(): Promise<void> {
    // Load saved measurement choice from storage
    this.measurement = await this.settings.getMeasurement();
  }

  async onMeasurementChange(value: Measurement): Promise<void> {
    // Update UI + save new preference
    this.measurement = value;
    await this.settings.setMeasurement(value);
  }
}
