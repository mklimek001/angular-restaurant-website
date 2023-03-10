import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { DishesServiceService } from '../dishes-service.service';
import { BasketServiceService } from '../basket-service.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public orderedDishes: TakenFood[] = [];
  public orderSummary = (
    {name: 'Łącznie wszystkie zamówione dania',
      number: 0,
      singleprice: 0,
      totalprice: 0
  })

  constructor(private dishesService: DishesServiceService,
    public auth: AuthServiceService,
    public basket: BasketServiceService) { }

  ngOnInit(): void {
    this.dishesService.getOrdered().subscribe(ordereddata => {
      this.orderedDishes = ordereddata;
    })

    this.dishesService.getSummary().subscribe(summarydata => {
      this.orderSummary = summarydata;
    })
    console.log(this.basket.currUserBasket)
  }

}

interface TakenFood {
  name: string,
  number: number,
  singleprice: number,
  totalprice: number,
}
