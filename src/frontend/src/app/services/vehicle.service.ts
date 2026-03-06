import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Make, VehicleModel, VehicleType } from '../models/vehicle.models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly apiUrl = 'http://localhost:5172/api/vehicle';
  private makesCache: Make[] | null = null;

  constructor(private http: HttpClient) {}

  getAllMakes(): Observable<Make[]> {
    if (this.makesCache) {
      return of(this.makesCache);
    }
    return this.http.get<Make[]>(`${this.apiUrl}/makes`).pipe(
      tap(data => this.makesCache = data)
    );
  }

  getVehicleTypes(makeId: number): Observable<VehicleType[]> {
    return this.http.get<VehicleType[]>(`${this.apiUrl}/${makeId}/types`);
  }

  getVehicleModels(makeId: number, year: number): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(`${this.apiUrl}/${makeId}/models/${year}`);
  }
}