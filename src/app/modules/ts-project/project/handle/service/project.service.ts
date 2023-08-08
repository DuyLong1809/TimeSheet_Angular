import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchResponInterface, ListUserTeamResponInterface, NewProjectInterface, NewProjectResponInterface, ProjectResponInterface, QuantityProjectInterface, ResCustomerClient, ResQuantityProjectInterface, SaveClient, TaskResponInterface, ViewTaskResponInterface, ViewTeamResponInterface } from '../interface/project-interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Quantity } from 'src/app/shared/enum/quantity';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  public getAllStatus(status: number, search: string): Observable<ProjectResponInterface> {
    if (status === Quantity.All) {
      return this.http.get<ProjectResponInterface>(`${environment.baseUrl}/services/app/Project/GetAll?search=${search}`);
    }
    return this.http.get<ProjectResponInterface>(`${environment.baseUrl}/services/app/Project/GetAll?status=${status}&search=${search}`);
  }

  public getQuantityProject(): Observable<ResQuantityProjectInterface> {
    return this.http.get<ResQuantityProjectInterface>(`${environment.baseUrl}/services/app/Project/GetQuantityProject`);
  }

  public getAllCustomerCLient(): Observable<ResCustomerClient> {
    return this.http.get<ResCustomerClient>(`${environment.baseUrl}/services/app/Customer/GetAll`);
  }

  public saveClient(client: SaveClient): Observable<SaveClient> {
    return this.http.post<SaveClient>(`${environment.baseUrl}/services/app/Customer/Save`, client);
  }

  public getAllTask(): Observable<TaskResponInterface> {
    return this.http.get<TaskResponInterface>(`${environment.baseUrl}/services/app/Task/GetAll`);
  } 

  public getAllBranch(branch: boolean): Observable<BranchResponInterface> {
    return this.http.get<BranchResponInterface>(`${environment.baseUrl}/services/app/Branch/GetAllBranchFilter?isAll=${branch}`);
  }

  public getAllListUserTeam(): Observable<ListUserTeamResponInterface> {
    return this.http.get<ListUserTeamResponInterface>(`${environment.baseUrl}/services/app/User/GetUserNotPagging`);
  }

  public save(project: NewProjectInterface): Observable<NewProjectResponInterface>{
    return this.http.post<NewProjectResponInterface>(`${environment.baseUrl}/services/app/Project/Save`, project)
  }

  public delete(id: number) {
    return this.http.delete(`${environment.baseUrl}/services/app/Project/Delete?Id=${id}`)
  } 

  public deactive(data: any){
    return this.http.post(`${environment.baseUrl}/services/app/Project/Inactive`, data);
  } 

  public active(data: any){
    return this.http.post(`${environment.baseUrl}/services/app/Project/Active`, data);
  } 

  public viewTeam(id: number, startDate: string, endDate: string): Observable<ViewTeamResponInterface>{
    return this.http.get<ViewTeamResponInterface>(`${environment.baseUrl}/services/app/TimeSheetProject/GetTimeSheetStatisticTeams?projectId=${id}&startDate=${startDate}&endDate=${endDate}`)
  }

  public viewTask(id: number, startDate: string, endDate: string): Observable<ViewTaskResponInterface>{
    return this.http.get<ViewTaskResponInterface>(`${environment.baseUrl}/services/app/TimeSheetProject/GetTimeSheetStatisticTasks?projectId=${id}&startDate=${startDate}&endDate=${endDate}`)
  }

  public getEditProject(id: number): Observable<any>{
    return this.http.get(`${environment.baseUrl}/services/app/Project/Get?input=${id}`);
  }
} 
