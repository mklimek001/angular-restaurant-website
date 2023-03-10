import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  allComments: Comment[] = [
    { dishName: "Spaghetti",
      name: "Gorąco polecam",
      nick: "Ania123",
      text: "Pyszne spaghetti, które zjadłam ze smakiem, bardzo polecam tą restaurację.",
      date: new Date("2021-12-31") },

    { dishName: "Pizza",
      name: "MammaMia",
      nick: "AdamMałysz102",
      text: "Pizza lepsza niż bułka z bananem, którą zajadałem w młodości",
      date: new Date("2021-12-19") },

    { dishName: "Wurst",
      name: "Tłuste i niedobre",
      nick: "Ania123",
      text: "Bardzo chciałam spróbować słynnego, niemieckiego wursta, ale bardzo się zawiodłam",
      date: new Date("2021-12-23")
    },

    { dishName: "Pizza",
      name: "Za mała pizza",
      nick: "Skrupulatny",
      text: "Zostałem poinformowany przez obsługę, że pizza ma 30 cm średnicy, a miałą 28,5.",
      date: new Date("2021-12-27")
    },

    { dishName: "Woda z lodowca",
      name: "Pierwszy dzień na siłowni",
      nick: "Nowyroknowyja",
      text: "Z nowym rokiem zacząłem chdzić na siłownię, woda z lodowca pomaga mi zwiększyć moją wytrzymałość.",
      date: new Date("2022-01-02")
    },

    { dishName: "Kapusta z grochem",
      name: "Nie leczy kaca",
      nick: "imprezowicz69",
      text: "Informacje na stronie są całkowicie nieprawdziwe, po zjedzeniu kapusty ciągle bolała mnie głowa i musiałem zamówić whiskey.",
      date: new Date("2022-01-01")
    }]

  constructor() {
  }

  addComment(newComment: Comment){
    this.allComments.push(newComment);
  }

  getCommentsList(dishName: string): Comment[]{
    let currComments: Comment[] = []

    for(let i = 0; i < this.allComments.length; i++){
      let tmpComment: Comment = this.allComments[i];
      if(tmpComment.dishName == dishName){
        currComments.push(tmpComment);
      }
    }

    return currComments
  }

}


interface Comment{
  dishName: string,
  nick: string,
  name: string,
  text: string,
  date: Date
}
