import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Make, VehicleModel, VehicleType } from '../models/vehicle.models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly apiUrl = 'http://localhost:5172/api/vehicle';

  constructor(private http: HttpClient) {}

  getAllMakes(): Observable<Make[]> {
    return this.http.get<Make[]>(`${this.apiUrl}/makes`);
  }

  getVehicleTypes(makeId: number): Observable<VehicleType[]> {
    return this.http.get<VehicleType[]>(`${this.apiUrl}/${makeId}/types`);
  }

  getVehicleModels(makeId: number, year: number): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(`${this.apiUrl}/${makeId}/models/${year}`);
  }
}