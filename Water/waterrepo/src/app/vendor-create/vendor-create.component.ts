import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { GooglePlaceModule, GooglePlaceDirective } from "ngx-google-places-autocomplete";

import { GlobalService } from '../global.service';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';
import { VendorAddress } from '../vendor-address';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css'],
  providers: [VendorService]
})
export class VendorCreateComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  public vendorFormErrors = {
    'firstName': '',
    'lastName': '',
    'companyName': '',
    'website': '',
    'email': '',
    'contactNumber': '',
    'operationalStartTime': '',
    'operationalEndTime': '',
    // 'listedprice':'',
  }

  public addressFormErrors = {
    'addresstype': '',
    'administrativearealevel1': '',
    'administrativearealevel2': '',
    'fullAddress': '',
    'lift': '',
    'locality': '',
    'pincode': '',
    'primise': '',
    'sublocalitylevel1': '',
    'sublocalitylevel2': '',
    'lat':'',
    'lng':''
  }

  vendorValidationMessages = {
    'firstName': {
      'required': 'Firstname is required.',
    },
    'companyName': {
      'required': 'Company name is required.',
    },
    'website': {
      'pattern': 'Website link is invalid',
    },
    'email': {
      'pattern': 'Email is invalid'
    },
    'contactNumber': {
      'required': 'Contact number is required.',
      'pattern': 'Contact number is invalid',
    },
    'operationalStartTime': {
      'required': 'Start Time is required.',
    },
    'operationalEndTime': {
      'required': 'End Time is required.',
    }
    // },
    // 'listedprice' : {
    //   'required': 'Listed price is required.',
    //   'pattern': 'Listed Price is invalid'
    // }
  };

  addressValidationMessages = {
    'addresstype': {
      'required': 'Address is required.',
    }
  };

  private isVendorFormSubmitted: boolean;
  private isAddressFormSubmitted: boolean;

  public vendorForm: FormGroup;
  public addressForm: FormGroup;
  public vendor : Vendor = new Vendor();
  public address : VendorAddress = new VendorAddress();
  public isVendorActive: boolean;
  public isVendorCompleted: boolean;
  public isAddressActive: boolean;
  public isAddressCompleted: boolean;
  public newAddressType: string = 'delivary';
  public addressSet: any = [];
  public errorMessage: any;
  public errorMessageBody: any;
  public websitePattern: string = "^((http|https):\\/\\/)?(:\\/\\/)?(www\\.)?([a-z0-9-]+\\.)+([a-z0-9-]+)(\\/.*)?";
  public phonePattern: string = "\\d{10,10}$|(\\d-\\d+-\\d+-\\d+)|(\\+\\d\\s+\\(\\d+\\)\\s+\\d+-\\d+)|(\\(\\d+\\)\\s+\\d+-\\d+)";
  public emailPattern: string = "\\S+@\\S+\\.\\S+";
  public twoDigitPattern: string = "^[0-9]{2}$";
  constructor(
    private gService: GlobalService,
    private vendorService: VendorService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if(this.gService.isUserSignIn()) {
      this.isVendorActive = true;
      this.buildVendorForm();
      this.buildAddressForm();
      this.address.addresstype = 'DELIVERY';
    }
    else {
      this.router.navigate(['/']);
    }
  }

  public backFromAddress() {
    this.isVendorActive = true;
    this.isAddressActive = false;
  }

  public resetAddressForm() {
    this.addressForm.reset();
  }

  public removeAddress(address) {
    let index = this.addressSet.indexOf(address);
    this.addressSet.splice(index, 1);
  }

  public submitAddressForm() {
    console.log(this.vendor.contactNumber);
    if(this.addressForm.status == 'INVALID' && this.addressSet.length <= 0) {
      this.isAddressFormSubmitted = true;
      this.onAddressValueChanged();
      return;
    }

    this.addAddress();
    this.vendor['addressSet'] = this.addressSet;
    this.vendorService.add(this.vendor).subscribe(
      successResponse => {
        this.router.navigate(['/admin/Home']);
      },
      errorResponse   => {
        this.errorMessage = errorResponse.statusText;
        this.errorMessageBody = errorResponse._body;
      }
    );
  }

  public addAddress() {
    if(this.addressForm.status == 'VALID'){
      this.addressSet.push(this.addressForm.value);
      this.resetAddressForm();
    }
  }

  public handleAddressChange(place: any) {
    let address = place.address_components
    let newAddress = {}
    this.resetAddressForm();
    newAddress['fullAddress'] = place.formatted_address;
    newAddress['addresstype'] = 'DELIVERY';
    newAddress['lift'] = 'false';

    newAddress['lat'] = place.geometry.location.lat();
    newAddress['lng'] = place.geometry.location.lng();

    address.forEach((indexVal) => {
      switch(indexVal.types[0]){
        case 'administrative_area_level_1': {
          newAddress['administrativearealevel1'] = indexVal.long_name;
          break;
        }
        case 'administrative_area_level_2': {
          newAddress['administrativearealevel2'] = indexVal.long_name;
          break;
        }
        case 'country': {
          newAddress['country'] = indexVal.long_name;
          break;
        }
        case 'fullAddress': {
          newAddress['fullAddress'] = indexVal.long_name;
          break;
        }
        case 'locality': {
          newAddress['locality'] = indexVal.long_name;
          break;
        }
        case 'postal_code': {
          newAddress['pincode'] = indexVal.long_name;
          break;
        }
        case 'primise': {
          newAddress['primise'] = indexVal.long_name;
          break;
        }
        case 'sublocality_level_1': {
          newAddress['sublocalitylevel1'] = indexVal.long_name;
          break;
        }
        case 'sublocality_level_2': {
          newAddress['sublocalitylevel2'] = indexVal.long_name;
          break;
        }
      
      }

    });

    this.addressForm.patchValue(newAddress);
  }


  public submitVendorForm() {
    console.log('helloo');
    if(this.vendorForm.status == 'INVALID') {
      this.isVendorFormSubmitted = true;
      this.onVendorValueChanged();
      return;
    }
    this.isVendorActive = false;
    this.isAddressActive = true;
    this.isVendorCompleted = true;
    this.vendor = this.vendorForm.value
  }

  private buildVendorForm(): void {
    this.vendorForm = this.fb.group({
      'firstName': [
        this.vendor.firstName, [
          Validators.required
        ]
      ],
      'lastName': [
        this.vendor.lastName, [
        ]
      ],
      'companyName': [
        this.vendor.companyName, [
        Validators.required
        ]
      ],
      'website': [
        this.vendor.website, [
          Validators.pattern(this.websitePattern)
        ]
      ],
      'email': [
        this.vendor.email, [
          Validators.pattern(this.emailPattern)
        ]
      ],
      'contactNumber': [
        this.vendor.contactNumber, [
          Validators.required,
          Validators.pattern(this.phonePattern)
        ]
      ],
      'operationalEndTime': [
        this.vendor.operationalEndTime, [
          Validators.required,
        ]
      ],
      'operationalStartTime': [
        this.vendor.operationalStartTime, [
          Validators.required,
        ]
      ]
    });

    this.vendorForm.valueChanges.subscribe(data => this.onVendorValueChanged(data));

    this.onVendorValueChanged();
  }

  private buildAddressForm(): void {
    this.addressForm = this.fb.group({
      'addresstype': [
        this.address.addresstype, [
          Validators.required
        ]
      ],
      'administrativearealevel1': [
        this.address.administrativearealevel1, [
        ]
      ],
      'administrativearealevel2': [
        this.address.administrativearealevel2, [
        ]
      ],
      'country': [
        this.address.country, [
        ]
      ],
      'fullAddress': [
        this.address.fullAddress, [
        ]
      ],
      'lift': [
        this.address.lift, [
        ]
      ],
      'locality': [
        this.address.locality, [
        ]
      ],
      'pincode': [
        this.address.pincode, [
        ]
      ],
      'primise': [
        this.address.primise, [
        ]
      ],
      'sublocalitylevel1': [
        this.address.sublocalitylevel1, [
        ]
      ],
      'sublocalitylevel2': [
        this.address.sublocalitylevel2, [
        ]
      ],
      'lat': [
        this.address.lat, [
        ]
      ],
      'lng': [
        this.address.lng, [
        ]
      ]
    });

    this.vendorForm.valueChanges.subscribe(data => this.onAddressValueChanged(data));

    this.onAddressValueChanged();
  }

  private onVendorValueChanged(data?: any) {
    if (!this.vendorForm) { return; }
    const form = this.vendorForm;

    for (const field in this.vendorFormErrors) {
      this.vendorFormErrors[field] = '';
      const control = form.get(field);

      if (control && (this.isVendorFormSubmitted || control.dirty) && !control.valid) {
        const messages = this.vendorValidationMessages[field];
        for (const key in control.errors) {
          if(this.vendorFormErrors[field].length == 0) {
            this.vendorFormErrors[field] += messages[key];
          } else {
            break;
          }
        }
      }
    }
  }

  private onAddressValueChanged(data?: any) {
    if (!this.addressForm) { return; }
    const form = this.addressForm;

    for (const field in this.addressFormErrors) {
      this.addressFormErrors[field] = '';
      const control = form.get(field);

      if (control && (this.isAddressFormSubmitted || control.dirty) && !control.valid) {
        const messages = this.addressValidationMessages[field];
        for (const key in control.errors) {
          if(this.addressFormErrors[field].length == 0) {
            this.addressFormErrors[field] += messages[key];
          } else {
            break;
          }
        }
      }
    }
  }
}
