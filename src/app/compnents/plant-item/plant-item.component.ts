import { Component, Input, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';

@Component({
  selector: 'app-plant-item',
  standalone: true,
  imports: [],
  templateUrl: './plant-item.component.html',
  styleUrl: './plant-item.component.css'
})
export class PlantItemComponent implements OnInit {

  @Input() plant!: Plant;

  ngOnInit(): void {
    console.log(this.plant);
  }
}