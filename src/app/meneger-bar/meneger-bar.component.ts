import { Component, Input, OnInit } from '@angular/core';
import { DishInfo } from '../dishes-list/dishes-list.component';
import { DishesServiceService } from '../dishes-service.service';

@Component({
  selector: 'app-meneger-bar',
  templateUrl: './meneger-bar.component.html',
  styleUrls: ['./meneger-bar.component.css']
})
export class MenegerBarComponent implements OnInit {

  constructor(private dishesService: DishesServiceService) { }

  @Input()
  dishinfo: DishInfo = {
    name: '',
    region: '',
    category: '',
    description: '',
    ingredients: [],
    maxquantity: 0,
    price: 0,
    photos: [],
  };

  ngOnInit(): void {
  }

  deleteDish(): void{
    this.dishesService.deleteDishRef(this.dishinfo.name);
  }

  changeToEditDish():void{
    this.dishesService.toEditDish = this.dishinfo;
  }

}
