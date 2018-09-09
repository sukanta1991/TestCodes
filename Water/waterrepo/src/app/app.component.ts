import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    public gService: GlobalService
  ){}

  public logout() {
    this.gService.setUserSignOut();
  }
}
