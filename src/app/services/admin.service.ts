import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';
const url="http://localhost:3000/admin";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
   http:HttpClient=inject(HttpClient);
  constructor() { }
  public getAdmin():Observable<Admin[]>{
    return this.http.get<Admin[]>(url);
  }
  public changePwd(id:string,pwd:any):Observable<Admin>{
    return this.http.patch<Admin>(url+'/'+id,pwd);
  }

  public getAdminById(id:string):Observable<Admin>{
    return this.http.get<Admin>(url+'/'+id);
  }
}
