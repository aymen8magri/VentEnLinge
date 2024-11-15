export class Commentaire {
    nom: string;
    message: string;
    nbLikes:number;
    liked:boolean;

    constructor(nom: string, message: string ) {
        this.nom = nom;
        this.message = message;
        this.nbLikes=0;
        this.liked=false;
    }
}
