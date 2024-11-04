import { Watering } from "./watering";

export class Plant {
    id: string;
    name: string;
    personality: string;
    description: string;
    entretien: string;
    dureeVie: string;
    in_stock: boolean;
    category: string;
    fun_filter: string;
    price: number;
    stock: number;
    date_ajout: Date;
    arrosage:Watering[]
    images: string;

    constructor(id: string, name: string, personality: string, description: string,  entretien: string, dureeVie: string, in_stock: boolean, category: string, fun_filter: string, price: number, stock: number, date_ajout: Date, images: string, arrosage:Watering[],) {
        this.id = id;
        this.name = name;
        this.personality = personality;
        this.description = description;
        this.entretien = entretien;
        this.dureeVie = dureeVie;
        this.in_stock = in_stock;
        this.category = category;
        this.fun_filter = fun_filter;
        this.price = price;
        this.stock = stock;
        this.date_ajout = date_ajout;
        this.images = images;
        this.arrosage=arrosage;
    }
}
