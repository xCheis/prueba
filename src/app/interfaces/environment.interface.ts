export interface Environment{
    production: boolean;
    fad: string;
    fadTicket: string;
    transmit: object;
    oauthData: OauthData;
}

interface OauthData {
    oauth: string;
    clientId: string;
    clientSecret: string;
    scope: string;
}