import { Component, OnInit } from '@angular/core';
import { DishesServiceService } from '../dishes-service.service';

@Component({
  selector: 'app-edit-dish-form',
  templateUrl: './edit-dish-form.component.html',
  styleUrls: ['./edit-dish-form.component.css']
})
export class EditDishFormComponent implements OnInit {

  name: string = "";
  region: string = "";
  category: string = "";
  description: string = "";
  ingredient1: string = "";
  ingredient2: string = "";
  ingredient3: string = "";
  ingredient4: string = "";
  ingredient5: string = "";
  maxquantity: number = 10;
  price: number = 10;
  mainPhoto: string = "";
  photo2: string = "";
  photo3: string = "";


  dishinfo: DishInfo = {
    name: '',
    region: '',
    category: '',
    description: '',
    ingredients: [],
    maxquantity: 0,
    price: 0,
    photos: [],
  };

  oldDishName: string = ''

  constructor(private dishesService: DishesServiceService) { }

  ngOnInit(): void {

      this.dishinfo = this.dishesService.toEditDish

      this.oldDishName = this.dishinfo.name

      this.name = this.dishinfo.name
      this.region = this.dishinfo.region
      this.category = this.dishinfo.category
      this.description = this.dishinfo.description
      this.ingredient1 = this.dishinfo.ingredients[0]
      this.ingredient2 = this.dishinfo.ingredients[1]
      this.ingredient3 = this.dishinfo.ingredients[2]
      this.ingredient4 = this.dishinfo.ingredients[3]
      this.ingredient5 = this.dishinfo.ingredients[4]
      this.maxquantity = this.dishinfo.maxquantity
      this.price = this.dishinfo.price
      this.mainPhoto = this.dishinfo.photos[0]
      this.photo2 = this.dishinfo.photos[1]
      this.photo3 = this.dishinfo.photos[2]

  }

  submitted(){


    console.log(this.oldDishName)
    this.dishesService.deleteDishRef(this.oldDishName);

    console.log(this.name)
    let newingredients: string[] = [];
    if(this.ingredient1 != "" && !(this.ingredient1 === undefined)){ newingredients.push(this.ingredient1)};
    if(this.ingredient2 != "" && !(this.ingredient2 === undefined)){ newingredients.push(this.ingredient2)};
    if(this.ingredient3 != "" && !(this.ingredient3 === undefined)){ newingredients.push(this.ingredient3)};
    if(this.ingredient4 != "" && !(this.ingredient4 === undefined)){ newingredients.push(this.ingredient4)};
    if(this.ingredient5 != "" && !(this.ingredient5 === undefined)){ newingredients.push(this.ingredient5)};
    //console.log(newingredients)

    let newphotos: string[] = [];
    if(this.mainPhoto != "" && !(this.mainPhoto === undefined)){ newphotos.push(this.mainPhoto)};
    if(this.photo2 != "" && !(this.photo2 === undefined)){ newphotos.push(this.photo2)};
    if(this.photo3 != "" && !(this.photo3 === undefined)){ newphotos.push(this.photo3)};
    //console.log(newphotos);

    let newDishInfo: DishInfo = ({
      name: this.name,
      region: this.region,
      category: this.category,
      description: this.description,
      ingredients: newingredients,
      maxquantity: this.maxquantity,
      price: this.price,
      photos: newphotos,
    })

    console.log(newDishInfo);

    this.dishesService.createDish(newDishInfo);
  }

}

interface DishInfo {name:string;
  region: string;
  category: string;
  description: string;
  ingredients: string[];
  maxquantity: number;
  price: number;
  photos: string[];
}
