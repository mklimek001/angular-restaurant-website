import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smaki świata';

  constructor( public auth: AuthServiceService) { }


}
