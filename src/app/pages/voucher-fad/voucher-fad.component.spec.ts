import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFadComponent } from './voucher-fad.component';

describe('VoucherFadComponent', () => {
  let component: VoucherFadComponent;
  let fixture: ComponentFixture<VoucherFadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherFadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherFadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
