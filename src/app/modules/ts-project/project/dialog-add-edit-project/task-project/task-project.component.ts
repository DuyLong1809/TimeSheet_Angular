import { Component, Input, OnInit } from '@angular/core';
// import { Itasks, Task, TaskInterface } from '../../handle/interface/project-interface';
import { Itasks, TaskInterface } from '../../handle/interface/project-interface';
import { ProjectService } from '../../handle/service/project.service';
import { FormService } from '../../handle/service/form.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArrayHandle } from 'src/app/shared/enum/array-handle';

@Component({
  selector: 'app-task-project',
  templateUrl: './task-project.component.html',
  styleUrls: ['./task-project.component.scss']
})

export class TaskProjectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private formService: FormService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getAllTask();
  }

  allComplete: boolean = true;
  panelOpenState = false;
  remove = ArrayHandle.remove;
  add = ArrayHandle.add;
  private projectId: number | null | undefined;
  private tasksForm = this.formService.createForm.get('tasks') as FormArray;

  otherTask: TaskInterface[] = [];
  subtasks: TaskInterface[] = []
  private allTask: TaskInterface[] = [];

  updateAllComplete(id: number, value: boolean) {
    const index = this.subtasks.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.subtasks[index].completed = value;
      const checked = this.tasksForm.controls.find((task) => task.get('taskId')?.value === id);
      checked?.patchValue({ billable: value });
    }

  }

  someComplete(): boolean {
    return this.subtasks.some((t) => t.completed === false);
  }

  setAll(completed: boolean) {
    this.subtasks.forEach((item) => {
      item.completed = completed;
    });
    this.tasksForm.controls.forEach((item) =>
      item.get('billable')?.patchValue(completed)
    );
    this.allComplete = completed;
  }

  getAllTask() {
    this.projectService.getAllTask().subscribe((data) => {
      this.allTask = data.result;
      this.editTask()
    })
  }

  editTask() {
    if (this.projectId) {
      this.projectService.getAllTask().subscribe((data) => {
        this.formService.editData.subscribe((valueEdit) => {
          this.subtasks = data.result.filter((t) => {
            const a = valueEdit?.tasks.find((d) => t.id === d.taskId)
            if (a) {
              t.completed = a.billable;
              return true
            } else {
              return false
            }
          })
        })
      })

      this.otherTask = this.allTask.filter((t) => !this.subtasks.includes(t))
    } else {
      this.subtasks = this.allTask.filter(item => item.type === 0);
      this.subtasks.forEach((item) => item.completed = true)
      this.otherTask = this.allTask.filter(item => item.type === 1);
    }
  }

  move(Itask: TaskInterface, action: string) {
    if (action === ArrayHandle.add) {
      this.subtasks.push(Itask);
      const index = this.otherTask.findIndex((item) => item == Itask);
      this.otherTask.splice(index, 1);
      this.otherTask = [...this.otherTask];
      this.subtasks.forEach(item => item.completed = true);

    } else if (action === ArrayHandle.remove) {
      this.otherTask.push(Itask);
      const index = this.subtasks.findIndex((item) => item === Itask);
      this.subtasks.splice(index, 1);
      this.subtasks = [...this.subtasks];
    }
  }
}
