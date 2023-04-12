import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonModalAuthenticateMenuComponent } from './non-modal-authenticate-menu.component';

describe('NonModalAuthenticateMenuComponent', () => {
  let component: NonModalAuthenticateMenuComponent;
  let fixture: ComponentFixture<NonModalAuthenticateMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonModalAuthenticateMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonModalAuthenticateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
