import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreProductsAndBenefitsComponent } from './more-products-and-benefits.component';

describe('MoreProductsAndBenefitsComponent', () => {
  let component: MoreProductsAndBenefitsComponent;
  let fixture: ComponentFixture<MoreProductsAndBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreProductsAndBenefitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreProductsAndBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
