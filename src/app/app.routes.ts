import { Routes } from '@angular/router';
import { HomeComponent } from './compnents/home/home.component';
import { AboutUsComponent } from './compnents/about-us/about-us.component';
import { ContactUsComponent } from './compnents/contact-us/contact-us.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',title:'Home',component:HomeComponent},
    {path:'aboutUs',title:'About Us',component:AboutUsComponent},
    {path:'contactUs',title:'Contact Us',component:ContactUsComponent}
];
