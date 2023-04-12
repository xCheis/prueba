import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-views-errors',
    templateUrl: './views-errors.component.html',
    styleUrls: ['./views-errors.component.scss']
})
export class ViewsErrorsComponent {

    public key: string | null;
    public icon = '';
    public titulo = '';
    public descripcion = '';
    //  @Input() titulo = '';
    //  @Input() descripcion = '';
    public buttonEntendido = false;
    public buttonReintentar = false;
    public buttonCancelar = false;

    constructor(private _route: ActivatedRoute, private route: Router) {
        this._route.queryParams.subscribe(params => {
            this.key = params['icon'];
            this.setInfo();
        })

    }


    setInfo() {
        switch (this.key) {
            case 'invalid-code':
                this.icon = 'invalid-code';
                this.titulo = 'Código promocional inválido'
                this.descripcion = 'Verificalo e inténtalo de nuevo.'
                this.buttonReintentar = true;
                this.buttonCancelar = true
                break;
            case 'exceeded':
                this.icon = 'invalid-code';
                this.titulo = 'Código promocional inválido'
                this.descripcion = 'Excediste el número de intentos para ingresar tu código promocional. Verifícalo e inténtalo más tarde.'
                this.buttonEntendido = true;
                break
            case 'deciduos':
                this.icon = 'missingDocument';
                this.titulo = 'Tu código promocional caducó'
                this.descripcion = 'Por favor, espera una nueva invitación e inténtalo de nuevo.'
                this.buttonEntendido = true;
                break
            case 'wrongFlow':
                this.icon = 'wrongFlow';
                this.titulo = 'No es posible continuar'
                this.descripcion = 'Comunícate a SuperLínea, donde recibirás atención personalizada para resolver este inconveniente.'
                this.buttonEntendido = true;
                break
            case 'permissions':
                this.icon = 'permissions';
                this.titulo = 'Importante'
                this.descripcion = 'Para continuar, por favor activa la cámara, micrófono o el permiso de geolicalización de tu dispositivo.'
                this.buttonEntendido = true;
                break
            case 'NoMobile':
                this.icon = 'Mobile';
                this.titulo = 'Importante';
                this.descripcion = 'Para que puedas disfrutar de una mejor experiencia, te recomendamos realizar este proceso en un dispositivo móvil.';
                break
            default:
                break;
        }
    }

    goTo(event: any) {
        sessionStorage.setItem('count', JSON.stringify(0));
        if (this.icon === 'wrongFlow') {
            this.route.navigate(['/']);
        } else {
            this.route.navigate(['promotional-code']);
        }
    }

}
