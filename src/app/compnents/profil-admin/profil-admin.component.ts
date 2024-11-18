import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../model/admin';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profil-admin.component.html',
  styleUrl: './profil-admin.component.css'
})
export class ProfilAdminComponent implements OnInit {

  adminId!: any
  adminService: AdminService = inject(AdminService);
  admin!: Admin;
  profilForm!: FormGroup;
  hideForm: boolean = true;
  fb: FormBuilder = inject(FormBuilder);
  ngOnInit(): void {
    if (typeof (Storage) != "undefined") {
      this.adminId = localStorage.getItem("user");
    }

    this.adminService.getAdminById(this.adminId).subscribe(
      data => this.admin = data,
      error => console.log(error),
      () => console.log("admin chargé",this.admin),
    )
    // initialisation du formulaire
    this.profilForm = this.fb.group({
      mdpActuel: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      mdpNew: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      mdpConfirm: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]]
    })
  }

  get newPwd() {
    return this.profilForm.get('mdpNew');
  }
  get mdp() {
    return this.profilForm.get('mdpActuel');

  }
  get mdpconfirm() {
    return this.profilForm.get('mdpConfirm');

  }
  onModifier() {
    this.hideForm = !this.hideForm;
  }
  onConfirmer() {
    if (this.mdp?.value === this.admin.pwd && this.newPwd?.value === this.mdpconfirm?.value) {
      this.adminService.changePwd(this.adminId, { pwd: this.newPwd?.value }).subscribe(
        data => this.admin.pwd = data.pwd
      )
      this.hideForm = true;
    }
  }
  onReset() {
    this.profilForm.reset();
  }
}
