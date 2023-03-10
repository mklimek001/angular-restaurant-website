import { AuthServiceService } from './../auth-service.service';
import { DishesServiceService } from './../dishes-service.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
//import dishes from './dishes-files/dishes.json';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.css']
})

export class DishesListComponent implements OnInit {
  constructor(private dishesService: DishesServiceService,
    public auth: AuthServiceService) { }

  public dishes: DishInfo[] = [];
  public dishesClass: any = [];
  totalReserved: Number = 0;
  numOfdishes: number = 0;
  onePage = 5;
  numOfPages = 0;
  numbers: number[] = [];
  startInd = 0;
  lastInd = 5;
  maximumprice = -1;
  minimumprice = -1;
  //public orderedDishes: TakenFood[] = [];
  //public deletedDishes: string[] = [];
  //basketShowed = false
  /*orderSummary = (
    {name: 'Łącznie wszystkie zamówione dania',
      number: 0,
      singleprice: 0,
      totalprice: 0
  })*/



  ngOnInit(): void {

    this.getDishesList();
    //this.dishesService.getDishes().subscribe(dishesddata => {
    //  this.dishes = dishesddata;
    //})

    this.dishesService.getNumber().subscribe(sumnum => {
      this.totalReserved = sumnum;
    })

    this.numOfdishes = this.dishes.length;
    this.numOfPages = Math.ceil(this.numOfdishes/this.onePage);
    this.newPagesTable();


  }




  changingReservationDatas(newlyReserved : TakenFood){
    this.dishesService.changingReservationDatas(newlyReserved);
    //this.sumReservationDatas();
  }

  getDishesList(){
    this.dishesService.getDishList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
          )
        )
      ).subscribe(dishesGot => {
        this.dishesClass = dishesGot;
        this.dishes = [];

        for(let i = 0; i< dishesGot.length; i++){
          let curr = dishesGot[i]

          let temp = ({
            name: curr.name!,
            region: curr.region!,
            category: curr.category!,
            description: curr.description!,
            ingredients: curr.ingredients!,
            maxquantity: curr.maxquantity!,
            price: curr.price!,
            photos: curr.photos!
          })

        this.dishes.push(temp);

        }

        this.numOfdishes = this.dishes.length;
        this.numOfPages = Math.ceil(this.numOfdishes/this.onePage);
        this.newPagesTable();


      });
      this.maximumprice = Math.max.apply(Math, this.dishes.map(function(dish) { return dish.price; }))
      this.minimumprice = Math.min.apply(Math, this.dishes.map(function(dish) { return dish.price; }))
      console.log(this.maximumprice, this.minimumprice)
  }


  changeOnPage(num: number){
    this.onePage = num;
    this.numOfPages = Math.ceil(this.numOfdishes/this.onePage);
    this.newPagesTable();
    this.startInd = 0;
    this.lastInd = num;

  }

  newPagesTable(){
    this.numbers = [];
    for(let i=0; i < this.numOfPages; i++){
      this.numbers.push(i);
    }
  }

  changePage(pagenInd: number){
    this.startInd = pagenInd * this.onePage;
    this.lastInd = (pagenInd + 1) * this.onePage;
  }

  prevChangePage(){
    if(this.startInd > 0){
      this.startInd -= this.onePage;
      this.lastInd -= this.onePage;
    }
  }

  nextChangePage(){
    if(this.lastInd <= this.numOfdishes){
      this.startInd += this.onePage;
      this.lastInd += this.onePage;
    }
  }

  /*sumReservationDatas(){
    let totalNumber = 0;
    let totalMoney = 0;
    for(let i = 0; i < this.orderedDishes.length; i++){
      totalNumber += this.orderedDishes[i].number;
      totalMoney += this.orderedDishes[i].number * this.orderedDishes[i].singleprice;
    }

    this.orderSummary.number = totalNumber;
    this.orderSummary.totalprice = totalMoney;
  }*/


  reservation(reservationInfo: TakenFood){
    this.dishesService.reservation(reservationInfo)
    /*this.changingReservationDatas(reservationInfo);
    this.totalReserved = this.orderSummary.number;
    console.log(this.orderedDishes);*/
  }


  deleteDish(toDeleteName: string){
    this.dishesService.deleteDishRef(toDeleteName);
    this.getDishesList();
    /*this.deletedDishes.push(toDeleteName);
    this.dishes = dishes.filter(dish => !this.deletedDishes.includes(dish.name));*/
  }

  /*showBasket(){
    this.basketShowed = !this.basketShowed;
  }

  addingmeal(createddish: DishInfo){
    this.dishes.push(createddish);
    let currval: TakenFood = (
      {name: createddish.name,
        number: 0,
        singleprice: createddish.price,
        totalprice: 0
    })

    this.orderedDishes.push(currval);
  }*/


  /**ngOnInit(): void {
    console.log(dishes)

    for(let i = 0; i < dishes.length; i++){
      let currval: TakenFood = (
        {name: dishes[i].name,
          number: 0,
          singleprice: dishes[i].price,
          totalprice: 0
      })

      this.orderedDishes.push(currval);
    }
    console.log(this.orderedDishes);
  }

  public dishes: DishInfo[] = dishes;
  public orderedDishes: TakenFood[] = [];
  public deletedDishes: string[] = [];

  maximumprice = Math.max.apply(Math, dishes.map(function(dish) { return dish.price; }))
  minimumprice = Math.min.apply(Math, dishes.map(function(dish) { return dish.price; }))

  totalReserved = 0
  basketShowed = false

  orderSummary = (
    {name: 'Łącznie wszystkie zamówione dania',
      number: 0,
      singleprice: 0,
      totalprice: 0
  })


  changingReservationDatas(newlyReserved : TakenFood){
    for(let i = 0; i < this.orderedDishes.length; i++){
      if(newlyReserved.name == this.orderedDishes[i].name){
        this.orderedDishes[i].number = newlyReserved.number;
        this.orderedDishes[i].totalprice = this.orderedDishes[i].singleprice * newlyReserved.number;
      }
    }

    this.sumReservationDatas();
  }


  sumReservationDatas(){
    let totalNumber = 0;
    let totalMoney = 0;
    for(let i = 0; i < this.orderedDishes.length; i++){
      totalNumber += this.orderedDishes[i].number;
      totalMoney += this.orderedDishes[i].number * this.orderedDishes[i].singleprice;
    }

    this.orderSummary.number = totalNumber;
    this.orderSummary.totalprice = totalMoney;
  }


  reservation(reservationInfo: TakenFood){
    this.changingReservationDatas(reservationInfo);
    this.totalReserved = this.orderSummary.number;
    console.log(this.orderedDishes);
  }


  deleteDish(toDeleteName: string){
    this.deletedDishes.push(toDeleteName);
    this.dishes = dishes.filter(dish => !this.deletedDishes.includes(dish.name));
  }

  showBasket(){
    this.basketShowed = !this.basketShowed;
  }

  addingmeal(createddish: DishInfo){
    this.dishes.push(createddish);
    let currval: TakenFood = (
      {name: createddish.name,
        number: 0,
        singleprice: createddish.price,
        totalprice: 0
    })

    this.orderedDishes.push(currval);
  } */
}

export interface DishInfo {
  name:string;
  region:string;
  category: string;
  description: string;
  ingredients: string[];
  maxquantity: number;
  price: number;
  photos: string[];
}


interface TakenFood {
  name: string,
  number: number,
  singleprice: number,
  totalprice: number,
}



