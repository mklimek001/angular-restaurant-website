import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { DishesServiceService } from './dishes-service.service';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {
  baseBasket: TakenFood[]
  public Baskets: UserAndBasket[] = []
  public currUserBasket: TakenFood[] = []
  public currUserID: string = ''

  constructor(public auth: AuthServiceService,
    public dishes: DishesServiceService) {
      this.baseBasket = this.dishes.orderedDishes
      this.currUserID =this.auth.currUser.userID
     }


  newlyLogedUser(loggedUserID: string){
    let isBasket = false;
    for(let i = 0; i < this.Baskets.length; i++){
      if(this.Baskets[i].userID == loggedUserID){
        this.currUserBasket = this.Baskets[i].basket
        isBasket = true;
      }
    }

    if(!isBasket){
      this.createNewBasket(loggedUserID);
      for(let i = 0; i < this.Baskets.length; i++){
        if(this.Baskets[i].userID == loggedUserID){
          this.currUserBasket = this.Baskets[i].basket
        }
      }
    }

  }

  createNewBasket(nowUserID: string): void{
    let newBasket = this.baseBasket;
    let tempUaB: UserAndBasket = {
      userID: nowUserID,
      basket: newBasket
    }
    this.Baskets.push(tempUaB)
  }

  addMeal(mealName:string): void{
    for(let i = 0; i< this.currUserBasket.length; i++){
      if(this.currUserBasket[i].name == mealName){
        this.currUserBasket[i].number += 1;
        this.currUserBasket[i].totalprice = (this.currUserBasket[i].number * this.currUserBasket[i].singleprice)
      }
    }
    this.actualizeBasket()
  }

  removeMeal(mealName:string): void{
    for(let i = 0; i< this.currUserBasket.length; i++){
      if(this.currUserBasket[i].name == mealName){
        this.currUserBasket[i].number -= 1;
        this.currUserBasket[i].totalprice = (this.currUserBasket[i].number * this.currUserBasket[i].singleprice)
      }
    }
    this.actualizeBasket()
  }

  actualizeBasket():void{
    for(let i = 0; i < this.Baskets.length; i++){
      if(this.Baskets[i].userID == this.currUserID){
        this.Baskets[i].basket = this.currUserBasket;
      }
    }
  }

  summarize(): TakenFood{
    let sumprod = 0;
    let sumprice = 0;

    for(let i = 0; i< this.currUserBasket.length; i++){
      sumprod += this.currUserBasket[i].number;
      sumprice += this.currUserBasket[i].totalprice
    }

    let sum: TakenFood = {
      name: "Wszystkie produkty",
      number: sumprod,
      singleprice: 0,
      totalprice: sumprice
    }

    return sum;
  }

}


interface TakenFood {
  name: string,
  number: number,
  singleprice: number,
  totalprice: number,
}

interface UserAndBasket{
  userID: string,
  basket: TakenFood[]
}
