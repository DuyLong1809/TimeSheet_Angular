import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../handle/service/project.service';
import { ViewTaskInterface, ViewTeamInterface } from '../../handle/interface/project-interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ViewOptions } from 'src/app/shared/enum/view-options';
import { CustomTimeComponent } from './custom-time/custom-time.component';
import * as moment from 'moment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    public dialog: MatDialog,) {
    this.startDate = data.startDate,
      this.endDate = data.endDate,
      this.projectId = data.projectId
    this.startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd')!;
    this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd')!;
  }

  ngOnInit(): void {
    this.getAllTeam();
    this.getAllTask();
  }

  private projectId: number
  private timeNow: number = 0
  selectedOption: string = ViewOptions.Week;

  startDate = moment()
    .startOf('isoWeek')
    .add(this.timeNow, 'day')
    .format('YYYY-MM-DD');

  endDate = moment()
    .endOf('isoWeek')
    .add(this.timeNow, 'day')
    .format('YYYY-MM-DD');

  listViewTeam: ViewTeamInterface[] = [];
  listViewTask: ViewTaskInterface[] = [];
  listViewTaskfilter: ViewTaskInterface[] = [];

  viewOptions = [
    ViewOptions.Week,
    ViewOptions.Month,
    ViewOptions.Quarter,
    ViewOptions.Year,
    ViewOptions.AllTime,
    ViewOptions.CustomTime
  ]

  getAllTeam() {
    this.projectService.viewTeam(this.projectId, this.startDate, this.endDate).subscribe((data) => {
      this.listViewTeam = data.result
    })
  }

  getAllTask() {
    this.projectService.viewTask(this.projectId, this.startDate, this.endDate).subscribe((data) => {
      this.listViewTask = data.result.filter(item => item.billable === true)
      this.listViewTaskfilter = data.result.filter(item => item.billable === false)
    })
  }

  onBack() {
    this.timeNow--;
    this.onChange(this.selectedOption);
  }

  onNext() {
    this.timeNow++;
    this.onChange(this.selectedOption);
  }

  onChange($event: string) {
    this.selectedOption = $event;
    switch (this.selectedOption) {
      case ViewOptions.Week:
        this.selectedOption = ViewOptions.Week;
        this.startDate = moment()
          .startOf('isoWeek')
          .add(this.timeNow, 'day')
          .format('YYYY-MM-DD');;
        this.endDate = moment()
          .endOf('isoWeek')
          .add(this.timeNow, 'day')
          .format('YYYY-MM-DD');;
        break;

      case ViewOptions.Month:
        this.selectedOption = ViewOptions.Month;
        this.startDate = moment()
          .startOf('month')
          .format('YYYY-MM-DD');
        this.endDate = moment()
          .add(this.timeNow, 'month')
          .endOf('month')
          .format('YYYY-MM-DD');;
        break;

      case ViewOptions.Quarter:
        this.selectedOption = ViewOptions.Quarter;
        this.startDate = moment()
          .add(this.timeNow, 'quarter')
          .startOf('quarter')
          .format('YYYY-MM-DD');;
        this.endDate = moment()
          .add(this.timeNow, 'quarter')
          .endOf('quarter')
          .format('YYYY-MM-DD');;
        break;

      case ViewOptions.Year:
        this.selectedOption = ViewOptions.Year;
        this.startDate = moment()
          .startOf('year')
          .format('YYYY-MM-DD');;
        this.endDate = moment()
          .add(this.timeNow, 'year')
          .endOf('year')
          .format('YYYY-MM-DD');;
        break;

      case ViewOptions.AllTime:
        this.selectedOption = ViewOptions.AllTime;
        this.startDate = '';
        this.endDate = '';
        break;

      case ViewOptions.CustomTime:
        this.selectedOption = ViewOptions.CustomTime;
        const dialogRef = this.dialog.open(CustomTimeComponent);
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.startDate = moment(
              result.dateStart,
              'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)'
            ).format('YYYY-MM-DD');
            this.endDate = moment(
              result.dateEnd,
              'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)'
            ).format('YYYY-MM-DD'); 
          }
        });
        break;

      default:
        this.selectedOption = ''
    }
  }
}
