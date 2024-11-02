import { Commentaire } from "./commentaire";

export class ListeComments {
    id:number;
    liste:Commentaire[];
    constructor(id:number,liste:Commentaire[]){
        this.id=id;
        this.liste=liste
    }
}
