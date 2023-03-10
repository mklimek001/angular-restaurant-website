import { AuthServiceService } from './../auth-service.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishInfo } from '../dishes-list/dishes-list.component';
import { DishesServiceService } from './../dishes-service.service';

@Component({
  selector: 'app-detailed-dish',
  templateUrl: './detailed-dish.component.html',
  styleUrls: ['./detailed-dish.component.css']
})
export class DetailedDishComponent implements OnInit {

  constructor(private dishesService: DishesServiceService) { }

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


  taken = 0;
  showdindex = 0;


  ngOnInit(): void {
    this.dishesService.getDetails().subscribe(dishesddata => {
      this.dishinfo = dishesddata;
    })

  }

  addMeal(): void{
    this.taken += 1;
    this.selected();
  }


  removeMeal(): void{
    if(this.taken > 0){
      this.taken -= 1;
      this.selected();
    }
  }


  deleteDish(): void{
    this.taken = 0;
    this.selected();
    //this.todelete.emit(this.dishinfo.name);
    this.dishesService.deleteDish(this.dishinfo.name);
  }

  selected(){
    //this.takenfood.emit(this.mergeInfo());
    let currTaken = this.mergeInfo();
    this.dishesService.changingReservationDatas(currTaken);
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

  changeImg(index: number){
    this.showdindex = index;
  }

}


interface TakenFood {
  name: string,
  number: number,
  singleprice: number,
  totalprice: number,
}
