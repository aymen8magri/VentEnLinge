import { Plant } from "./plant";

export class Commande {
    nom:string;
    prenom:string;
    tel:string;
    adresse:string;
    etat:string;
    articles:Plant[];
    constructor(nom:string,prenom:string, tel:string, adresse:string,  etat:string, articles:Plant[]){
        this.nom=nom;
        this.prenom=prenom;
        this.tel=tel;
        this.adresse=adresse;
        this.etat=etat;
        this.articles=articles;
    }
}
