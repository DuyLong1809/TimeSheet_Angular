import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../../handle/service/project.service';
import { ViewTeamInterface } from '../../../handle/interface/project-interface';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss']
})
export class ViewTeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() listViewTeam!: ViewTeamInterface[];
  
}
