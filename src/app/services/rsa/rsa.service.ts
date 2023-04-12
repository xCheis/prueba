
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare const encode_deviceprint: any;
@Injectable({
  providedIn: 'root'
})

export class RSA {
  
  private  datoMoviel: string;
  private  geoData: any;

  constructor( private _http: HttpClient ) { 
    this.datoMoviel = encode_deviceprint();
  }

  getLocationData(): object{

    return {
      accuracy: this.geoData.accuracy,
      altitude: this.geoData.altitude,
      altitudeAccuracy: this.geoData.altitudeAccuracy,
      heading: this.geoData.heading,
      latitude: this.geoData.latitude,
      longitude: this.geoData.longitude,
      speed: this.geoData.speed
    };
  }

  getRSAData() : string{
    return this.datoMoviel;
  }

  getGeolocation(){
    navigator.geolocation.getCurrentPosition(geo =>{
      this.geoData = geo.coords;
   });
  }

}
