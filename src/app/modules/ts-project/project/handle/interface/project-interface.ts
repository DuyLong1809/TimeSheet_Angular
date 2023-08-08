export interface ProjectInterfaceResult {
    customerName: string;
    name: string;
    code: string;
    status: number;
    pms: string[];
    activeMember: number;
    projectType: number;
    timeStart: string;
    timeEnd: string;
    id: number;
}
export interface ProjectResponInterface {
    error: string;
    result: ProjectInterfaceResult[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

// ----------------------------------------

export interface QuantityProjectInterface{
    status: number;
    quantity: number;
    [index: number]: QuantityProjectInterface;
}
export interface ResQuantityProjectInterface{
    error: string;
    result: QuantityProjectInterface[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

// ----------------------------------------
 
export interface CustomerProjects {
    customerName: string;
    projects: ProjectInterfaceResult[];
}

// ----------------------------------------
 
export interface CustomerClient{
    name: string;
    id: number;     
}
export interface ResCustomerClient{
    error: string;
    result: CustomerClient[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

// ----------------------------------------
 
export interface SaveClient{
    name: string;
    address: string;
    code: string;
    id?: number
}
export interface ResSaveClient{
    error: string;
    result: SaveClient[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

// ----------------------------------------
 
export interface TaskInterface {
    name: string,
    type: number,
    isDeleted: boolean,
    id: number,
    completed?: boolean,
}
export interface TaskResponInterface {
    error: string;
    result: TaskInterface[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

// ----------------------------------------
 
export interface BranchInterface {
    name: string,
    displayName: string,
    id: number,
}
export interface BranchResponInterface {
    error: string;
    result: BranchInterface[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

// ----------------------------------------
 
export interface ListUserTeamInterface {
    name: string,
    emailAddress: string,
    type: number,
    jobTitle: string,
    level: number,
    userCode: string,
    avatarPath: string,
    avatarFullPath: string,
    branch: number,
    branchColor: string,
    branchDisplayName: string,
    branchId: number,
    id: number,
    role?: number
}
export interface ListUserTeamResponInterface {
    error: string;
    result: ListUserTeamInterface[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

// ----------------------------------------
 
export interface Itasks {
    taskId: number,
    billable: boolean | undefined,   
    id: number,
}

// ----------------------------------------
 
export interface Iusers {
    userId: number,
    type: number,   
    id: number,
}

// ----------------------------------------
 
export interface NewProjectInterface {
    name: string,
    code: string,   
    status: number ,
    timeStart: string ,
    timeEnd: string ,
    note: string ,
    projectType: number | undefined,
    customerId: number | undefined,
    tasks: Itasks[],
    users: Iusers[],
    komuChannelId: string ,
    isNotifyToKomu: boolean ,
    isAllUserBelongTo: boolean ,
    id: number 
}
export interface NewProjectResponInterface {
    error: string;
    result: NewProjectInterface[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

// ----------------------------------------
 
export interface ViewTeamInterface{
    userID: number,
    userName: string,
    projectUserType: number,
    totalWorkingTime: number,
    billableWorkingTime: number,
}
export interface ViewTeamResponInterface {
    error: string;
    result: ViewTeamInterface[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

// ----------------------------------------
 
export interface ViewTaskInterface{
    taskId: number,
    taskName: string,
    totalWorkingTime: number,
    billableWorkingTime: number,
    billable: boolean,
}
export interface ViewTaskResponInterface {
    error: string;
    result: ViewTaskInterface[];
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}



