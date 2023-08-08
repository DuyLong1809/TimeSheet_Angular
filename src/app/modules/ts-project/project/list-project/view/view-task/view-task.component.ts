import { Component, Input, OnInit } from '@angular/core';
import { ViewTaskInterface } from '../../../handle/interface/project-interface';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() listViewTask!: ViewTaskInterface[];
  @Input() listViewTaskfilter!: ViewTaskInterface[];
}
