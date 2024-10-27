import { Component, inject, Input, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-plant-item',
  standalone: true,
  imports: [CurrencyPipe, NgClass, RouterLink], 
  templateUrl: './plant-item.component.html',
  styleUrl: './plant-item.component.css'
})
export class PlantItemComponent implements OnInit {
  

  @Input() plant!: Plant;

  ngOnInit(): void {
    console.log(this.plant);
  }
}
