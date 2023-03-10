import { BasketServiceService } from './basket-service.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isUsrLogged = false
  usersRef: AngularFireList<unknown>;
  testData: unknown

  allUsers: Array<UserDetail> = []

  currUser: UserDetail = ({
    userID: "",
    emailAddress: "",
    userName: "",
    isAdmin: false,
    isManager: false,
    canComment: false,
    currBasket: []
  })


  constructor(public auth: AngularFireAuth,
    public db: AngularFireDatabase) {
        this.usersRef = db.list("/users")
      }


  login(email:string, password:string):boolean{
    this.auth.signInWithEmailAndPassword(email, password)
    .catch(error =>{
       console.log(error.code)
    })
    .then(res =>{
      console.log(res)
      this.isUsrLogged = true;
      let currUserID = ""

      this.auth.currentUser.then( data => {
        currUserID = data!.uid;
        this.getFromBase(currUserID);
        this.getAllFromBase()
      })

    })

    return this.isUsrLogged
  }


  newUser(email:string, password:string):boolean{
    this.auth.createUserWithEmailAndPassword(email, password)
    .catch(error => console.log(error.code))
    .then(res => {
      console.log(res)
      this.addToBase(email)
      this.isUsrLogged = true;
    })

    return this.isUsrLogged
  }


  logout():boolean{
    this.auth.signOut()
    .catch(error => console.log(error.code))
    .then(res =>{
      console.log(res)
      this.isUsrLogged = false;
      this.currUser = ({
        userID: "",
        emailAddress: "",
        userName: "",
        isAdmin: false,
        isManager: false,
        canComment: false,
        currBasket: []
      })
    })


    return this.isUsrLogged
  }


  addToBase(currMail: string): void{
    let currUserID: string | undefined;

    this.auth.currentUser.then( data => {
      currUserID = data!.uid;
      let potentialName = currMail.split("@", 1)[0];
      let newUser: UserDetail = ({
        userID: currUserID,
        emailAddress: currMail,
        userName: potentialName,
        isAdmin: false,
        isManager: false,
        canComment: true,
        currBasket: []
      })

      let currUsersRef = this.db.list(`/users/${currUserID}`)
      currUsersRef.push(newUser).catch( errorCurrUser => {
        console.log(errorCurrUser.code);
      }).then( result => {
        console.log(result)
        this.currUser = newUser});
    })
  }

  getFromBase(userID: string): void{
    let newUser: UserDetail = ({
      userID: "",
      emailAddress:"",
      userName: "",
      isAdmin: false,
      isManager: false,
      canComment: false,
      currBasket: []
    })

    let currUsersRef = this.db.list(`/users/${userID}`)

    currUsersRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({key: c.payload.exportVal()})
        )
      )).subscribe(detailsGot => {
        var detailedInfo = detailsGot[0].key;
        console.log(detailedInfo)
        this.testData = detailedInfo.canComment
        console.log(this.testData)

        let tempuserID = detailedInfo.userID
        let tempemailAddress = detailedInfo.emailAddress
        let tempuserName = detailedInfo.userName
        let tempisAdmin = detailedInfo.isAdmin
        let tempisManager = detailedInfo.isManager
        let tempcanComment = detailedInfo.canComment
        let tempcurrBasket = detailedInfo.currBasket

        newUser = ({
          userID: tempuserID,
          emailAddress: tempemailAddress,
          userName: tempuserName,
          isAdmin: tempisAdmin,
          isManager: tempisManager,
          canComment: tempcanComment,
          currBasket:tempcurrBasket
        })

        console.log(newUser);
        this.currUser = newUser;

    })
  }


  getToList(userID: string): void{
    let newUser: UserDetail = ({
      userID: "",
      emailAddress:"",
      userName: "",
      isAdmin: false,
      isManager: false,
      canComment: false,
      currBasket: []
    })

    let currUsersRef = this.db.list(`/users/${userID}`)

    currUsersRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({key: c.payload.exportVal()})
        )
      )).subscribe(detailsGot => {
        var detailedInfo = detailsGot[0].key;
        //console.log(detailedInfo)
        this.testData = detailedInfo.canComment
        //console.log(this.testData)

        let tempuserID = detailedInfo.userID
        let tempemailAddress = detailedInfo.emailAddress
        let tempuserName = detailedInfo.userName
        let tempisAdmin = detailedInfo.isAdmin
        let tempisManager = detailedInfo.isManager
        let tempcanComment = detailedInfo.canComment
        let tempcurrBasket = detailedInfo.currBasket

        newUser = ({
          userID: tempuserID,
          emailAddress: tempemailAddress,
          userName: tempuserName,
          isAdmin: tempisAdmin,
          isManager: tempisManager,
          canComment: tempcanComment,
          currBasket:tempcurrBasket
        })

        console.log(newUser);
        this.allUsers.push(newUser);

    })
  }

  getAllFromBase():void{
    this.allUsers = [];
    this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key})
          )
        )).subscribe(detailsGot => {
          console.log(detailsGot)
          for(let i = 0; i< detailsGot.length; i++){
            console.log(detailsGot[i].key)
            let tempUserID = detailsGot[i].key
            if(tempUserID){
              this.getToList(tempUserID);
            }

          }
        })
  }

  changeUserData(newDetails: UserDetail):void{
    let currUserID = newDetails.userID

    if(currUserID != ""){
      this.usersRef.remove(currUserID).catch( err => {console.log(err.code)}).then(res =>
        {
          let currUsersRef = this.db.list(`/users/${currUserID}`)
          currUsersRef.push(newDetails).catch( errorCurrUser => {
            console.log(errorCurrUser.code);
          }).then( result => {
            console.log(result)
            this.getAllFromBase()});
        })
    }



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


