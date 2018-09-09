import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(
    private gService: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.gService.isUserSignIn()) {
      this.router.navigate(['/']);
    }
  }

}
