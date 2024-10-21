import { Routes } from '@angular/router';
import { HomeComponent } from './compnents/home/home.component';
import { AboutUsComponent } from './compnents/about-us/about-us.component';
import { ContactUsComponent } from './compnents/contact-us/contact-us.component';
import { ErrorComponent } from './compnents/error/error.component';
import { LoginComponent } from './compnents/login/login.component';
import { PanierComponent } from './compnents/panier/panier.component';
import { ListPlantsComponent } from './compnents/list-plants/list-plants.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',title:'Home',component:HomeComponent},
    {path:'listePlantes',title:'Liste des Plantes',component:ListPlantsComponent},
    {path:'aboutUs',title:'About Us',component:AboutUsComponent},
    {path:'contactUs',title:'Contact Us',component:ContactUsComponent},
    {path:'login',title:'Login',component:LoginComponent},
    {path:'panier',title:'Panier',component:PanierComponent},
    {path:'**',title:'404',component:ErrorComponent}
];
