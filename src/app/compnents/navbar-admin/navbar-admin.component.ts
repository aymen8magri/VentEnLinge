import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../model/admin';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterOutlet,FooterComponent, RouterLinkActive],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  router:Router=inject(Router);
  adminService:AdminService=inject(AdminService);
  admin!:Admin;
  adminId!:any

  ngOnInit(): void {
    if(typeof(Storage)!="undefined"){
      this.adminId=localStorage.getItem("user");
    }
    this.adminService.getAdminById(this.adminId).subscribe(
      data=>this.admin=data
    )
  }

  
  onDisconnect(){
     localStorage.removeItem('user');
     localStorage.setItem("cnx","disconnected");
     this.router.navigate(['/home']);
  }

}
