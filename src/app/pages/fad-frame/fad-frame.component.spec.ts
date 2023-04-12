import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadFrameComponent } from './fad-frame.component';

describe('FadFrameComponent', () => {
  let component: FadFrameComponent;
  let fixture: ComponentFixture<FadFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FadFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FadFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
