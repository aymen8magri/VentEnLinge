import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
     const router:Router=inject(Router); //service pour la navigation
     if(localStorage.getItem("cnx")==="connected"){ //vérifier si l'utilisateur est connecté
      return true; //autoriser l'accès
     }
     else{ //si l'utilisateur n'est pas connecté
      router.navigate(['/login']); //rediriger vers la page de connexion   
      return false; //interdire l'accès
     }
};
