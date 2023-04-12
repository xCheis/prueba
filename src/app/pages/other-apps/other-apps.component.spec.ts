import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAppsComponent } from './other-apps.component';

describe('OtherAppsComponent', () => {
  let component: OtherAppsComponent;
  let fixture: ComponentFixture<OtherAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
