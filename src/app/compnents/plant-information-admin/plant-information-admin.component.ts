import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-information-admin',
  standalone: true,
  imports: [],
  templateUrl: './plant-information-admin.component.html',
  styleUrl: './plant-information-admin.component.css'
})
export class PlantInformationAdminComponent implements OnInit{
  plant!: Plant;
  palntService: PalntService = inject(PalntService);
  route: ActivatedRoute = inject(ActivatedRoute);
  val!: number;
  hidePrix=true;
  hideStock=true;
  hideInStock=true;
  ngOnInit(): void {
     
    this.route.parent?.paramMap.subscribe(params => { // Use `parent` to access `id`
      const idParam = params.get('id');
      console.log("ID Param (string):", idParam);
  
      this.val = idParam ? +idParam : NaN;
      console.log("Plant ID (number):", this.val);
  
      if (!isNaN(this.val)) {
        this.palntService.getPlantById(this.val).subscribe({
          next: (plant) => {
            this.plant = plant;
            console.log("Fetched plant:", this.plant);
          },
          error: (error) => console.error('Failed to fetch plant:', error),
        });
      } else {
        console.error('Invalid or missing Plant ID');
      }
    });
  }
  onHidePrix(){
    this.hidePrix=!this.hidePrix;

  }
  onHideStock(){
    this.hideStock=!this.hideStock;
  }
  onHideInStock(){
    this.hideInStock=!this.hideInStock;
  }
  onSavePrix(prix:string){
    const p=parseFloat(prix);
    this.palntService.updatePrice(this.val,{price:p}).subscribe(
      data=>{
        this.plant.price=data.price
      }
    )
    this.hidePrix=true;
  }
  onSaveStock(stock:string){
    const s=parseInt(stock);
    this.palntService.updateStock(this.val,{stock:s}).subscribe(
      data=>{this.plant.stock=data.stock
        
      }
    )
    this.hideStock=true;
  }
  onSaveInStock(event:Event){
    const value= (event.target as HTMLSelectElement).value;
    this.palntService.updateInStock(this.val,{in_stock:value==='true'}).subscribe(
      data=>{this.plant.in_stock=data.in_stock}
    )
    this.hideInStock=true;
  }
}
