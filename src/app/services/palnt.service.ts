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
  public getPlants():Observable<Plant[]>{
    return this.http.get<Plant[]>(API_URL);
  }
  public getPlantsByCategory(category: string): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${API_URL}?category=${category}`);
  }

  public getPlantById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${API_URL}/${id}`);
  }
  public deletePlant(id:number){
    return this.http.delete(API_URL+'/'+id);
  }
  public addPlant(p:Plant):Observable<Plant>{
    return this.http.post<Plant>(API_URL,p);
  }
  public updatePrice(id:number,price:any):Observable<Plant>{
    return this.http.patch<Plant>(API_URL+"/"+id,price);
  }
  public updateStock(id:number,stock:any):Observable<Plant>{
    return this.http.patch<Plant>(API_URL+'/',stock);
  }


}
