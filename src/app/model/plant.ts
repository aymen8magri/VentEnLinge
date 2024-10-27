export class Plant {
    id: number;
    name: string;
    type: string;
    personality: string;
    description: string;
    watering_frequency: string;
    biography: string;
    entretien: string;
    dureeVie: string;
    in_stock: boolean;
    category: string;
    fun_filter: string;
    price: number;
    stock: number;
    date_ajout: Date;
    liste_des_commentaires: Comment[];
    images: string[];

    constructor(id: number, name: string, type: string, personality: string, description: string, watering_frequency: string, biography: string, entretien: string, dureeVie: string, in_stock: boolean, category: string, fun_filter: string, price: number, stock: number, date_ajout: Date, liste_des_commentaires: Comment[], images: string[]) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.personality = personality;
        this.description = description;
        this.watering_frequency = watering_frequency;
        this.biography = biography;
        this.entretien = entretien;
        this.dureeVie = dureeVie;
        this.in_stock = in_stock;
        this.category = category;
        this.fun_filter = fun_filter;
        this.price = price;
        this.stock = stock;
        this.date_ajout = date_ajout;
        this.liste_des_commentaires = liste_des_commentaires;
        this.images = images;
    }
}
