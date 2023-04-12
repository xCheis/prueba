import { IpResolverService} from '../providers/ip-resolver.service';
import { environment } from '../../environments/environment';

export function loadData(ipService: IpResolverService) {
    sessionStorage.clear();
    return () =>
        new Promise((resolver) => {
            environment.production ? realIP(resolver,ipService) : dummyIP(resolver);
        });
}

function realIP( resolver, ipService  ){

    ipService.getIp().then((res) => {
        if (res) {
            resolver(true);
        }
    });

}

function dummyIP( resolver ){
    sessionStorage.setItem("ip","192.168.0.1");
    resolver(true);
}

