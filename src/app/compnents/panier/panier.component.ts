import { Component, inject } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  tabcart: Plant[] = [];
  total!:number
  plantService:PalntService=inject(PalntService);
  tabcom:Plant[]= [];
  nbDispo:number=0;
  router:Router=inject(Router);


  constructor(private palntService: PalntService) {}
  removeDuplicates(): void {
    this.tabcom = this.tabcart.filter((value, index, self) => 
      index === self.findIndex((t) => (
        t.id === value.id 
      ))
    );
  }
  ngOnInit(): void {
    this.tabcart = this.palntService.tabcart;
    console.log(this.tabcart);
    this.total=this.palntService.total();
    this.removeDuplicates();
    console.log(this.tabcom);
  }

   
  deleteFromCart(plant: Plant): void {
    this.palntService.deleteFromCart(plant);
    this.tabcart = this.palntService.tabcart; 
    this.removeDuplicates();
    this.total=this.palntService.total();
  }

  clearCart(): void {
    this.palntService.clearCart();
    this.tabcom = this.palntService.tabcart;
    this.total=this.palntService.total();
    
  }
 
  calculateQuantity(name:string){
    return this.tabcart.filter(a => a.name === name).length;
  }
  onPanier(){
    for (const t of this.tabcom){
      if(this.calculateQuantity(t.name)<=t.stock){
      
      console.log(t.stock);

      this.router.navigate(['/passerCommande']);

      }
      else {
        
        alert("on ne peut fournir que "+t.stock +"de"+t.name )
        this.router.navigate(['/panier']);

        break;
      }
  }
}
}
