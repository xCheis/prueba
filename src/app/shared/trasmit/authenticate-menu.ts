import { DynamicRenderService } from "src/app/services/transmit/dynamic-render.service";
import UIFormSession = com.ts.mobile.sdk.UIFormSession;

export class AuthenticateMenuForm implements UIFormSession{

    private submitBlock: any;
    private renderService: any;

    constructor(private formId: string, private payload: any, private _dynamicRender : DynamicRenderService){
        this.renderService = _dynamicRender;        
    }

    startSession(clientContext: object, actionContext: any): void {
    
    switch (JSON.parse(actionContext._actionLocalStrings.form).template_id){

        case 'non_modal_authenticate_menu': 
        
        this.renderService.loadComponent('non_modal_authenticate_menu', {
            actions_strings: JSON.parse(actionContext._actionLocalStrings.form),
            transmitContinue: (response) => this.handleContinue(response),
            transmitCancel: (response) => this.handleCancel(response)
        });
        
        break;
        
        case 'modal':
        
        this.renderService.showModal( {
            actions_strings: JSON.parse(actionContext._actionLocalStrings.form),
            transmitContinue: (response) => this.handleContinue(response),
            transmitCancel: (response) => this.handleCancel(response)
        });
        
        break;
        
        default:
        
        return null;
    }
     
    
    }
  
    endSession(): void {
        //end session
    }

    handleContinue(response: string){
        this.submitBlock({
            reply: response
        })
    }

    handleCancel(response: string){
        this.submitBlock({
            reply: response
        });
    }

    onContinue(payload: object): void {
       this.submitBlock(payload);
    }

    onError(payload: object): void {
        // error
    }

    promiseFormInput(): Promise<com.ts.mobile.sdk.FormInput> {
        return new Promise((resolve,reject) =>{
            this.submitBlock = (payload) => {
                resolve(com.ts.mobile.sdk.FormInput.createFormInputSubmissionRequest(Object.assign(payload)))
                this.submitBlock = null;
            }
        });
    }

};