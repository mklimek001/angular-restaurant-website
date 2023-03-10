import { AdminViewComponent } from './admin-view/admin-view.component';
import { EditDishFormComponent } from './edit-dish-form/edit-dish-form.component';
import { MenegerViewComponent } from './meneger-view/meneger-view.component';
import { BasketComponent } from './basket/basket.component';
import { DetailedDishComponent } from './detailed-dish/detailed-dish.component';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthGuard } from './_authGuard/auth.guard';


const routes: Routes = [
  {path: 'home', component: HomeCardComponent},
  {path: 'menu', component: DishesListComponent},
  {path: 'login', component: AuthFormComponent},
  {path: 'newdish', component: AddDishFormComponent, canActivate: [AuthGuard]},
  {path: 'editdish', component: EditDishFormComponent, canActivate: [AuthGuard]},
  {path: 'basket', component: BasketComponent, canActivate: [AuthGuard]},
  {path: 'details', component: DetailedDishComponent, canActivate: [AuthGuard]},
  {path: 'meneger', component: MenegerViewComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminViewComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [HomeCardComponent, BasketComponent, DetailedDishComponent, DishesListComponent, DetailedDishComponent]

