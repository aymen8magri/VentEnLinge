import { Plant } from "./plant";

export class Commande {
    id!:string
    nom:string;
    prenom:string;
    tel:string;
    adresse:string;
    etat:string;
    total:number;
    articles:Plant[];
    constructor(nom:string,prenom:string, tel:string, adresse:string,  etat:string,total:number, articles:Plant[]){
        this.nom=nom;
        this.prenom=prenom;
        this.tel=tel;
        this.adresse=adresse;
        this.etat=etat;
        this.total=total;
        this.articles=articles;
    }
}
