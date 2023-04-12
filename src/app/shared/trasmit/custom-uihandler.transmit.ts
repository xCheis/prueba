import { LoaderOverlayService } from "src/app/services/loader-service/loader-overlay.service";
import { LocalStorageHelperService } from "src/app/services/transmit/local-storage-helper.service";
import { UniversalForm } from "./universal-form";
import { DynamicRenderService } from "../../services/transmit/dynamic-render.service"
import PolicyAction = com.ts.mobile.sdk.PolicyAction;
import JsonDataProcessingResult = com.ts.mobile.sdk.JsonDataProcessingResult;
import UIFormSession = com.ts.mobile.sdk.UIFormSession;
import OtpTarget = com.ts.mobile.sdk.OtpTarget;
import ConfirmationInput = com.ts.mobile.sdk.ConfirmationInput;
import { CustomOTPAutheticatorSession } from "./Custom-OTP";
import { AuthenticateMenuForm } from "./authenticate-menu";
import { rejects } from "assert";

declare const xmui;

//TODO quitar los extends que hagan referencia al UIHandler default, totalmente CUSTOM
export class CustomUIHandler extends xmui.XmUIHandler {

  private overlay;
  private session;
  private renderService;


  constructor(
    private _overlayService: LoaderOverlayService,
    private _dynamicRender: DynamicRenderService,
    private _sessionService: LocalStorageHelperService
  ) {
    super();
    this.session = _sessionService;
    this.renderService = _dynamicRender;
  }

  public createFormSession(formId: string, payload: any): UIFormSession {

    switch (formId) {
      case 'universal_form':

        return new UniversalForm(formId, payload, this._dynamicRender);

      case 'authenticate_menu_form':
        return new AuthenticateMenuForm(formId, payload, this._dynamicRender);

      default:
        return null;
    }
  }



  public processJsonData(jsonData: any, actionContext: PolicyAction | null, clientContext: object | null): Promise<JsonDataProcessingResult> {
    if (jsonData.operation_result.csm_id) {
      this.session.setStorageValue('csm_result', jsonData.operation_result.csm_id);
    }
    return new Promise((resolve, reject) => {
      resolve(com.ts.mobile.sdk.JsonDataProcessingResult.create(true));
    });
  }


  public startActivityIndicator(actionContext: PolicyAction | null, clientContext: object | null) {
    this.overlay = this._overlayService.open('Espera un poco', 'Estamos trabajando en tu solicitud.');
  }

  public endActivityIndicator(actionContext: PolicyAction | null, clientContext: object | null) {
    this.overlay.close();
  }

  public getInformationResponse(title: string, text: string, continueText: string, actionContext: PolicyAction | null, clientContext: object | null): Promise<ConfirmationInput> {
    let submitBlock: any;
    return new Promise((resolve, reject) => {
      submitBlock = (payload) => {
        resolve(com.ts.mobile.sdk.ConfirmationInput.create(payload));
        submitBlock = null; // assign null to prevent using the same promise more then once
      };

      this._dynamicRender.showModalInfo(
        {
          title: title,
          text: text,
          continueText: continueText,
          submitBlock: submitBlock,
          actionContext: actionContext,
          clientContext: clientContext,
        });
    });
  }

  public getConfirmationInput(title: string, text: string, continueText: string, cancelText: string, actionContext: PolicyAction | null, clientContext: object | null): Promise<ConfirmationInput> {

    let submitBlock: any;

    return new Promise((resolve, reject) => {
      submitBlock = (payload) => {
        resolve(com.ts.mobile.sdk.ConfirmationInput.create(payload));
        submitBlock = null; // assign null to prevent using the same promise more then once
      };
      this._dynamicRender.showModalInfo(
        {
          title: title,
          text: text,
          continueText: continueText,
          submitBlock: submitBlock,
          actionContext: actionContext,
          clientContext: clientContext
        });
    });



  }

  public createOtpAuthSession(
    title: string,
    user: string,
    possibleTargets: Array<OtpTarget>,
    autoExcedTarget: OtpTarget | null) {
    return new CustomOTPAutheticatorSession(title, user, possibleTargets, autoExcedTarget, this._dynamicRender);
  }

  public selectAuthenticator(
    options: Array<com.ts.mobile.sdk.AuthenticationOption>,
    actionContext: com.ts.mobile.sdk.PolicyAction,
    clientContext: object | null
  ): Promise<com.ts.mobile.sdk.AuthenticatorSelectionResult> {
    const controlRequest: com.ts.mobile.sdk.ActionEscapeOption = actionContext.escapeOptionById("fail");
    return new Promise((resolve, reject) => {
      resolve(com.ts.mobile.sdk.AuthenticatorSelectionResult.createEscapeRequest(controlRequest, null));
    })
  }


  public handlePolicyRejection(
    title: string,
    text: string,
    buttonText: string | null,
    failureData: object | null,
    actionContext: PolicyAction | null,
    clientContext: object | null
  ) {
    this.renderService.showError();
    return new Promise((resolve, reject) => {
      resolve(com.ts.mobile.sdk.ConfirmationInput.create(-1))
    })
  }



}