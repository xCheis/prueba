export interface CheckBuroRequest {
    code: string;
    additional_data: Object
}

export interface CheckBuroResponse {
    csm_id: string;
    crm_id: string;
    errors?: [];
}

export interface ValidateBuroRequest{
    csm_id: string;
    crm_id: string;
}

export interface ValidateBuroResponse {
    signatureId: string;
    errors?: [];
}