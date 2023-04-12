import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Environment } from '../interfaces/environment.interface';
import { configurationSubject } from './environment-resolver';


@Injectable({
  providedIn: 'root'
})
export class EnvConfigurationService {

  private readonly configUrl = environment.configmap;

  constructor(private http: HttpClient) { }

  public load(): Promise<Environment> {
        return new Promise((resolve) => {
      this.http
        .get<Environment>(this.configUrl)
        .subscribe(response => {
          configurationSubject.next(response);
          resolve(response);
        })
    });
  }

}


