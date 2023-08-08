import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Itasks, Iusers, NewProjectInterface } from '../interface/project-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fb: FormBuilder) {}

  public editSubject = new BehaviorSubject<NewProjectInterface | null>(null);
  public editData = this.editSubject.asObservable();

  createForm = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    status: [0],
    timeStart: [''],
    timeEnd: [''],
    note: [''],
    projectType: [0],
    customerId: [0],
    tasks: this.fb.array<Itasks[]>([]),
    users: this.fb.array<Iusers[]>([]),
    id: [0],
    komuChannelId: [''],
    isNotifyToKomu: [false],
    isAllUserBelongTo: [true],
  }) 

  setFormEditData(data: NewProjectInterface) {
    this.editSubject.next(data);
  }
}
