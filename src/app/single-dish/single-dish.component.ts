import { BasketServiceService } from './../basket-service.service';
import { DishInfo } from './../dishes-list/dishes-list.component';
import { Component, Input, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { DishesServiceService } from './../dishes-service.service';

@Component({
  selector: 'app-single-dish',
  templateUrl: './single-dish.component.html',
  styleUrls: ['./single-dish.component.css']
})


export class SingleDishComponent implements OnInit {

  constructor(private dishesService: DishesServiceService,
    public basket: BasketServiceService) { }

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

  @Output()
  takenfood = new EventEmitter<TakenFood>();

  @Output()
  todelete = new EventEmitter<string>();

  taken = 0;



  ngOnInit(): void {
    console.log(this.dishinfo);

  }

  toDetailedShow(){
    this.dishesService.changeDetailed(this.dishinfo);
  }

  addMeal(): void{
    this.taken += 1;
    this.selected();
    this.basket.addMeal(this.dishinfo.name);

  }


  removeMeal(): void{
    if(this.taken > 0){
      this.taken -= 1;
      this.selected();
    }
    this.basket.removeMeal(this.dishinfo.name);
  }


  deleteDish(): void{
    this.taken = 0;
    this.selected();
    this.todelete.emit(this.dishinfo.name);
  }

  selected(){
    this.takenfood.emit(this.mergeInfo());
  }

  mergeInfo(): TakenFood{
    let currval: TakenFood = (
      {name: this.dishinfo.name,
        number: this.taken,
        singleprice: 0,
        totalprice: this.dishinfo.price * this.taken
    })

    return currval;
  }

}


interface TakenFood {
  name: string,
  number: number,
  singleprice: number,
  totalprice: number,
}

