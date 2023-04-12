import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonModalIconComponent } from './non-modal-icon.component';

describe('NonModalIconComponent', () => {
  let component: NonModalIconComponent;
  let fixture: ComponentFixture<NonModalIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonModalIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonModalIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
