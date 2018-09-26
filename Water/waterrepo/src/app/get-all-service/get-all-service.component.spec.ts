import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllServiceComponent } from './get-all-service.component';

describe('GetAllServiceComponent', () => {
  let component: GetAllServiceComponent;
  let fixture: ComponentFixture<GetAllServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
