export interface TaskInterface {
    name: string,
    type: number,
    isDeleted?: boolean,
    id?: number
}

export interface TaskResponInterface {
    error: string;
    result: TaskInterface[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
