import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { LoaderOverlayAbstractionComponent } from './loader-overlay-abstraction.component';
import { CONTAINER_DATA } from '../../services/loader-service/loader-overlay.token';

describe('Loader Overlay Abstraction', () => {
    let fixture: ComponentFixture<LoaderOverlayAbstractionComponent>;
    let component: LoaderOverlayAbstractionComponent;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
            declarations: [LoaderOverlayAbstractionComponent],
            providers: [
                {provide: CONTAINER_DATA, useValue: {message: 'Custom message'}}
            ]
		}).compileComponents();
	}));

	beforeEach(() => {
        fixture = TestBed.createComponent(LoaderOverlayAbstractionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
	})

	it('should create Service', () => {
		expect(component).toBeTruthy();
    });

    it('should set message provided', () => {
        expect(component.message).toBe('Custom message');
    });
});
