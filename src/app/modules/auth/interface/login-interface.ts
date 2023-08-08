export interface LoginInterface {
    userNameOrEmailAddress: string,
    password: string,
}

export interface LoginResult {
    accessToken: string,
    encryptedAccessToken: string,
    expireInSeconds: number,
    userId: number,
}

export interface LoginRespon {
    error: string,
    result: LoginResult,
    success: boolean,
    targetUrl: string,
    unAuthorizedRequest: boolean,
    __abp: boolean,
}
