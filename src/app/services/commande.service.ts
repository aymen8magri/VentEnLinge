import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Commande } from '../model/commande';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Plant } from '../model/plant';
const url="http://localhost:3000/commandes";
@Injectable({
  providedIn: 'root'
})
export class commandeService {

  constructor() { }
  http:HttpClient=inject(HttpClient);

 public addCommande(c:Commande):Observable<Commande>{
   return this.http.post<Commande>(url,c);
  }

public getCommande():Observable<Commande[]>{
  return this.http.get<Commande[]>(url);
}
public deleteCommande(id:String){
 return this.http.delete(url+'/'+id);

}
public changeState(id:string,etat:any):Observable<Commande>{
  return this.http.patch<Commande>(url+'/'+id,etat);
}

public getArticles(id:string): Observable<Plant[]> {
  return this.getCommande().pipe(
    map(commandes => commandes.find(commande => commande.id === id)?.articles || [])
  );
} 
}
