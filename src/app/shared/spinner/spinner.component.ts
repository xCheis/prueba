import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnInit {
	/**
	 * Indicates the type of <strong>loader</strong> to be loaded
	 *
	 * @type {string}
	 * @memberof SpinnerComponent
	 */
	@Input()
	public type = '';

	/**
	 * Indicates if the color of the loader is changed to white
	 *
	 * @type {boolean}
	 * @memberof SpinnerComponent
	 */
	@Input()
	public inverse: boolean;

	/**
	 * @ignore
	 * Sets the value of the property <strong>inverse</strong> if defined.
	 *
	 * @memberof SpinnerComponent
	 */
	ngOnInit() {
		this.inverse = this.inverse !== undefined;
	}
}
