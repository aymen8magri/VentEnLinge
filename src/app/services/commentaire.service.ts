import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../model/commentaire';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/plants/liste_des_commentaires';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }
  public getComments(id:number):Observable<Commentaire[]>{
    return this.http.get<Commentaire[]>(API_URL);
  } 
}
