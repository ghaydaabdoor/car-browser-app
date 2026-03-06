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
  @Output() makeChanged = new EventEmitter<void>();

  makes: Make[] = [];
  filteredMakes: Make[] = [];
  vehicleTypes: VehicleType[] = [];

  searchText = '';
  selectedMake: Make | null = null;
  selectedYear: number | null = null;
  showDropdown = false;

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
        this.filteredMakes = [];
        this.isLoadingMakes = false;
      },
      error: () => {
        this.isLoadingMakes = false;
      }
    });
  }

  onSearchInput(): void {
    const query = this.searchText.trim().toLowerCase();
    if (query.length < 2) {
      this.filteredMakes = [];
      this.showDropdown = false;
      return;
    }
    this.filteredMakes = this.makes.filter(m =>
      m.make_Name.toLowerCase().includes(query)
    ).slice(0, 50);
    this.showDropdown = this.filteredMakes.length > 0;
  }

  selectMake(make: Make): void {
    this.selectedMake = make;
    this.searchText = make.make_Name;
    this.showDropdown = false;
    this.vehicleTypes = [];
    this.makeChanged.emit();

    this.isLoadingTypes = true;
    this.vehicleService.getVehicleTypes(make.make_ID).subscribe({
      next: (data) => {
        this.vehicleTypes = data;
        this.isLoadingTypes = false;
      },
      error: () => {
        this.isLoadingTypes = false;
      }
    });
  }

  onSearch(): void {
    if (!this.selectedMake || !this.selectedYear) return;

    this.isLoadingModels = true;
    this.vehicleService.getVehicleModels(this.selectedMake.make_ID, this.selectedYear).subscribe({
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
    return !!this.selectedMake && !!this.selectedYear;
  }
}