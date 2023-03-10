import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  usersList: Array<UserDetail> = [];

  constructor(public auth: AuthServiceService) { }

  ngOnInit(): void {
    this.auth.getAllFromBase()
    this.usersList = this.auth.allUsers;
  }

  changePersistance(persistanceType: string){

  }

}

interface UserDetail{
  userID: string,
  emailAddress: string,
  userName: string,
  isAdmin: boolean,
  isManager: boolean,
  canComment: boolean,
  currBasket: Array<TakenFood>
}

interface TakenFood {
  name: string,
  number: number,
  singleprice: number,
  totalprice: number,
}

