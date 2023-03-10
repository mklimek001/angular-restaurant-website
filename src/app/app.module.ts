import { BasketServiceService } from './basket-service.service';
import { AuthServiceService } from './auth-service.service';
import { DishesServiceService } from './dishes-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
//import { DishesListComponent } from './dishes-list/dishes-list.component';
import { SingleDishComponent } from './single-dish/single-dish.component';
import { BasketElemComponent } from './basket-elem/basket-elem.component';
import { StarRateComponent } from './star-rate/star-rate.component';
//import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { ReactiveFormsModule} from '@angular/forms';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { SingleCommentComponent } from './single-comment/single-comment.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { DetailedDishComponent } from './detailed-dish/detailed-dish.component';
//import { HomeCardComponent } from './home-card/home-card.component';
//import { BasketComponent } from './basket/basket.component';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from '../environments/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabase } from 'angularfire2/database';
import { list } from '@angular/fire/database';
import { provideFirebaseApp,  } from '@angular/fire/app';
import { config } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { MenegerViewComponent } from './meneger-view/meneger-view.component';
import { MenegerBarComponent } from './meneger-bar/meneger-bar.component';
import { EditDishFormComponent } from './edit-dish-form/edit-dish-form.component';
import { AdminUserBarComponent } from './admin-user-bar/admin-user-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    SingleDishComponent,
    BasketElemComponent,
    StarRateComponent,
    CommentsListComponent,
    SingleCommentComponent,
    routingComponents,
    AddDishFormComponent,
    AuthFormComponent,
    AdminViewComponent,
    MenegerViewComponent,
    MenegerBarComponent,
    EditDishFormComponent,
    AdminUserBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [DishesServiceService, AuthServiceService, BasketServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
