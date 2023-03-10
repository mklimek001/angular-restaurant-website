import { list } from '@angular/fire/database';
//import { DishInfo } from './dishes-list/dishes-list.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import dishes from './dishes-list/dishes-files/dishes.json';

@Injectable({
  providedIn: 'root'
})

export class DishesServiceService {
  private dishes: DishInfo[] = dishes;
  public orderedDishes: TakenFood[] = [];
  private deletedDishes: string[] = [];
  private totalReserved = 0;
  private detailedDish: DishInfo = dishes[0];
  public toEditDish: DishInfo = dishes[0];
  private keysDictionary: keysDictionaryRecord[] = [];

  public Baskets: UserAndBasket[] = []

  dishesRef: AngularFireList<DishInfo>;

  orderSummary = (
    {name: 'Łącznie wszystkie zamówione dania',
      number: 0,
      singleprice: 0,
      totalprice: 0
  })

  dishesListObs = new BehaviorSubject<Array<DishInfo>>([]);
  orderedListObs = new BehaviorSubject<Array<TakenFood>>([]);
  reservedObs = new BehaviorSubject<Number>(0);
  summaryObs = new BehaviorSubject<TakenFood>(this.orderSummary);
  detailedObs = new BehaviorSubject<DishInfo>(this.detailedDish);


  constructor(private db: AngularFireDatabase){
    //this.dishesRef = db.list("/angular-restaurant-mklimek-default-rtdb")
    this.dishesRef = db.list("/dishes")
    //this.currAddExisting()

    this.dishesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
          )
        )
      ).subscribe(dishesGot => {
          for(let i = 0; i< dishesGot.length; i++){
          let curr = dishesGot[i]

          /*
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

          this.dishes.push(temp); */

          let currRecord: keysDictionaryRecord = ({
            name: curr.name!,
            key: curr.key!
          })

          this.keysDictionary.push(currRecord);

          let currval: TakenFood = (
            {name: curr.name!,
              number: 0,
              singleprice: curr.price!,
              totalprice: 0
          })

          this.orderedDishes.push(currval);
        }
      });

    /*for(let i = 0; i < dishes.length; i++){
      let currval: TakenFood = (
        {name: dishes[i].name,
          number: 0,
          singleprice: dishes[i].price,
          totalprice: 0
      })

      this.orderedDishes.push(currval);
    }*/
    console.log(this.orderedDishes);
    this.orderedListObs.next(this.orderedDishes);
    this.dishesListObs.next(this.dishes);
  }

  maximumprice = Math.max.apply(Math, dishes.map(function(dish) { return dish.price; }))
  minimumprice = Math.min.apply(Math, dishes.map(function(dish) { return dish.price; }))


  changingReservationDatas(newlyReserved : TakenFood){
    for(let i = 0; i < this.orderedDishes.length; i++){
      if(newlyReserved.name == this.orderedDishes[i].name){
        this.orderedDishes[i].number = newlyReserved.number;
        this.orderedDishes[i].totalprice = this.orderedDishes[i].singleprice * newlyReserved.number;
      }
    }

    this.sumReservationDatas();
    this.orderedListObs.next(this.orderedDishes);
  }

  currAddExisting(){
    for(let i = 0; i < dishes.length; i++){
      this.dishesRef.push(dishes[i]);
    }
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
    this.summaryObs.next(this.orderSummary);
  }


  reservation(reservationInfo: TakenFood){
    this.changingReservationDatas(reservationInfo);
    this.totalReserved = this.orderSummary.number;
    console.log(this.orderedDishes);
    this.reservedObs.next(this.totalReserved);
  }


  deleteDish(toDeleteName: string){
    this.deletedDishes.push(toDeleteName);
    this.dishes = this.dishes.filter(dish => !this.deletedDishes.includes(dish.name));
    this.dishesListObs.next(this.dishes);
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

    this.orderedListObs.next(this.orderedDishes);
    this.dishesListObs.next(this.dishes);
  }

  changeDetailed(newDetailed: DishInfo){
    this.detailedDish = newDetailed;
    this.detailedObs.next(this.detailedDish)
    console.log(this.deletedDishes);
  }


  getOrdered(): Observable<Array<TakenFood>>{
    return this.orderedListObs.asObservable();
  }

  getDishes(): Observable<Array<DishInfo>>{
    return this.dishesListObs.asObservable();
  }

  getSummary(): Observable<TakenFood>{
    return this.summaryObs.asObservable();
  }

  getNumber(): Observable<Number>{
    return this.reservedObs.asObservable();
  }

  getDetails(): Observable<DishInfo>{
    return this.detailedObs.asObservable();
  }


  getDishList():AngularFireList<DishInfo>{
    return this.dishesRef;
  }

  createDish(newDish: DishInfo){
    this.dishesRef.push(newDish);
  }

  deleteDishRef(toDeleteName: string){
    let toDeleteKey = "";
    //console.log(this.keysDictionary.length)
    for(let i = 0; i < this.keysDictionary.length; i++){
      let currRecord = this.keysDictionary[i]
      if(currRecord.name == toDeleteName){
        toDeleteKey = currRecord.key;
      }
    }

    console.log(toDeleteKey)
    if(toDeleteKey != ""){
      this.dishesRef.remove(toDeleteKey)
    }

  }

}


interface DishInfo
  {name:string,
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


interface keysDictionaryRecord {
  name: string,
  key: string
}


interface UserAndBasket{
  userID: string,
  basket: TakenFood[]
}

