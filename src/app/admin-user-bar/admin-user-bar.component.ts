import { AuthServiceService } from './../auth-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-bar',
  templateUrl: './admin-user-bar.component.html',
  styleUrls: ['./admin-user-bar.component.css']
})
export class AdminUserBarComponent implements OnInit {
  isCurrUser: boolean = false

  @Input()
  thisUser: UserDetail = ({
    userID: "",
    emailAddress: "",
    userName: "",
    isAdmin: false,
    isManager: false,
    canComment: false,
    currBasket: []
  })

  constructor(public auth: AuthServiceService) { }

  ngOnInit(): void {
    this.isCurrUser = (this.thisUser.userID == this.auth.currUser.userID)

  }

  modifyUser(parametr: string): void{
    this.auth.allUsers = []
    let newParams: UserDetail = ({
      userID: this.thisUser.userID,
      emailAddress: this.thisUser.emailAddress,
      userName: this.thisUser.userName,
      isAdmin: this.thisUser.isAdmin,
      isManager: this.thisUser.isManager,
      canComment: this.thisUser.canComment,
      currBasket: []
    })

    if(parametr == 'admin'){
      newParams.isAdmin = !this.thisUser.isAdmin
    }

    if(parametr == 'menenger'){
      newParams.isManager = !this.thisUser.isManager
    }

    if(parametr == 'comment'){
      newParams.canComment = !this.thisUser.canComment
    }

    this.thisUser = newParams
    this.auth.changeUserData(newParams)

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
