import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalCodeComponent } from './promotional-code.component';

describe('PromotionalCodeComponent', () => {
  let component: PromotionalCodeComponent;
  let fixture: ComponentFixture<PromotionalCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionalCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
