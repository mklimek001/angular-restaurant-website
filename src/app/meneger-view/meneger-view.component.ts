import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DishInfo } from '../dishes-list/dishes-list.component';
import { DishesServiceService } from '../dishes-service.service';

@Component({
  selector: 'app-meneger-view',
  templateUrl: './meneger-view.component.html',
  styleUrls: ['./meneger-view.component.css']
})
export class MenegerViewComponent implements OnInit {

  constructor(private dishesService: DishesServiceService) { }

  public dishes: DishInfo[] = [];
  public dishesClass: any = [];
  totalReserved: Number = 0;
  numOfdishes: number = 0;
  onePage = 5;
  numOfPages = 0;
  numbers: number[] = [];
  startInd = 0;
  lastInd = 5;

  ngOnInit(): void {
    this.getDishesList();
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

}
