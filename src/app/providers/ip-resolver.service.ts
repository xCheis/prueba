import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Ip {
    ip: string;
}

@Injectable({
    providedIn: 'root'
})

export class IpResolverService {

    private readonly endPoint = environment.getIp;
    public data = new Subject<Ip>();

    constructor(private http: HttpClient) { }

    public getIp(): Promise<Ip> {
        return new Promise((resolve) => {
            
            this.http
                .get<Ip>(this.endPoint)
                .subscribe(response => {
                    sessionStorage.setItem("ip", response.ip);
                    resolve(response);
                });
        });
    }

}