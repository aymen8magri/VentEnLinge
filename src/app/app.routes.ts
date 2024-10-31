import { Routes } from '@angular/router';
import { HomeComponent } from './compnents/home/home.component';
import { AboutUsComponent } from './compnents/about-us/about-us.component';
import { ContactUsComponent } from './compnents/contact-us/contact-us.component';
import { ErrorComponent } from './compnents/error/error.component';
import { LoginComponent } from './compnents/login/login.component';
import { PanierComponent } from './compnents/panier/panier.component';
import { ListPlantsComponent } from './compnents/list-plants/list-plants.component';
import { PlantDetaillComponent } from './compnents/plant-detaill/plant-detaill.component';
import { PlantInformationComponent } from './compnents/plant-information/plant-information.component';
import { PlantCommentComponent } from './compnents/plant-comment/plant-comment.component';
import { ListPlantsAdminComponent } from './compnents/list-plants-admin/list-plants-admin.component';
import { AddPlantComponent } from './compnents/add-plant/add-plant.component';
import { PlantDetailAdminComponent } from './compnents/plant-detail-admin/plant-detail-admin.component';
import { PlantInformationAdminComponent } from './compnents/plant-information-admin/plant-information-admin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: 'listePlantes', title: 'Liste des Plantes', component: ListPlantsComponent },
    { path: 'aboutUs', title: 'About Us', component: AboutUsComponent },
    { path: 'contactUs', title: 'Contact Us', component: ContactUsComponent },
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'panier', title: 'Panier', component: PanierComponent },
    {
        path: 'plant/:id', title: 'Plant', component: PlantDetaillComponent, children: [
            { path: 'description', component: PlantInformationComponent },
            { path: 'comments', component: PlantCommentComponent },
            { path: '', redirectTo: 'description', pathMatch: 'full' }      // Redirect to description by default
            
        ]
    },
    {path:'ListePlantesAdmin',title:'ListeAdmin',component:ListPlantsAdminComponent},
    {path:'plantAdmin/:id',title:'Plant',component:PlantDetailAdminComponent,children:[
        {path:'descriptionAdmin',component:PlantInformationAdminComponent},
        {path:'',redirectTo:'descriptionAdmin',pathMatch:'full'},
    ]},
    {path:'addPlant',title:'AddPlant',component:AddPlantComponent},
   
    { path: '**', title: '404', component: ErrorComponent }

];
