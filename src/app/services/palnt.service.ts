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
  //get all plants
  public getPlants():Observable<Plant[]>{
    return this.http.get<Plant[]>(API_URL);
  }
  //get plants by category
  public getPlantsByCategory(category: string): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${API_URL}?category=${category}`);
  }
  //get plants by fun filter
  public getPlantsByFunFilter(funFilter: string): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${API_URL}?fun_filter=${funFilter}`);
  }
  //get plant by id
  public getPlantById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${API_URL}/${id}`);
  }
  //delete plant by id
  public deletePlant(id:number){
    return this.http.delete(API_URL+'/'+id);
  }
  //add plant
  public addPlant(p:Plant):Observable<Plant>{
    return this.http.post<Plant>(API_URL,p);
  }
  //update price
  public updatePrice(id:number,price:any):Observable<Plant>{
    return this.http.patch<Plant>(API_URL+"/"+id,price);
  }
  //update stock
  public updateStock(id:number,stock:any):Observable<Plant>{
    return this.http.patch<Plant>(API_URL+'/'+id ,stock);
  }
  //update in stock
  public updateInStock(id:number,in_stock:any):Observable<Plant>{
    return this.http.patch<Plant>(API_URL+'/'+id,in_stock);
  }
  /*--------------------* Wishlist *---------------------------*/
  //wishlist
  public tabplants: Plant[] = [];
  //add plant to wishlist
  public addPlantToWishlist(plant: Plant): void {
    this.tabplants.push(plant);
  }
  //check if plant is in wishlist
  public inWishlist(plant: Plant): boolean {
    return this.tabplants.some(p => p.id === plant.id);
  }
  //clear wishlist
  public clearWishlist(): void {
    this.tabplants = [];
  }
  //remove plant from wishlist
  public removePlantFromWishlist(plant: Plant): void {
    this.tabplants = this.tabplants.filter((p) => p.id !== plant.id);
  }
  /*--------------------* Cart shop *---------------------------*/
  //cart
  public tabcart: Plant[] = [];
  //add plant to cart
  public addPlantToCart(plant: Plant): void {
    this.tabcart.push(plant);
  }
  //delete plant from cart
  public deleteFromCart(plant: Plant): void {
    this.tabcart = this.tabcart.filter(p => p.id !== plant.id);
  }
  //clear cart
  public clearCart(): void {
    this.tabcart = [];
  }
  public  total(): number {
    return this.tabcart.reduce((acc, plant) => acc + plant.price, 0);
  }
  /*--------------------* API *---------------------------*/
  //get plants from api
  private apiUrl = 'https://house-plants2.p.rapidapi.com/all-lite';
  private httpOptions = {
    headers: {
      'x-rapidapi-key': '3192d0fcf3mshe2323029dd97bc3p1f98f6jsn8329a2eb8e04',
      'x-rapidapi-host': 'house-plants2.p.rapidapi.com'
    }
  };
  //get all plants from api
  getPlantApi(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.httpOptions);
  }


  //get plant by category from api
  private baseUrl = 'https://house-plants2.p.rapidapi.com/category';
  private apiHttpOptions = {
    headers: {
      'x-rapidapi-key': '3192d0fcf3mshe2323029dd97bc3p1f98f6jsn8329a2eb8e04',
      'x-rapidapi-host': 'house-plants2.p.rapidapi.com'
    }
  };
  // Récupérer les plantes par catégorie
  getPlantApiByCategory(category: string): Observable<any[]> {
    const url = `${this.baseUrl}/${category}`;
    return this.http.get<any[]>(url, this.apiHttpOptions);
  }

}
