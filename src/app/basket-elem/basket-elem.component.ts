import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basket-elem',
  templateUrl: './basket-elem.component.html',
  styleUrls: ['./basket-elem.component.css']
})
export class BasketElemComponent implements OnInit {

  constructor() { }

  @Input()
  orderinfo: TakenFood = {
    name: '',
    number: 0,
    singleprice: 0,
    totalprice: 0
  };

  ngOnInit(): void {
  }

}


interface TakenFood {
  name: string,
  number: number,
  singleprice: number,
  totalprice: number
}

