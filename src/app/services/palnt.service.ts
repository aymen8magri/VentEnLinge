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
    return this.http.patch<Plant>(API_URL+'/',stock);
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
    if(plant.stock > 0){
      this.tabcart.push(plant);
    }
    else{
      alert("La plante n'est pas en stock");
    }
  }
  //delete plant from cart
  public deleteFromCart(plant: Plant): void {
    this.tabcart = this.tabcart.filter(p => p.id !== plant.id);
  }
  //clear cart
  public clearCart(): void {
    this.tabcart = [];
  }
  /*--------------------* Search *---------------------------*/
  public search(searchTerm: string): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${API_URL}?name=${searchTerm[0].toUpperCase()+searchTerm.slice(1)}`);
  }



}
