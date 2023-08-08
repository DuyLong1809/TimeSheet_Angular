import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskInterface, TaskResponInterface } from '../interface/task-interface';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public getAllTask(): Observable<TaskResponInterface> {
    return this.http.get<TaskResponInterface>(`${environment.baseUrl}/services/app/Task/GetAll`);
  } 

  public saveTask(task: TaskInterface): Observable<TaskInterface> {
    return this.http.post<TaskInterface>(`${environment.baseUrl}/services/app/Task/Save`, task);
  }

  public delete(taskId: number){
    return this.http.delete(`${environment.baseUrl}/services/app/Task/Delete?id=${taskId}`)
  }

  public archive(taskId: number){
    return this.http.delete(`${environment.baseUrl}/services/app/Task/Archive?id=${taskId}`)
  }

  public deArchive(taskId: any){
    return this,this.http.post(`${environment.baseUrl}/services/app/Task/DeArchive`,taskId);
  }
}
