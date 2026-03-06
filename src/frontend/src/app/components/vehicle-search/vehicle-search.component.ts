import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { Make, VehicleType, VehicleModel } from '../../models/vehicle.models';

@Component({
  selector: 'app-vehicle-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-search.component.html',
  styleUrl: './vehicle-search.component.scss'
})
export class VehicleSearchComponent implements OnInit {
  @Output() modelsFound = new EventEmitter<VehicleModel[]>();

  makes: Make[] = [];
  vehicleTypes: VehicleType[] = [];

  selectedMakeId: number | null = null;
  selectedYear: number | null = null;

  isLoadingMakes = false;
  isLoadingTypes = false;
  isLoadingModels = false;

  readonly currentYear = new Date().getFullYear();
  readonly years = Array.from({ length: 30 }, (_, i) => this.currentYear - i);

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadMakes();
  }

  loadMakes(): void {
    this.isLoadingMakes = true;
    this.vehicleService.getAllMakes().subscribe({
      next: (data) => {
        this.makes = data;
        this.isLoadingMakes = false;
      },
      error: () => {
        this.isLoadingMakes = false;
      }
    });
  }

  onMakeChange(): void {
    this.vehicleTypes = [];

    if (this.selectedMakeId) {
      this.isLoadingTypes = true;
      this.vehicleService.getVehicleTypes(this.selectedMakeId).subscribe({
        next: (data) => {
          this.vehicleTypes = data;
          this.isLoadingTypes = false;
        },
        error: () => {
          this.isLoadingTypes = false;
        }
      });
    }
  }

  onSearch(): void {
    if (!this.selectedMakeId || !this.selectedYear) return;

    this.isLoadingModels = true;
    this.vehicleService.getVehicleModels(this.selectedMakeId, this.selectedYear).subscribe({
      next: (data) => {
        this.modelsFound.emit(data);
        this.isLoadingModels = false;
      },
      error: () => {
        this.isLoadingModels = false;
      }
    });
  }

  get canSearch(): boolean {
    return !!this.selectedMakeId && !!this.selectedYear;
  }
}