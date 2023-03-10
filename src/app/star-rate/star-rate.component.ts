import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.css']
})
export class StarRateComponent implements OnInit {

  constructor(public auth: AuthServiceService) { }

  numOfRates = 0;
  sumOfRates = 0;
  rating = 0;
  usersWhichRated: string[] = [];
  canRate = false;



  ngOnInit(): void {
    this.canRate = this.userCanRate();
  }

  userCanRate(): boolean{
    let canFlag = true;
    let currID = this.auth.currUser.userID;

    for(let i = 0; i < this.usersWhichRated.length; i++){
      if(this.usersWhichRated[i] == currID){
        canFlag = false;
      }
    }

    return canFlag
  }

  calculateRating(){
    this.numOfRates += 1;
    this.rating = Math.round(this.sumOfRates *100/ this.numOfRates)/100;
  }

  star5over(){
    document.getElementById("star5")?.classList.add('hoverStar');
    this.star4over();
    this.star3over();
    this.star2over();
    this.star1over();
  }

  star5leave(){
    document.getElementById("star5")?.classList.remove('hoverStar');
    this.star4leave();
    this.star3leave();
    this.star2leave();
    this.star1leave();
  }

  star4over(){
    document.getElementById("star4")?.classList.add('hoverStar');
    this.star3over();
    this.star2over();
    this.star1over();
  }

  star4leave(){
    document.getElementById("star4")?.classList.remove('hoverStar');
    this.star3leave();
    this.star2leave();
    this.star1leave();
  }

  star3over(){
    document.getElementById("star3")?.classList.add('hoverStar');
    this.star2over();
    this.star1over();
  }

  star3leave(){
    document.getElementById("star3")?.classList.remove('hoverStar');
    this.star2leave();
    this.star1leave();
  }

  star2over(){
    document.getElementById("star2")?.classList.add('hoverStar');
    this.star1over();
  }

  star2leave(){
    document.getElementById("star2")?.classList.remove('hoverStar');
    this.star1leave();
  }

  star1over(){
    document.getElementById("star1")?.classList.add('hoverStar');
  }

  star1leave(){
    document.getElementById("star1")?.classList.remove('hoverStar');
  }

  star5click(){
    this.sumOfRates += 5;
    this.calculateRating();
    this.usersWhichRated.push(this.auth.currUser.userID)
    this.canRate = this.userCanRate();
  }

  star4click(){
    this.sumOfRates += 4;
    this.calculateRating();
    this.usersWhichRated.push(this.auth.currUser.userID)
    this.canRate = this.userCanRate();
  }

  star3click(){
    this.sumOfRates += 3;
    this.calculateRating();
    this.usersWhichRated.push(this.auth.currUser.userID)
    this.canRate = this.userCanRate();
  }

  star2click(){
    this.sumOfRates += 2;
    this.calculateRating();
    this.usersWhichRated.push(this.auth.currUser.userID)
    this.canRate = this.userCanRate();
  }

  star1click(){
    this.sumOfRates += 1;
    this.calculateRating();
    this.usersWhichRated.push(this.auth.currUser.userID)
    this.canRate = this.userCanRate();
  }



}
