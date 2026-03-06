import { Component } from '@angular/core';
import { VehicleSearchComponent } from './components/vehicle-search/vehicle-search.component';
import { VehicleResultsComponent } from './components/vehicle-results/vehicle-results.component';
import { VehicleModel } from './models/vehicle.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VehicleSearchComponent, VehicleResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  models: VehicleModel[] = [];
  hasSearched = false;

  onModelsFound(models: VehicleModel[]): void {
    this.models = models;
    this.hasSearched = true;
  }
}