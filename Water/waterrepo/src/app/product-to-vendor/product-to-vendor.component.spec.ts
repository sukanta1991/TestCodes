import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToVendorComponent } from './product-to-vendor.component';

describe('ProductToVendorComponent', () => {
  let component: ProductToVendorComponent;
  let fixture: ComponentFixture<ProductToVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductToVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
