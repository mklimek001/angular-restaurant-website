//import { DishInfo } from './../dishes-list/dishes-list.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DishesServiceService } from '../dishes-service.service';


@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.css']
})


export class AddDishFormComponent implements OnInit {
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



  /* addingForm: FormGroup = new FormGroup ({
    name: new FormControl('Unikalna nazwa dania', [Validators.required, Validators.minLength(3)],
      []),
    region: new FormControl('Region', [Validators.required]),
    category: new FormControl('Kategoria', [Validators.required]),
    description: new FormControl('Opis dania', [Validators.required]),
    ingredients: new FormGroup({
      ingredient1: new FormControl(),
      ingredient2: new FormControl(),
      ingredient3: new FormControl(),
      ingredient4: new FormControl(),
      ingredient5: new FormControl()
    }),
    maxquantity: new FormControl(10, [Validators.required]),
    price: new FormControl(10, [Validators.required]),
    photos: new FormGroup({
      photo1: new FormControl('Zdjęcie', [Validators.required]),
      photo2: new FormControl(),
      photo3: new FormControl()
    }),
  }) */

  constructor(private dishesService: DishesServiceService) {

   }


  ngOnInit(): void {

    /*this.addingForm = new FormGroup ({
      name: new FormControl('Unikalna nazwa dania', [Validators.required, Validators.minLength(3)],
        []),
      region: new FormControl('Region', [Validators.required]),
      category: new FormControl('Kategoria', [Validators.required]),
      description: new FormControl('Opis dania', [Validators.required]),
      ingredients: new FormGroup({
        ingredient1: new FormControl(),
        ingredient2: new FormControl(),
        ingredient3: new FormControl(),
        ingredient4: new FormControl(),
        ingredient5: new FormControl()
      }),
      maxquantity: new FormControl(10, [Validators.required]),
      price: new FormControl(10, [Validators.required]),
      photos: new FormGroup({
        photo1: new FormControl('Zdjęcie', [Validators.required]),
        photo2: new FormControl(),
        photo3: new FormControl()
      }),
    }) */
  }


  submitted(){
    console.log(this.name)
    /*let fromform = this.addingForm.value;
    console.log(fromform); */
    let newingredients: string[] = [];
    if(this.ingredient1 != ""){ newingredients.push(this.ingredient1)};
    if(this.ingredient2 != ""){ newingredients.push(this.ingredient2)};
    if(this.ingredient3 != ""){ newingredients.push(this.ingredient3)};
    if(this.ingredient4 != ""){ newingredients.push(this.ingredient4)};
    if(this.ingredient5 != ""){ newingredients.push(this.ingredient5)};
    //console.log(newingredients)

    let newphotos: string[] = [];
    if(this.mainPhoto != ""){ newphotos.push(this.mainPhoto)};
    if(this.photo2 != ""){ newphotos.push(this.photo2)};
    if(this.photo3 != null){ newphotos.push(this.photo3)};
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

    this.name = "";
    this.region = "";
    this.category = "";
    this.description = "";
    this.ingredient1 = "";
    this.ingredient2 = "";
    this.ingredient3 = "";
    this.ingredient4 = "";
    this.ingredient5 = "";
    this.maxquantity = 10;
    this.price = 10;
    this.mainPhoto = "";
    this.photo2 = "";
    this.photo3 = "";

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
