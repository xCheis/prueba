/// <reference path="../../../../transmit/ts/com.ts.mobile.sdk.d.ts" />
import {Injectable } from '@angular/core';
import { LoaderOverlayService } from '../loader-service/loader-overlay.service';
import SDKConnectionSettings = com.ts.mobile.sdk.SDKConnectionSettings;
import TransmitSDKXm = com.ts.mobile.sdk.TransmitSDKXm;
import { CustomUIHandler } from 'src/app/shared/trasmit/custom-uihandler.transmit';
import { DynamicRenderService } from './dynamic-render.service';
import {configurationSubject} from 'src/app/providers/environment-resolver';
import { RSA } from '../rsa/rsa.service';
import { Router } from '@angular/router';
import { LocalStorageHelperService } from './local-storage-helper.service';
import { ValidateCsmService } from '../validate-csm/validate-csm.service';

declare const xmsdk;
@Injectable({
	providedIn: 'root'
})

export class TransmitService {

	private journeyPlayer: TransmitSDKXm = xmsdk.XmSdk();
	private settings: SDKConnectionSettings;
	private _environments;
	private UIHander;

	constructor(
		private _overlayService:LoaderOverlayService, 
		private _dynamicRender: DynamicRenderService,
		private _rsaService: RSA,
		private router: Router,
		private _sessionService: LocalStorageHelperService,
		private _validateService: ValidateCsmService)
	{
		this._environments = configurationSubject.getValue();
		this.UIHander = new CustomUIHandler(_overlayService, _dynamicRender,_sessionService);
	}

	private getTransmitConnectionSettings(){
		
		this.settings =    com.ts.mobile.sdk.SDKConnectionSettings.create(
		  this._environments.transmit.serverUrl,
		  this._environments.transmit.appId,
		  "",
		  ""
		);

		return this.settings;
	
	}

	public initTransmit(csm: string, userId: string){

		this.journeyPlayer.setLogLevel(com.ts.mobile.sdk.LogLevel.Error);
		this.journeyPlayer.setConnectionSettings(this.getTransmitConnectionSettings());
		this.journeyPlayer.setUiHandler(this.UIHander);

		this.journeyPlayer.initialize().then( results => {
		  this.authenticateTransmit(csm, userId);
		}).
		catch ( error => {
			this.router.navigate(['/errors'], {queryParams: {icon: 'wrongFlow'}, skipLocationChange:true});
		});

	}

	
	public authenticateTransmit( csm: string, userId: string ){
		let params = this.getJourneyParams(csm); 
		this.journeyPlayer.authenticate(userId ,this._environments.transmit.journeyName,params, null )
		.then( data =>{
			this.router.navigate(['/terms-conditions'], {skipLocationChange:true});
			this.journeyPlayer.logout();
		}).catch(error => {
			if(this._sessionService.getStorageValue('csm_result')){
			 this._validateService.validateCSM({
					csm_id: this._sessionService.getStorageValue('csm_result'),
					crm_id: this._sessionService.getStorageValue('crm_id')
			 }).subscribe();
			}
		});
	    
	  }

    private getJourneyParams(csm: string): Object{
		return 	{
			ip: this._sessionService.getStorageValue("ip"),
			client_id: this._environments.transmit.clientId,
			csm_id: csm,
			rsa_cookie: "default",
			rsa_data_obj: this._rsaService.getRSAData(),
			geolocation_rsa: this._rsaService.getLocationData()			 
	   }
	}

	public cancelFlow(){
		this.journeyPlayer.cancelCurrentRunningControlFlow();
	}



}
