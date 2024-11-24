import { inject, Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { Admin } from '../model/admin';
import { firstValueFrom, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminService: AdminService = inject(AdminService);//service pour gérer les admins
  admin: Admin[] = []; //tableau pour stocker les admins
  //se connecter
  login(nom: string, mdp: string): Observable<boolean> {
    return this.adminService.getAdmin().pipe(
      //récupérer les admins
      map((data) => {
        this.admin = data;

        // Perform the verification logic after HTTP response
        let i = 0;
        while (
          i < this.admin.length &&
          (this.admin[i].username !== nom || this.admin[i].pwd !== mdp)
        ) {
          i++;
        }
        //si l'admin n'existe pas
        if (i >= this.admin.length) {
          localStorage.setItem('cnx', 'disconnected');
          return false;
        } else { //si l'admin existe
          localStorage.setItem('cnx', 'connected');
          localStorage.setItem("user", this.admin[i].id)

          return true;
        }
      })
    );


  }
}