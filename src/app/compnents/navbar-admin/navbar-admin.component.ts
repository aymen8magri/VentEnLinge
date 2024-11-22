import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../model/admin';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterOutlet,FooterComponent, RouterLinkActive,NgClass],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  router:Router=inject(Router); //router pour la navigation
  adminService:AdminService=inject(AdminService); //service pour les admins
  admin!:Admin; //admin connecté
  adminId!:any; //id de l'admin connecté
  isNavbarCollapsed = true; //boolean pour savoir si la navbar est collée


  ngOnInit(): void {
    if(typeof(Storage)!="undefined"){
      this.adminId=localStorage.getItem("user"); //récupérer l'id de l'admin connecté
    }
    this.adminService.getAdminById(this.adminId).subscribe(
      data=>this.admin=data //récupérer l'admin connecté
    )
  }

  //déconnecter l'admin
  onDisconnect(){
     localStorage.removeItem('user');
     localStorage.setItem("cnx","disconnected");
     this.router.navigate(['/home']);
  }

}
