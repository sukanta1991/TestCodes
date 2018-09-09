import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required.',
    },
    'password': {
      'required': 'Password is required.',
    }
  };

  public loginForm: FormGroup;
  public user : User = new User();
  private isFormSubmitted: boolean;
  public errorMessage: any;
  public successMessage: any;

  constructor(
    private gService: GlobalService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  	this.buildForm();
  }

  public onSubmit() {
    if(this.loginForm.status == 'INVALID') {
      this.isFormSubmitted = true;
      this.onValueChanged();
      return;
    }
    this.user = this.loginForm.value;

    if(this.user.username == 'admin' && this.user.password == 'admin123') {
      this.gService.setUserSignIn();
      this.errorMessage = '';
      this.successMessage = 'Login success...!';
      this.router.navigate(['/admin/home']);
    }
    else {
      this.errorMessage = 'Invalid login credentials'
    }
  }

  private buildForm(): void {
    this.loginForm = this.fb.group({
      'username': [
        this.user.username, [
          Validators.required,
        ]
      ],
      'password': [
        this.user.password, [
          Validators.required,
        ]
      ]
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  private onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (this.isFormSubmitted || control.dirty) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if(this.formErrors[field].length == 0) {
            this.formErrors[field] += messages[key];
          } else {
            break;
          }
        }
      }
    }
  }

}
