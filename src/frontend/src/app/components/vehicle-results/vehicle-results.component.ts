import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleModel } from '../../models/vehicle.models';

@Component({
  selector: 'app-vehicle-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-results.component.html',
  styleUrl: './vehicle-results.component.scss'
})
export class VehicleResultsComponent {
  @Input() models: VehicleModel[] = [];
  @Input() hasSearched = false;
}