import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';
const url="http://localhost:3000/admin";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //httpclient pour faire des requêtes http
   http:HttpClient=inject(HttpClient);
  constructor() { }
  //récupérer tous les admins
  public getAdmin():Observable<Admin[]>{
    return this.http.get<Admin[]>(url);
  }
  //modifier le mot de passe de l'admin
  public changePwd(id:string,pwd:any):Observable<Admin>{
    return this.http.patch<Admin>(url+'/'+id,pwd);
  }
  //récupérer un admin par son id
  public getAdminById(id:string):Observable<Admin>{
    return this.http.get<Admin>(url+'/'+id);
  }
}
