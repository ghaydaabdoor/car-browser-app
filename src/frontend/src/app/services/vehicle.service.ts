import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Make, VehicleModel, VehicleType } from '../models/vehicle.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly apiUrl = environment.apiUrl;

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