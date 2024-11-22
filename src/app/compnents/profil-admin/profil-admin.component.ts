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

  adminId!: any; //id de l'admin
  adminService: AdminService = inject(AdminService); //service pour les admins
  admin!: Admin; //admin actuel
  profilForm!: FormGroup; //formulaire pour modifier le mot de passe
  hideForm: boolean = true; //booléen pour masquer ou afficher le formulaire
  fb: FormBuilder = inject(FormBuilder); //builder pour le formulaire
  ngOnInit(): void {
    if (typeof (Storage) != "undefined") {
      this.adminId = localStorage.getItem("user"); //récupérer l'id de l'admin dans le local storage
    }

    this.adminService.getAdminById(this.adminId).subscribe(
      data => this.admin = data, //affecter les données de l'admin à l'admin actuel
      error => console.log(error), //afficher l'erreur si elle existe
      () => console.log("admin chargé", this.admin), //afficher un message si l'admin est chargé
    )
    // initialisation du formulaire
    this.profilForm = this.fb.group({
      mdpActuel: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      mdpNew: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      mdpConfirm: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  //getter pour les champs du formulaire
  get newPwd() {
    return this.profilForm.get('mdpNew');
  }
  get mdp() {
    return this.profilForm.get('mdpActuel');

  }
  get mdpconfirm() {
    return this.profilForm.get('mdpConfirm');
  }

  //fonction pour modifier le mot de passe
  onModifier() {
    this.hideForm = !this.hideForm; //afficher ou masquer le formulaire
  }
  //fonction pour confirmer la modification du mot de passe
  onConfirmer() {
    if (this.mdp?.value === this.admin.pwd && this.newPwd?.value === this.mdpconfirm?.value) {
      this.adminService.changePwd(this.adminId, { pwd: this.newPwd?.value }).subscribe(
        data => this.admin.pwd = data.pwd
      )
      this.hideForm = true;
    }

  }
  //fonction pour réinitialiser le formulaire
  onReset() {
    this.profilForm.reset();
  }
}
