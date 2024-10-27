import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../model/plant';

const API_URL = 'http://localhost:3000/plants';

@Injectable({
  providedIn: 'root'
})
export class PalntService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  public getPlantsByCategory(category: string): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${API_URL}?category=${category}`);
  }

  public getPlantById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${API_URL}/${id}`);
  }
}
