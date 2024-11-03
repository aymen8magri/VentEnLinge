import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../model/plant';
import { ListeComments } from '../model/liste-comments';
const url="http://localhost:4000/ListeComments";
@Injectable({
  providedIn: 'root'
})
export class ListeCommentsService {
  private readonly http:HttpClient=inject(HttpClient);

  constructor() { }
  getList():Observable<ListeComments[]>{
    return this.http.get<ListeComments[]>(url)
  }

  getListById(id:number):Observable<ListeComments>{
    return this.http.get<ListeComments>(url+'/'+id)

  }
  addComment(id:number,comment:any):Observable<ListeComments>{
    return this.http.patch<ListeComments>(url+'/'+id,comment)
  }
  addLike(id:number,like:any):Observable<ListeComments>{
    return this.http.patch<ListeComments>(url+'/'+id,like)
  }
}
