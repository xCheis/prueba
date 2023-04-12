import { DynamicRenderService } from "src/app/services/transmit/dynamic-render.service";
import UIAuthenticatorSessionOtp = com.ts.mobile.sdk.UIAuthenticatorSessionOtp;
import OtpTarget = com.ts.mobile.sdk.OtpTarget;

export class CustomOTPAutheticatorSession implements UIAuthenticatorSessionOtp {

    public targetDevices = [];
    public submitHandler: any;
    private actionContext: any;
    private escapes = [];
    private renderService;

    constructor(private title: string,
        private username: string,
        private possibleTargets: Array<OtpTarget>,
        private autoExcedTarget: OtpTarget,
        private _dynamicRender: DynamicRenderService) {
        this.renderService = _dynamicRender;
    }

    setGeneratedOtp(format: com.ts.mobile.sdk.OtpFormat | null, target: com.ts.mobile.sdk.OtpTarget): void {
        if (format && target) {
            this.renderWaitingForInput(format, target);
        } else {
            setTimeout(() => {
                this.selectTarget(this.targetDevices[0])
            }, 1000);
        }
    }


    setAvailableTargets(targets: Array<any> | null): void {
        this.targetDevices = targets || [];
    }

    startSession(
        description: com.ts.mobile.sdk.AuthenticatorDescription,
        mode: com.ts.mobile.sdk.AuthenticatorSessionMode,
        actionContext: com.ts.mobile.sdk.PolicyAction | null,
        clientContext: object | null): void {
        this.actionContext = actionContext;
        this.escapes = actionContext.getEscapeOptions();
    }

    changeSessionModeToRegistrationAfterExpiration(): void {
        // Not implemented
    }

    promiseRecoveryForError(
        error: com.ts.mobile.sdk.AuthenticationError,
        validRecoveries: Array<com.ts.mobile.sdk.AuthenticationErrorRecovery>,
        defaultRecovery: com.ts.mobile.sdk.AuthenticationErrorRecovery)
        : Promise<com.ts.mobile.sdk.AuthenticationErrorRecovery> {
        let submitBlock;
        let cancel;

        if (defaultRecovery == com.ts.mobile.sdk.AuthenticationErrorRecovery.RetryAuthenticator) {

            return new Promise((resolve, reject) => {

                submitBlock = () => {
                    resolve(defaultRecovery);
                };

                cancel = () => {
                    resolve(com.ts.mobile.sdk.AuthenticationErrorRecovery.Fail);
                };

                this.renderService.showModal(
                    {
                        //expired
                        actions_strings: JSON.parse(this.actionContext._actionLocalStrings.msg_result_expired),
                        transmitContinue: (response) => submitBlock(),
                        transmitCancel: (response) => cancel()
                    });
            });

        } 
             return new Promise((resolve, reject) => {
            
                resolve(defaultRecovery);
            });

    }

    promiseInput(): Promise<com.ts.mobile.sdk.InputOrControlResponse<com.ts.mobile.sdk.TargetBasedAuthenticatorInput<com.ts.mobile.sdk.OtpInput, com.ts.mobile.sdk.OtpTarget>>> {
        return new Promise((resolve, rejects) => {
            this.submitHandler = (response) => {
                resolve(response);
            }
        });
    }

    endSession(): void {
        // Not implemented
    }

    renderWaitingForInput(format, target) {

        const extraInfo = {
            title: this.title,
            username: this.username,
            targetSelected: target,
            actions_strings: JSON.parse(this.actionContext._actionLocalStrings.form),
            transmitContinue: (response) => this.handleContinue(response),
            transmitCancel: (response) => this.handleCancel(response),
            transmitResend: () => this.handleResend()
        }

        this.renderService.loadComponent(JSON.parse(
            this.actionContext._actionLocalStrings.form).template_id, 
            extraInfo);

    }

    selectTarget(target: com.ts.mobile.sdk.OtpTarget) {
        const input = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createTargetSelectionRequest(target);
        const response = com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(input);
        this.submitHandler(response);
    }

    handleCancel(value: any) {
        const controlRequest = com.ts.mobile.sdk.ControlRequest.create(com.ts.mobile.sdk.ControlRequestType.AbortAuthentication);
        this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(controlRequest));
    }

    handleContinue(response: any) {
        const input = com.ts.mobile.sdk.OtpInputOtpSubmission.createOtpSubmission(response);
        const inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(input);
        this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
    }

    handleResend() {
        const resend = com.ts.mobile.sdk.OtpInputRequestResend.createOtpResendRequest();
        const inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(resend);
        this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
    }

    escapeBack(){
        const controlRequest = this.actionContext.escapeOptionById("back");
        this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createEscapeResponse(controlRequest, null));
    }

}